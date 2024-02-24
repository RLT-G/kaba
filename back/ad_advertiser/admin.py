from django.contrib import admin

# профиль
from .models.profile import statistics,setting_notification,profile,notification,finance_operation
# сайт
from .models.site import site,site_rating,site_profile
# рекламные компании
from .models.ad import ad_company,ad_banner,ad_audience
from .models.ad.derivative import target,action
from .models.ad.table import columns_ad_banner,columns_ad_company,columns_ad_audience


# профиль
admin.site.register(finance_operation.finance_operationModel)
admin.site.register(notification.notificationModel)
admin.site.register(profile.profileModel)
admin.site.register(setting_notification.setting_notificationModel)
admin.site.register(statistics.statisticsModel)

# сайт
admin.site.register(site_profile.site_profileModel)
admin.site.register(site_rating.site_ratingModel)
admin.site.register(site.siteModel)

# рекламные компании
admin.site.register(ad_audience.ad_audienceModel)
admin.site.register(ad_banner.ad_bannerModel)
admin.site.register(ad_company.ad_companyModel)

admin.site.register(action.actionModel)
admin.site.register(target.targetModel)

admin.site.register(columns_ad_audience.columns_ad_audienceModel)
admin.site.register(columns_ad_company.columns_ad_companyModel)
admin.site.register(columns_ad_banner.columns_ad_bannerModel)