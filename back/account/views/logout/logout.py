from django.shortcuts import redirect
from django.contrib.sessions.models import Session
from django.http import HttpResponseBadRequest


# Выход
def logoutDef(request):
    if not request.session.get('user_registered'):
        return HttpResponseBadRequest('Not Login')
    else:
        del request.session['user_registered']
        del request.session['user_login']
        if request.session.get('fully_registered'):
            del request.session['fully_registered']
        return redirect('account_logDef')
