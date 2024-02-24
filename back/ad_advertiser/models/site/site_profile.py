from django.db import models

from ad_advertiser.models.site.site import siteModel
from ad_advertiser.models.profile.profile import profileModel


# 
class site_profileModel(models.Model):

    # Профиль
    profile = models.ForeignKey(profileModel, related_name='site_profileModel_profileModel', on_delete=models.CASCADE)

    # Сайт
    site = models.ForeignKey(siteModel, related_name='site_profileModel_siteModel', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Сайт профиля'
        verbose_name_plural = 'Сайты профилей'