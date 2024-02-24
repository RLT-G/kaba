from django.db import models

from ad_network.models.profile.profile import profileModel
from ad_network.models.channel.channel import channelModel


# 
class channel_profileModel(models.Model):

    # Профиль
    profile = models.ForeignKey(profileModel, related_name='channel_profileModel_profileModel', on_delete=models.CASCADE)

    # Медиаресурс
    channel = models.ForeignKey(channelModel, related_name='channel_profileModel_channelModel', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Канал профиля'
        verbose_name_plural = 'Каналы профилей'