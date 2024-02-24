from django.urls import path
from ad_advertiser.views.registration.registration import *
from ad_advertiser.views.ad import ad
from ad_advertiser.views.create import create
from ad_advertiser.views.site import site
from ad_advertiser.views.setting import setting
from ad_advertiser.views.finance import finance
from ad_advertiser.views.statistics import statistics
# главная
# from ad_advertiser.views.index import index
# from ad_advertiser.views.ad_views import *


urlpatterns = [
    # регистрация в сервисе 
    path('reg/', registrationDef, name='ad_advertiser_regDef'),
    # компании (главная)
    path('company&<str:section>/', ad.adDef, name='ad_advertiser_companyDef'),
    # создание
    path('create&<str:section>/', create.createDef, name='ad_advertiser_createDef'),
    # статистика. сводка
    path('statistics/', statistics.statisticsDef, name='ad_advertiser_statisticsDef'),
    # сайты
    path('site/', site.siteDef, name='ad_advertiser_siteDef'),
    # финансы
    path('finance/', finance.financeDef, name='ad_advertiser_financeDef'),
    # настройки 
    path('setting&<str:section>/', setting.settingDef, name='ad_advertiser_settingDef'),
]