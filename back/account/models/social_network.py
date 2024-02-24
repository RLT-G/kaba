from django.db import models

from account.models.account import accountModel


# 
class social_networkModel(models.Model):

    SOCIAL_NETWORK_CHOICES = (
        ('vk', 'ВК'),
        ('yandex', 'Яндекс'),
        ('google', 'Google'),
        ('telegram', 'Telegram'),
        ('public_services', 'Госуслуги'),
        ('classmates', 'Одноклассники'),
        ('my_world', 'Мой мир'),
    )

    # Аккаунт
    account = models.ForeignKey(accountModel, on_delete=models.CASCADE)

    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    social_network = models.CharField('Соцсеть', max_length=32, choices=SOCIAL_NETWORK_CHOICES)
    token = models.CharField('Токен', max_length=255)
    vk_id = models.CharField('VK USER ID', max_length=255, blank=True)
    ya_id = models.CharField('Яндекс ID', max_length=255, blank=True)

    def __str__(self):
        return str(self.pk) +', '+ self.social_network

    class Meta:
        verbose_name = 'Подключенная соцсеть'
        verbose_name_plural = 'Подключенные соцсети'