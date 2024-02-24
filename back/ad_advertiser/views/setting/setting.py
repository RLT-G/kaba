from django.shortcuts import render, redirect
from django.http import HttpResponseNotFound
from ad_advertiser.form.profile.reg import *
from ad_advertiser.models.profile.profile import *
from django.urls import reverse

# настройки
def settingDef(request, section):

    # настройка уведомлений
    if (section == "notification"):
        data = {
            'message': 'Не реализовано',
            'form': None
        }
        return render(request, 'ad_advertiser_site/setting/section/notification.html', data)
        
    # общие настройки 
    elif (section == "general"):
        profile = profileModel.objects.get(account__login=request.session.get('user_login'))
        if request.method == 'GET':
            data = {
                'form': RegistrationForm(initial={
                    'data_legal_country': profile.data_legal_country,
                    'data_legal_currency': profile.data_legal_currency,
                    'data_legal_form': profile.data_legal_form,
                    'data_legal_id': profile.data_legal_id,
                })
            }
            return render(request, 'ad_advertiser_site/setting/section/general.html', data)
        elif request.method == 'POST':
            form = RegistrationForm(request.POST)
            if form.is_valid():
                profile.data_legal_country = form.cleaned_data.get('data_legal_country')                
                profile.data_legal_currency = form.cleaned_data.get('data_legal_currency')                
                profile.data_legal_form = form.cleaned_data.get('data_legal_form')                
                profile.data_legal_id = form.cleaned_data.get('data_legal_id')                
                profile.save()
                return redirect(reverse('ad_advertiser_settingDef', kwargs={'section': 'general'}))
    else:
        return HttpResponseNotFound("Страница не найдена")