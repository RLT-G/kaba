from django.db import models

from ad_advertiser.models.profile.profile import profileModel


# 
class statisticsModel(models.Model):

    # Профиль
    profile = models.ForeignKey(profileModel, on_delete=models.CASCADE)
    
    click_all = models.PositiveIntegerField('Всего кликов', default=0)
    expense_all = models.PositiveIntegerField('Расходы (без НДС)', default=0)
    expens_vat_all = models.PositiveIntegerField('Расходы (с НДС)', default=0)

    def __str__(self):
        return str(self.pk) +', '+ str(self.expense_all)

    class Meta:
        verbose_name = 'Статистика профиля'
        verbose_name_plural = 'Статистика профилей'