from django.db import models
from django.contrib.postgres.fields import ArrayField

from ad_advertiser.models.profile.profile import profileModel
from ad_advertiser.models.site.site import siteModel
from ad_advertiser.models.ad.ad_company import ad_companyModel
from ad_advertiser.models.ad.ad_audience import ad_audienceModel
from account.models.account import accountModel

class BannderImage(models.Model):
    banner = models.ForeignKey('ad_bannerModel', related_name='banner_image', on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to='banner_images/', null=True, blank=True)  # Adjust the 'upload_to' parameter as needed

class ad_bannerModel(models.Model):

    # Профиль
    account = models.ForeignKey(accountModel, related_name='ad_bannerModel_accountModel', blank=True, null=True, on_delete=models.CASCADE)

    # Сайт
    site = models.ForeignKey(siteModel, related_name='ad_bannerModel_siteModel', on_delete=models.CASCADE)

    # Рекламная компания (раздел компания)
    ad_company = models.ForeignKey(ad_companyModel, related_name='ad_bannerModel_ad_companyModel', on_delete=models.CASCADE)
    # Рекламная компания (раздел аудитория)
    ad_audience = models.ForeignKey(ad_audienceModel, related_name='ad_bannerModel_ad_audienceModel', on_delete=models.CASCADE)

    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    name = models.CharField('Название', max_length=255)
    
    image_file = models.ImageField(upload_to='banner_images/', null=True, blank=True)  # Adjust the 'upload_to' parameter as needed

    link = models.URLField('Ссылка на рекламируемую страницу')
    # варианты заголовков
    title_option = ArrayField(models.CharField(max_length=1024), blank=False, default=list, size=100)
    # варианты описаний
    description_option = ArrayField(models.CharField(max_length=1024), blank=False, default=list, size=100)
    # варианты изображений
    image_option = ArrayField(models.CharField(max_length=255), blank=False, default=list, size=5) # Не работает
    # ссылки на изображения (модель)
    images = models.ManyToManyField(BannderImage, related_name='ad_bannerModel_images', blank=True)
    # варианты видео
    video_option = ArrayField(models.CharField(max_length=255), blank=False, default=list, size=5)
    # варианты аудио
    audio_option = ArrayField(models.CharField(max_length=255), blank=False, default=list, size=5)
    channel_private_bool = models.BooleanField('Показ на закрытых медиаресурсах?', default=True)

    def __str__(self):
        return str(self.pk) +', '+ self.name

    class Meta:
        verbose_name = 'Баннер компании'
        verbose_name_plural = 'Баннеры компаний'