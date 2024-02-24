from django.http import HttpResponse
from django.shortcuts import render, redirect
from a_module.forms.account.log import *
# Для фильтрации обьектов модели accountModel
from django.db.models import Q
# Импорирую функцию для api запроса sigmasms
from a_module.scripts.sigmasms_voice_api import call_userDef
# Для работы с сессией
from django.contrib.sessions.models import Session
# ИМпортирую модель для поиска пользователя
from account.models.account import *


# вход
def logDef(request):
    if request.session.get('user_registered'):
        return redirect('ad_advertiser_regDef')
    # На первый запрос возвращаем форму с логином или телефоном
    if request.method == 'GET':
        data = {
            'AuthenticationForm': Authentication_part1Form
        }
        return render(request, 'account_site/log/log.html', data)
    elif request.method == 'POST':
        # Если это условие прошло то человек ввел форму с логином или телефоном
        if 'login_or_phone_number' in request.POST:
            form = Authentication_part1Form(request.POST)
            if form.is_valid():
                # Валидация пройдена - значит такой пользователь существует. Ищем его телефон и делаем api запрос
                search_data = form.cleaned_data['login_or_phone_number']
                query = Q(login=search_data) | Q(phone_number=search_data)
                matching_accounts = accountModel.objects.filter(query)
                phone_number = matching_accounts.first().phone_number
                request.session['pre_user_login'] = matching_accounts.first().login
                confirmation_code = list(call_userDef(phone_number))[2]
                # Сохраняю код в сессию
                request.session['confirmation_code'] = confirmation_code
                request.session['ph_n'] = phone_number
                print(confirmation_code)
                # Выдаем форму куда нужно вписать код
                data = {
                    'AuthenticationForm': Authentication_part2Form(),
                    'phone_number': f"{phone_number[0:2]}{'*' * (len(phone_number) - 6)}{phone_number[-4::]}"
                }
            else:
                data = {
                    'AuthenticationForm': Authentication_part1Form(request.POST)
                }
            return render(request, 'account_site/log/log.html', data)
        # Человек ввел проверочный код
        elif 'confirmation_code' in request.POST:
            form = Authentication_part2Form(request.POST)
            if form.is_valid():
                confirmation_code = form.cleaned_data['confirmation_code']
                # Если код верный аутентифицируем его
                if confirmation_code == request.session.get('confirmation_code'):
                    request.session['user_registered'] = True
                    request.session['user_login'] = request.session['pre_user_login']
                    del request.session['pre_user_login']
                    return redirect('ad_advertiser_regDef')
                # Иначе сообщаем об ошибке
                else:
                    phone_number = request.session.get('ph_n')
                    data = {
                        'AuthenticationForm': Authentication_part2Form(request.POST),
                        'phone_number': f"{phone_number[0:2]}{'*' * (len(phone_number) - 6)}{phone_number[-4::]}",
                        'error': 'Неверный код'
                    }
                    return render(request, 'account_site/log/log.html', data)
        else:
            data = {
                'AuthenticationForm': Authentication_part1Form(request.POST)
            }
            return render(request, 'account_site/log/log.html', data)
