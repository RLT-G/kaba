from django.db import models

from account.models.account import accountModel


# 
class profileModel(models.Model):
    
    # Аккаунт
    account = models.ForeignKey(accountModel, related_name='ad_network_profileModel', on_delete=models.CASCADE)
    
    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'