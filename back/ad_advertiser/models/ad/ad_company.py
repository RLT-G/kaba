from django.db import models
from django.contrib.postgres.fields import ArrayField

from ad_advertiser.models.site.site import siteModel
from account.models.account import accountModel

class RateModel(models.Model):
    account = models.ForeignKey(accountModel, related_name='ad_rateModel_accountModel', blank=True, null=True, on_delete=models.CASCADE)
    # site = models.ForeignKey(siteModel, related_name='ad_rateModel_siteModel', blank=True, on_delete=models.CASCADE)
    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    rate = models.PositiveIntegerField('Рейтинг', default=0)
    comment = models.CharField('Комментарий', max_length=255, blank=True)
    site = models.CharField('Сайт', max_length=255, blank=True)

class ad_companyModel(models.Model):
    account = models.ForeignKey(accountModel, related_name='ad_companyModel_profileModel', blank=True, null=True, on_delete=models.CASCADE)
    site = models.ForeignKey(siteModel, related_name='ad_companyModel_siteModel', blank=True, on_delete=models.CASCADE)
    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    name = models.CharField('Название', max_length=255, blank=True)
    ban_show = ArrayField(models.CharField(max_length=255), blank=True, size=500, null = True)
    price_target = models.PositiveIntegerField('Цена перехода', blank=True, null = True, default=0)
    date_start = models.DateTimeField('Дата начала', blank=True)
    date_finish = models.DateTimeField('Дата завершения', blank=True)
    #while beta test budget_week is used like budget_day
    budget_week = models.PositiveIntegerField('Недельный бюджет', default=0)
    current_cpc = models.PositiveIntegerField('Текущий CPC', default=0)
    budget_day = models.PositiveIntegerField('Днейный бюджет', default=0)
    
    channel_taboo = ArrayField(models.CharField(max_length=255), blank=True, size=500)
    phrase_plus = ArrayField(models.CharField(max_length=60), blank=True, size=500)
    phrase_minus = ArrayField(models.CharField(max_length=60), blank=True, size=500)
    status_text = models.CharField('Статус', max_length=512, blank=True)
    views = models.PositiveIntegerField('Показы', default=0)
    
class BloggerCompany(models.Model):
    company = models.ForeignKey(ad_companyModel, related_name='ad_bloggerCompanyModel_companyModel', on_delete=models.CASCADE)
    account = models.ForeignKey(accountModel, related_name='ad_bloggerCompanyModel_accountModel', blank=True, null=True, on_delete=models.CASCADE)
    
class ad_statusModel(models.Model):
    status = models.BooleanField('Состояние', default=True)
    text = models.CharField('Текст', max_length=512, blank=False)
    companies = models.ManyToManyField(ad_companyModel, related_name='ad_statusModel_companies', blank=True)
    
class ad_bloggerCompanyModel(models.Model):
    company = models.ForeignKey(ad_companyModel, related_name='ad_bloggerCompanyModel_company', on_delete=models.CASCADE)

class statisticModel(models.Model):
    masked_url = models.CharField('Маскированный URL', max_length=512, blank=True, null = True)
    # views = models.PositiveIntegerField('Показы', default=0)
    clicks_sum = models.PositiveIntegerField('Клики', default=0)
    #Array of datetime's
    clicks = ArrayField(models.DateTimeField(), blank=True, size=102400)
    #first click datetime
    first_click = models.DateTimeField('Первый клик', blank=True, null = True)
    last_click = models.DateTimeField('Последний клик', blank=True, null = True)
    
    
class jumpToADPage(models.Model):
    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    site = models.ForeignKey(siteModel, on_delete=models.CASCADE, null=True, blank=True)
    # company = models.ForeignKey(ad_companyModel, on_delete=models.CASCADE)
    account = models.ForeignKey(accountModel, on_delete=models.CASCADE, null=True, blank=True)
    company = models.ForeignKey(ad_companyModel, on_delete=models.CASCADE, null=True, blank=True)
    
    shows = models.IntegerField('Показы', default=0)
    
    masked_url = models.CharField('Маскированный URL', max_length=512)

    def __str__(self):
        return str(self.pk) + ', ' + str(self.isJump)
    
class jumpsToMaskedLink(models.Model):
    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    jump = models.ForeignKey('jumpToADPage', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pk) + ', ' + str(self.isJump)
    
