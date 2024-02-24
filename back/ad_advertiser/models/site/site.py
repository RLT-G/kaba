from django.db import models


# 
class siteModel(models.Model):

    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    domain = models.CharField('Домен', max_length=255)
    
    #target (click to link)
    masked_domain = models.CharField('Маскированный домен (Переходный)', max_length=512, blank=True, null=True)
    shows = models.PositiveIntegerField('Показы', default=0)

    def __str__(self):
        return str(self.pk) +', '+ self.domain

    class Meta:
        verbose_name = 'Сайт'
        verbose_name_plural = 'Сайты'