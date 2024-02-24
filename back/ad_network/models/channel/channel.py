from django.db import models


# 
class channelModel(models.Model):
    
    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    channel_link = models.CharField('Ссылка на медиаресурс', max_length=255)

    def __str__(self):
        return str(self.pk) +', '+ self.channel_link

    class Meta:
        verbose_name = 'Канал'
        verbose_name_plural = 'Каналы'