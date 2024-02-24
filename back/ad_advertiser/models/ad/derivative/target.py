from django.db import models
from django.contrib.postgres.fields import ArrayField

from ad_advertiser.models.ad.ad_company import ad_companyModel
from ad_advertiser.models.site.site import siteModel


# 
class targetModel(models.Model):

    # Рекламная компания (раздел компания)
    ad_company = models.ForeignKey(ad_companyModel, related_name='targetModel_ad_companyModel', on_delete=models.CASCADE)

    # Сайт
    site = models.ForeignKey(siteModel, related_name='targetModel_siteModel', on_delete=models.CASCADE, blank=False, null=True)

    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    name = models.CharField('Название', max_length=255)

    # целевое действие и цена
    target_action_price = ArrayField(
        ArrayField(models.CharField(max_length=20), size=2),
        size=10)

    def __str__(self):
        return str(self.pk) +', '+ str(self.target_action_price)

    class Meta:
        verbose_name = 'Цель'
        verbose_name_plural = 'Цели'


# пример списка в поле с целевое действие-цена
# целевое действие взять: ad_advertiser\models\ad\derivative\action.py
# TARGET_ACTION_PRICE_LIST = [
#     ['целевое_действие_из_кортежа', 'цена'],
# ]D