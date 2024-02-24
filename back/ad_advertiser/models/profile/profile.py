from django.db import models

from account.models.account import accountModel


# 
class profileModel(models.Model):

    DATA_LEGAL_COUNTRY_CHOICES = (
        ('by', 'Беларусь'),
        ('ru', 'Россия'),
    )
    DATA_LEGAL_CURRENCY_CHOICES = (
        ('rub', 'рубль'),
    )
    DATA_LEGAL_FORM_CHOICES = (
        ('entity_legal_rf', 'Юридическое лицо (РФ)'),
        ('person_natural_rf', 'Физическое лицо (РФ)'),
        ('individual_entrepreneur_rf', 'Индивидуальный предприниматель (РФ)'),
        ('entity_legal_foreign', 'Иностранное юридическое лицо'),
        ('person_natural_foreign', 'Иностранное физическое лицо'),
    )
    DATA_LEGAL_ID_CHOICES = (
        ('inn', 'ИНН'),
        ('inn_vat', 'ИНН/VAT'),
    )

    # Аккаунт
    account = models.ForeignKey(accountModel, related_name='ad_advertiser_profileModel', on_delete=models.CASCADE)
    
    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)

    data_legal_country = models.CharField('Юр.данные. Страна', max_length=65, choices=DATA_LEGAL_COUNTRY_CHOICES)
    data_legal_currency  = models.CharField('Юр.данные. Валюта', max_length=40, choices=DATA_LEGAL_CURRENCY_CHOICES)
    data_legal_form  = models.CharField('Юр.данные. Организационно-правовая форма', max_length=40, choices=DATA_LEGAL_FORM_CHOICES, blank=False)
    data_legal_id  = models.CharField('Юр.данные. Идентификатор организации', max_length=10, choices=DATA_LEGAL_ID_CHOICES, blank=False)

    def __str__(self):
        return str(self.pk) +', '+ self.data_legal_id

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'