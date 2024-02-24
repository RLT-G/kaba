from django.db import models

from ad_advertiser.models.site.site import siteModel
from ad_advertiser.models.profile.profile import profileModel
from ad_advertiser.models.ad.ad_banner import ad_bannerModel


# 
class site_ratingModel(models.Model):

    ACTION_CHOICES = (
        ('plus_no_cons', 'Отсутствие минусов (определенное время у активных компаний)'),
        ('plus_renewal', 'Продление (рекламной компании)'),

        ('minus_stop', 'Остановка'),
        ('minus_reduction_period', 'Сокращение срока'),
        ('minus_budget_reduction', 'Сокращение бюджета'),
        ('minus_reduction_target_action_price', 'Снижение цены целевого действия'),
        ('minus_obscene_content', 'Непристойный контент (степень тяжести от 1 до 3)'),
    )

    # Сайт
    site = models.ForeignKey(siteModel, related_name='site_ratingModel_siteModel', on_delete=models.CASCADE)

    # Профиль
    profile = models.ForeignKey(profileModel, related_name='site_ratingModel_profileModel', on_delete=models.CASCADE)

    # Баннер рекламной компании
    ad_banner = models.ForeignKey(ad_bannerModel, related_name='site_ratingModel_ad_bannerModel', on_delete=models.CASCADE)

    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    action = models.CharField('Действие (в зависимости от пункта списка повысится\понизится рейтинг)', max_length=100, choices=ACTION_CHOICES)
    action_specify = models.PositiveSmallIntegerField('Уточнение к действию', blank=False, null=True)

    def __str__(self):
        return str(self.pk) +', '+ str(self.action) +', '+ str(self.action_specify)

    class Meta:
        verbose_name = 'Рейтинг сайта'
        verbose_name_plural = 'Рейтинги сайтов'