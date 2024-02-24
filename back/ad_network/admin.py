from django.contrib import admin

# профиль
from .models.profile import setting_notification,profile,notification,finance_operation
# медиаресурс
from .models.channel import channel,channel_profile
# баннер подключенный
from .models.banner import banner_profile,banner_chosen


# профиль
admin.site.register(setting_notification.setting_notificationModel)
admin.site.register(profile.profileModel)
admin.site.register(notification.notificationModel)
admin.site.register(finance_operation.finance_operationModel)

# медиаресурс
admin.site.register(channel.channelModel)
admin.site.register(channel_profile.channel_profileModel)

# баннер подключенный
admin.site.register(banner_profile.banner_profileModel)
admin.site.register(banner_chosen.banner_chosenModel)