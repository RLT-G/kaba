from django.db import models
from account.models.account import accountModel
from django.utils import timezone


# Модель токенов
class tokenModel(models.Model):
    # Связанный аккаунт
    account = models.ForeignKey(accountModel, on_delete=models.CASCADE)
    # Сам токен
    token = models.CharField('Токен', max_length=255)
    creation_date = models.DateTimeField('Дата создания', auto_now_add=True)
    expiration_date = models.DateTimeField('Дата сгорания')

    def save(self, *args, **kwargs):
        # Устанавливаю дату сгорания на 2 недели после создания
        if not self.expiration_date:
            self.expiration_date = timezone.now() + timezone.timedelta(weeks=2)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.pk}. Token for User {self.account.login}"

    class Meta:
        verbose_name = 'Токен'
        verbose_name_plural = 'Токены'
        
