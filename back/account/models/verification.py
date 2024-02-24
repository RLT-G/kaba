from django.db import models

from account.models.account import accountModel


# 
class verificationModel(models.Model):

    # Аккаунт
    account = models.ForeignKey(accountModel, on_delete=models.CASCADE)
    
    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    code_verification = models.CharField('Проверочный код', max_length=6)

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Проверочный код'
        verbose_name_plural = 'Проверочные коды'