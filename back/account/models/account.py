from django.db import models
from ad_advertiser.models.site.site import siteModel

class walletModel(models.Model):
    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    balance = models.IntegerField('Баланс', default=0)
    #Знак валюты
    currency_sign = models.CharField('Знак валюты', max_length=1, default='₽')
    account = models.OneToOneField('accountModel', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pk)
    

class walletOperationsModel(models.Model):
    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    balance = models.IntegerField('Баланс', default=0)
    #Знак валюты
    currency_sign = models.CharField('Знак валюты', max_length=1, default='₽')
    # Пополнение или списание
    operation = models.CharField('Операция', max_length=100)
    choices = (('+', 'Пополнение'), ('-', 'Списание'))
    operationType = models.CharField('Тип операции', max_length=1, choices=choices, default='+')
    wallet = models.ForeignKey('walletModel', on_delete=models.CASCADE)
    invoice_id = models.CharField('Ключ', max_length=255, blank=True, null=True)
    isConfirm = models.BooleanField('Использован', default=False)

    def __str__(self):
        return str(self.pk)

# Модель пользователей
class accountModel(models.Model):
    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    login = models.CharField('Логин', max_length=30, unique=True, blank=True, null=True)
    avatar = models.CharField('Аватар', max_length=255, default='index_img/lk/avatar/default.svg') # Ссылка на картинку
    name_first = models.CharField('Имя', max_length=100, blank=False)
    # Сделал фамилию необязательным полем тк в макете регестрации это поле отсудствует
    name_last = models.CharField('Фамилия', max_length=100, blank=True)
    phone_number = models.CharField('Номер телефона', max_length=20, blank=False, default='+7999999999')
    isBlogger = models.BooleanField('Блогер', default=False)
    tin = models.CharField("ИНН", max_length=12, blank=True, null=True)
    choicesForm = (('ООО', 'Общество с ограниченной ответственностью'), ('АО', 'Акционерное общество'), ('ИП', 'Индивидуальный предприниматель'), ('НКО', 'Некоммерческая организация'), ('СЗ', 'Самозанятый'))
    formOrganization = models.CharField("Форма Организации", choices=choicesForm, blank=True, null=True)

    def __str__(self):
        return str(self.pk) + ', ' + str(self.login) + ', ' + str(self.name_first) + ', ' + str(self.name_last)

    class Meta:
        verbose_name = 'Аккаунт'
        verbose_name_plural = 'Аккаунты'
        
