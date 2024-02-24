from django.db import models

from account.models.social_network import social_networkModel
from ad_advertiser.models.profile.profile import profileModel
from ad_advertiser.models.profile.setting_notification import setting_notificationModel


# 
class notificationModel(models.Model):

    # Профиль
    profile = models.ForeignKey(profileModel, related_name='notificationModel_profileModel', on_delete=models.CASCADE)
    
    # Подключенная соцсеть аккаунта
    social_network = models.ForeignKey(social_networkModel, related_name='ad_advertiser_notificationModel_social_networkModel', on_delete=models.CASCADE, blank=False, null=True)

    site_notification_bool = models.BooleanField('Уведомление для сайта', default=False)
    
    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    read_bool = models.BooleanField('Прочитано?', default=False)
    type_notification = models.CharField('Тип уведомления', max_length=40, choices=setting_notificationModel.TYPE_NOTIFICATION_CHOICES)
    text_notification = models.CharField('Текст уведомления', max_length=150)
    text_button = models.CharField('Текст кнопки', max_length=50)
    link_button = models.URLField('Ссылка кнопки')

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Уведомление'
        verbose_name_plural = 'Уведомления'