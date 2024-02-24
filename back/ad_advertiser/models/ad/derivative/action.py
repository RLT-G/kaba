from django.db import models
from django.db.models import JSONField

from account.models.account import accountModel
from ad_advertiser.models.profile.profile import profileModel as ad_profileModel
from ad_advertiser.models.ad.ad_banner import ad_bannerModel
from ad_advertiser.models.site.site import siteModel
from ad_network.models.profile.profile import profileModel as blogger_profileModel
from ad_network.models.channel.channel import channelModel


# 
class actionModel(models.Model):

    ACTION_CHOICES = (
        ('click', 'Клик'),
    )

    # Рекламная компания (раздел баннер)
    ad_banner = models.ForeignKey(ad_bannerModel, related_name='actionModel_ad_bannerModel', on_delete=models.CASCADE)

    # Профиль рекламодателя
    ad_profile = models.ForeignKey(ad_profileModel, related_name='actionModel_ad_profileModel', on_delete=models.CASCADE)

    # Профиль блоггера
    blogger_profile = models.ForeignKey(blogger_profileModel, related_name='actionModel_blogger_profileModel', on_delete=models.CASCADE)

    # Аккаунт исполнителя (пользователя, который нажал на баннер)
    user_account = models.ForeignKey(accountModel, related_name='actionModel_accountModel', on_delete=models.CASCADE, blank=False, null=True)
    user_id = models.CharField('ID пользователя неавторизованного', max_length=20, blank=False, null=True)

    # Сайт рекламируемый
    ad_site = models.ForeignKey(siteModel, related_name='actionModel_siteModel', on_delete=models.CASCADE)
    # Медиаресурс
    blogger_channel = models.ForeignKey(channelModel, related_name='actionModel_channelModel', on_delete=models.CASCADE)

    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    action = models.CharField('Действие', max_length=20, choices=ACTION_CHOICES)
    cost = models.PositiveIntegerField('Цена действия', default=0)

    geography = JSONField('География')
    device = models.CharField('Устройство', max_length=255)
    os = models.CharField('Операционная система', max_length=255)
    browser = models.CharField('Браузер', max_length=255)

    def __str__(self):
        return str(self.pk) +', '+ self.action

    class Meta:
        verbose_name = 'Действие'
        verbose_name_plural = 'Действия'