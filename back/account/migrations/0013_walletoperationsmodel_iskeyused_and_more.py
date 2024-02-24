# Generated by Django 5.0 on 2024-01-21 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0012_alter_walletmodel_currency_sign_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='walletoperationsmodel',
            name='isKeyUsed',
            field=models.BooleanField(default=False, verbose_name='Использован'),
        ),
        migrations.AddField(
            model_name='walletoperationsmodel',
            name='key',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Ключ'),
        ),
    ]