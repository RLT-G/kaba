from django.urls import path

# главная
# from ad_advertiser.views.index import index
# from ad_advertiser.views.ad_views import *


urlpatterns = [
    # баннеры профиля
    path('banner_profile/', banner_profile.banner_profileDef, name='ad_network_banner_profileDef'),
    # все баннеры
    path('banner_all/', banner_all.banner_allDef, name='ad_network_banner_allDef'),
    # каналы
    path('channel/', channel.channelDef, name='ad_network_channelDef'),
    # статистика
    path('statistics/', statistics.statisticsDef, name='ad_network_statisticsDef'),
    # финансы
    path('finance/', finance.financeDef, name='ad_network_financeDef'),
    # настройки 
    path('setting&<str:section>/', setting.settingDef, name='ad_network_settingDef'),
]