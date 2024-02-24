from django.urls import path
from .views import *

urlpatterns = [
    # login register
    path("verify", verifyAPIViews.as_view()),
    # Подтверждение кода, создание токенов
    path('verify_code', verify_codeAPIViews.as_view()),
    # Проверка работает ли сервер с апи 
    path('check', check_api.as_view()),
    # Проверка токена
    path('check_token', check_tokenAPIViews.as_view()),
    #vk login
    path('vk_login', vk_authAPIViews.as_view()),
    #yandex login
    path('yandex_login', yandex_authAPIViews.as_view()),
    
    #get companies
    path('getCompanies', getCompaniesAPIViews.as_view()),
    #get balance
    path('getBalance', getBalanceAPIViews.as_view()),
    # getWalletOperationsAPIViews
    path('getWalletOperations', getWalletOperationsAPIViews.as_view()),
    # GetAudience
    path('getAudience', GetAudience.as_view()),
    # GetBanners
    path('getBanners', GetBanners.as_view()),
    # GetSites
    path('getSites', GetSites.as_view()),
    
    #deposit
    path('deposit', depositAPIViews.as_view()),
    #deposit apply
    path('deposit_apply', depositApplyAPIViews.as_view()),
    
    #get all operations
    path('getOperations', getWalletOperationsAPIViews.as_view()),
    #getAllActiveCompanies
    path('getAllActiveCompanies', getAllActiveCompanies.as_view()),
    #addCompanyToBlogger
    path('addCompanyToBlogger', AddCompanyToBlogger.as_view()),
    #getCompanyBloggers
    path('getCompanyBloggers', GetBloggerCompanies.as_view()),
    
    #generateMaskedURL
    path('generateMaskedURL', generateMaskedURL.as_view()),
    #checkTransition
    path('checkTransition', checkTransition.as_view()),
    
    # AddCompany
    path('addCompany', AddCompany.as_view()),
    #StatisticsAPIView
    path('getStatistics', CompanyStatisticsAPI.as_view()),
    #BloggerStatisticsAPI
    path('getBloggerStatistics', BloggerStatisticsAPI.as_view()),
    
    path('deleteCompany', deleteCompany.as_view()),
    #continueCompaniesAPI
    path('continueCompanies', continueCompaniesAPI.as_view()),
    #pauseCompaniesAPI
    path('pauseCompanies', pauseCompaniesAPI.as_view()),
    #PayoutToBloggerAPIView
    path('payoutToBlogger', PayoutToBloggerAPIView.as_view()),

    #GeneralSettings doing link
    path('generalSettings', GeneralSettingsAPI.as_view()),
    #RateAPIView
    path('rate', RateAPIView.as_view()),


    # # Пути для взаимодействия с БД. GET - получение записей, POST - добавление новой записи  
    # path('accountModel', accountModellListCreateView.as_view()),
    # path('actionModel', actionModellListCreateView.as_view()),
    # path('social_networkModel', social_networkModelListCreateView.as_view()),

    # path('ad_companyModel', ad_companyModelListCreateView.as_view()),
    # path('ad_bannerModel', ad_bannerModelListCreateView.as_view()),
    # path('ad_audienceModel', ad_audienceModelListCreateView.as_view()),
    # path('ad_bannerModel', ad_bannerModelListCreateView.as_view()),
    # path('ad_audienceModel', ad_audienceModelListCreateView.as_view()),
    # path('ad_companyModel', ad_companyModelListCreateView.as_view()),
    # path('profileModel', profileModelListCreateView.as_view()),
    # path('setting_notificationModel', setting_notificationModelListCreateView.as_view()),
    # path('statisticsModel', statisticsModelListCreateView.as_view()),
    # path('notificationModel', notificationModelListCreateView.as_view()),
    # path('finance_operationModel', finance_operationModelListCreateView.as_view()),
    # path('site_profileModel', site_profileModelListCreateView.as_view()),
    # path('site_ratingModel', site_ratingModelListCreateView.as_view()),
    # path('siteModel', siteModelListCreateView.as_view()),

    # path('banner_profileModel', banner_profileModelListCreateView.as_view()),
    # path('banner_chosenModel', banner_chosenModelListCreateView.as_view()),
    # path('channelModel', channelModelListCreateView.as_view()),
    # path('channel_profileModel', channel_profileModelListCreateView.as_view()),

    # path('verificationModel', verificationModelListCreateView.as_view()),
    # path('tokenModel', tokenModelListCreateView.as_view()),
]