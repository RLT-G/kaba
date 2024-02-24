from django.db import models

from ad_advertiser.models.profile.profile import profileModel


# 
class columns_ad_bannerModel(models.Model):

    # Профиль
    profile = models.ForeignKey(profileModel, on_delete=models.CASCADE)

    ad_company = models.BooleanField('Компания?', default=True)
    ad_audience = models.BooleanField('Аудитория?', default=True)
    status = models.BooleanField('Статус?', default=True)
    
    link = models.BooleanField('Ссылка на рекламируемую страницу?', default=True)
    title_option = models.BooleanField('Варианты заголовков?', default=True)
    description_option = models.BooleanField('Варианты описаний?', default=True)
    image_option = models.BooleanField('Варианты изображений?', default=True)
    video_option = models.BooleanField('Варианты видео?', default=True)
    audio_option = models.BooleanField('Варианты аудио?', default=True)
    channel_private_bool = models.BooleanField('Показ на непроверенных медиаресурсах?', default=True)
    phrase_plus = models.BooleanField('Ключевые фразы?', default=True)
    phrase_minus = models.BooleanField('Минус фразы?', default=True)

    expense_all = models.BooleanField('Расход?', default=True)
    expens_vat_all = models.BooleanField('Расход с НДС?', default=True)
    # вести, когда будут цели кроме кликов
    # target = models.BooleanField('Цели?', default=False)
    cpc = models.BooleanField('Средняя цена клика?', default=True)

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = 'Баннер стобцы таблицы'
        verbose_name_plural = 'Баннеры стобцы таблицы'