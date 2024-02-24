from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField

from ad_advertiser.models.profile.profile import profileModel
from ad_advertiser.models.site.site import siteModel
from ad_advertiser.models.ad.ad_company import ad_companyModel
from ad_advertiser.models.ad.derivative.ad_audience_choices import SOLVENCY_CHOICES
from account.models.account import accountModel


# 
class ad_audienceModel(models.Model):

    # Профиль
    account = models.ForeignKey(accountModel, related_name='ad_audienceModel_accountModel', on_delete=models.CASCADE, blank=True, null=True)

    # Сайт
    site = models.ForeignKey(siteModel, related_name='ad_audienceModel_siteModel', on_delete=models.CASCADE)

    # Рекламная компания (раздел компания)
    ad_company = models.ForeignKey(ad_companyModel, related_name='ad_audienceModel_ad_companyModel', on_delete=models.CASCADE)

    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    name = models.CharField('Название', max_length=255)

    geography = JSONField('География показов', blank=False, default=list)
    category = JSONField('Категории и подкатегории', blank=False, default=list)
    interest = JSONField('Интересы', blank=False, default=list)
    gender_age = JSONField('Пол и возраст', blank=False, default=list)
    device = JSONField('Устройства', blank=False, default=list)
    # Платежеспособность
    solvency = ArrayField(models.CharField(max_length=40, choices=SOLVENCY_CHOICES), blank=False, default=list)

    def __str__(self):
        return str(self.pk) +', '+ self.name

    class Meta:
        verbose_name = 'Аудитория компании'
        verbose_name_plural = 'Аудитории компаний'