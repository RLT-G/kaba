from django.db import models

from ad_network.models.profile.profile import profileModel


# 
class finance_operationModel(models.Model):

    OPERATION_CHOICES = (
        ('put', 'Пополнение'),
        ('withdraw', 'Вывод'),
    )

    # Профиль
    profile = models.ForeignKey(profileModel, on_delete=models.CASCADE)

    date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
    operation = models.CharField('Тип операции', max_length=20, choices=OPERATION_CHOICES)
    cost = models.PositiveIntegerField('Цена', default=0)
    promocode = models.CharField('Промокод', max_length=20, blank=False)

    def __str__(self):
        return str(self.pk) +', '+ self.cost +'р., '+ self.operation

    class Meta:
        verbose_name = 'Финансовая операция'
        verbose_name_plural = 'Финансовые операции'