from django.urls import path
# Регестрация
from account.views.reg import reg
# Вход
from account.views.log import log
from a_module.views.confirmation_code import voice
from account.views.logout import logout
# главная
# from ad_advertiser.views.index import index
# from ad_advertiser.views.ad_views import *


urlpatterns = [
    # регистрация 
    path('reg/', reg.regDef, name='account_regDef'),
    # вход
    path('log/', log.logDef, name='account_logDef'),
    # Обработка звонка от ajax для совершения звонка по api sigmasms
    path('ajax_request/', voice.make_api_callDef),

    path('logout/', logout.logoutDef, name="account_logoutDef")
]