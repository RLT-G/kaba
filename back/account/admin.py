from django.contrib import admin
from .models import account, action, social_network, verification
from api.models import *


admin.site.register(account.accountModel)
admin.site.register(action.actionModel)
admin.site.register(social_network.social_networkModel)
admin.site.register(verification.verificationModel)
admin.site.register(tokenModel)