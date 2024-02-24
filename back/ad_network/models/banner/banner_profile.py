from django.db import models

from ad_network.models.profile.profile import profileModel
from ad_advertiser.models.ad.ad_banner import ad_bannerModel


# 
class banner_profileModel(models.Model):

    # Профиль
    profile = models.ForeignKey(profileModel, related_name='banner_profileModel_profileModel', on_delete=models.CASCADE)

    # Баннер рекламной компании
    ad_banner = models.ForeignKey(ad_bannerModel, related_name='banner_profileModel_ad_bannerModel', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Баннер профиля'
        verbose_name_plural = 'Баннеры профилей'