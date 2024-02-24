from django.db import models

from ad_advertiser.models.profile.profile import profileModel


# 
class columns_ad_companyModel(models.Model):

    # Профиль
    profile = models.ForeignKey(profileModel, on_delete=models.CASCADE)

    ad_audience_banner = models.BooleanField('Аудитории и баннеры?', default=True)
    status = models.BooleanField('Статус?', default=True)
    
    date_start = models.BooleanField('Дата начала?', default=True)
    date_finish = models.BooleanField('Дата завершения?', default=True)
    budget_week = models.BooleanField('Недельный бюджет?', default=True)
    site = models.BooleanField('Рекламируемый сайт?', default=True)
    channel_taboo = models.BooleanField('Запрещенные медиаресурсы?', default=True)
    
    expense_all = models.BooleanField('Расход?', default=True)
    expens_vat_all = models.BooleanField('Расход с НДС?', default=True)
    # вести, когда будут цели кроме кликов
    # target = models.BooleanField('Цели?', default=False)
    cpc = models.BooleanField('Средняя цена клика?', default=True)

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Компания стобцы таблицы'
        verbose_name_plural = 'Компании стобцы таблицы'