from rest_framework import serializers
from account.models.account import accountModel
from account.models.action import actionModel
from account.models.verification import verificationModel
from account.models.social_network import social_networkModel
from ad_advertiser.models.ad import ad_company, ad_banner, ad_audience
from ad_advertiser.models.ad.table import columns_ad_audience, columns_ad_banner, columns_ad_company
from ad_advertiser.models.profile import finance_operation, notification, statistics, setting_notification, profile
from ad_advertiser.models.site import site, site_profile, site_rating
from ad_network.models.banner import banner_profile, banner_chosen
from ad_network.models.channel import channel, channel_profile
from api.models import tokenModel

class accountSerializer(serializers.ModelSerializer):
    class Meta:
        model = accountModel
        fields = '__all__'

class actionSerializer(serializers.ModelSerializer):
    class Meta:
        model = actionModel
        fields = '__all__'

class social_networkSerializer(serializers.ModelSerializer):
    class Meta:
        model = social_networkModel
        fields = '__all__'




class ad_companySerializer(serializers.ModelSerializer):
    class Meta:
        model = ad_company.ad_companyModel
        fields = '__all__'

class ad_bannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ad_banner.ad_bannerModel
        fields = '__all__'

class ad_audienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ad_audience.ad_audienceModel
        fields = '__all__'

class columns_ad_companySerializer(serializers.ModelSerializer):
    class Meta:
        model = columns_ad_company.columns_ad_companyModel
        fields = '__all__'

class columns_ad_bannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = columns_ad_banner.columns_ad_bannerModel
        fields = '__all__'

class columns_ad_audienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = columns_ad_audience.columns_ad_audienceModel
        fields = '__all__'

class finance_operationSerializer(serializers.ModelSerializer):
    class Meta:
        model = finance_operation.finance_operationModel
        fields = '__all__'

class notificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = notification.notificationModel
        fields = '__all__'

class statisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = statistics.statisticsModel
        fields = '__all__'

class setting_notificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = setting_notification.setting_notificationModel
        fields = '__all__'

class profileSerializer(serializers.ModelSerializer):
    class Meta:
        model = profile.profileModel
        fields = '__all__'

class siteSerializer(serializers.ModelSerializer):
    class Meta:
        model = site.siteModel
        fields = '__all__'

class site_ratingSerializer(serializers.ModelSerializer):
    class Meta:
        model = site_rating.site_ratingModel
        fields = '__all__'

class site_profileSerializer(serializers.ModelSerializer):
    class Meta:
        model = site_profile.site_profileModel
        fields = '__all__'



class banner_profileSerializer(serializers.ModelSerializer):
    class Meta:
        model = banner_profile.banner_profileModel
        fields = '__all__'

class banner_chosenSerializer(serializers.ModelSerializer):
    class Meta:
        model = banner_chosen.banner_chosenModel
        fields = '__all__'

class channelSerializer(serializers.ModelSerializer):
    class Meta:
        model = channel.channelModel
        fields = '__all__'

class channel_profileSerializer(serializers.ModelSerializer):
    class Meta:
        model = channel_profile.channel_profileModel
        fields = '__all__'


class tokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = tokenModel
        fields = '__all__'

class verificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = verificationModel
        fields = '__all__'

