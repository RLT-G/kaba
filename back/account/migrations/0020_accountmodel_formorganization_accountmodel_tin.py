# Generated by Django 5.0 on 2024-02-12 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0019_remove_jumptoadpage_account_remove_jumptoadpage_site_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='accountmodel',
            name='formOrganization',
            field=models.CharField(blank=True, choices=[('ООО', 'Общество с ограниченной ответственностью'), ('АО', 'Акционерное общество'), ('ИП', 'Индивидуальный предприниматель'), ('НКО', 'Некоммерческая организация'), ('СЗ', 'Самозанятый')], null=True, verbose_name='Форма Организации'),
        ),
        migrations.AddField(
            model_name='accountmodel',
            name='tin',
            field=models.CharField(blank=True, max_length=12, null=True, verbose_name='ИНН'),
        ),
    ]
