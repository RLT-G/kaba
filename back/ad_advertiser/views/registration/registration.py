from django.shortcuts import render, redirect
from django.http import HttpResponseBadRequest
from django.contrib.sessions.models import Session
from ad_advertiser.form.profile.reg import *
from account.models.account import *

# регистрация в сервисе рекламодателей
def registrationDef(request):
    if not request.session.get('user_login'):
        return redirect('account_logDef')
    if request.method == "GET":
        exists = profileModel.objects.filter(account__login=request.session['user_login']).exists()
        if (not request.session.get('fully_registered')) and (not exists):
            data = {
                'login': request.session.get('user_login'),
                'form': RegistrationForm()
            }
            return render(request, 'ad_advertiser_site/registration/registration.html', data)
        else:
            return redirect("/ad_advertiser/company&company/")
    elif request.method == "POST": 
        form = RegistrationForm(request.POST)
        if form.is_valid():
            your_data = form.save(commit=False)
            your_data.account = accountModel.objects.get(login=request.session.get('user_login'))
            your_data.save()
            request.session['fully_registered'] = True
            return redirect("/ad_advertiser/company&company/")
    else:
        data = {
                'login': request.session.get('user_login'),
                'form': RegistrationForm(request.POST)
            }
        return render(request, 'ad_advertiser_site/registration/registration.html', data)