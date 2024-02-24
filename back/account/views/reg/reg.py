from django.http import HttpResponse
from django.shortcuts import render, redirect
from a_module.forms.account.reg import RegistrationForm
from django.contrib.sessions.models import Session
from account.models.account import *


# регистрация
def regDef(request):
    if request.session.get('user_registered'):
        return redirect('ad_advertiser_regDef')
    if request.method == 'GET':
        data = {
            'RegistrationForm': RegistrationForm
        }
        return render(request, 'account_site/reg/reg.html', data)
    elif request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form_data = {
                'name': form.cleaned_data['name'],
                'login': form.cleaned_data['login'],
                'phone_number': form.cleaned_data['phone_number'],
            }
            account = accountModel(
                login=form_data['login'],
                name_first=form_data['name'],
                phone_number=form_data['phone_number']
            )
            account.save()
            request.session['user_registered'] = True
            request.session['user_login'] = form_data['login']
            request.session['fully_registered'] = False
            return redirect('ad_advertiser_regDef')
        else:
            data = {
                'RegistrationForm': RegistrationForm(request.POST),
                'confirmation_code': form.cleaned_data['confirmation_code']
            }
            return render(request, 'account_site/reg/reg.html', data)
