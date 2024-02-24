from django.db import models
from django.contrib.postgres.fields import ArrayField

from account.models.social_network import social_networkModel
from ad_network.models.profile.profile import profileModel


# 
class setting_notificationModel(models.Model):

    TYPE_NOTIFICATION_CHOICES = (
        ('important', 'Важное'),
        ('ad_channel', 'Подключенный медиаресурс'),
        ('ad_banner', 'Подключенный баннер'),
        ('finance', 'Финансы'),
        ('access', 'Доступ'),
        ('technical_support', 'Техподдержка'),
        ('service_change', 'Изменения в сервисе'),
        ('referral_program', 'Реферальная программа'),
    )

    # Профиль
    profile = models.ForeignKey(profileModel, related_name='setting_notificationModel_profileModel', on_delete=models.CASCADE)
    
    # Подключенная соцсеть аккаунта
    social_network = models.ForeignKey(social_networkModel, related_name='ad_network_setting_notificationModel_social_networkModel', on_delete=models.CASCADE, blank=False, null=True)

    site_notification_bool = models.BooleanField('Уведомления для сайта', default=False)
    # Типы уведомлений (список)
    type_notification = ArrayField(models.CharField(max_length=40, choices=TYPE_NOTIFICATION_CHOICES), blank=True, default=list)

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Настройка ресурса для получения уведомлений'
        verbose_name_plural = 'Настройки ресурсов для получения уведомлений'