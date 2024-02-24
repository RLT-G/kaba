from django.db import models
from django.db.models import JSONField

from account.models.account import accountModel


# 
class actionModel(models.Model):

    ACTION_CHOICES = (
        ('log', 'Вход'),
    )

    # Аккаунт
    account = models.ForeignKey(accountModel, on_delete=models.CASCADE)

    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    action = models.CharField('Действие', max_length=20, choices=ACTION_CHOICES)

    geography = JSONField('География')
    device = models.CharField('Устройство', max_length=255)
    os = models.CharField('Операционная система', max_length=255)
    browser = models.CharField('Браузер', max_length=255)

    def __str__(self):
        return str(self.pk) +', '+ self.action

    class Meta:
        verbose_name = 'Действие'
        verbose_name_plural = 'Действия аккаунта'