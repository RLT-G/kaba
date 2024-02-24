from django.db import models

from ad_advertiser.models.profile.profile import profileModel


# 
class columns_ad_audienceModel(models.Model):

    # Профиль
    profile = models.ForeignKey(profileModel, on_delete=models.CASCADE)

    ad_company = models.BooleanField('Компания?', default=True)
    ad_banner = models.BooleanField('Баннеры?', default=True)
    status = models.BooleanField('Статус?', default=True)

    geography = models.BooleanField('География?', default=True)
    category = models.BooleanField('Категории?', default=True)
    interest = models.BooleanField('Интересы?', default=True)
    gender_age = models.BooleanField('Пол и возраст?', default=True)
    device = models.BooleanField('Устройства?', default=True)
    solvency = models.BooleanField('Платежеспособность?', default=True)

    expense_all = models.BooleanField('Расход?', default=True)
    expens_vat_all = models.BooleanField('Расход с НДС?', default=True)
    # вести, когда будут цели кроме кликов
    # target = models.BooleanField('Цели?', default=False)
    cpc = models.BooleanField('Средняя цена клика?', default=True)
    

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Аудитория стобцы таблицы'
        verbose_name_plural = 'Аудитории стобцы таблицы'