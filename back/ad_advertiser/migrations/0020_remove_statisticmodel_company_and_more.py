# Generated by Django 5.0 on 2024-02-03 17:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0019_remove_jumptoadpage_account_remove_jumptoadpage_site_and_more'),
        ('ad_advertiser', '0019_alter_bloggercompany_company'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='statisticmodel',
            name='company',
        ),
        migrations.AddField(
            model_name='statisticmodel',
            name='masked_url',
            field=models.CharField(blank=True, max_length=512, null=True, verbose_name='Маскированный URL'),
        ),
        migrations.CreateModel(
            name='jumpToADPage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_creation', models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')),
                ('shows', models.IntegerField(default=0, verbose_name='Показы')),
                ('masked_url', models.CharField(max_length=512, verbose_name='Маскированный URL')),
                ('account', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='account.accountmodel')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ad_advertiser.ad_companymodel')),
            ],
        ),
        migrations.CreateModel(
            name='jumpsToMaskedLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_creation', models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')),
                ('jump', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ad_advertiser.jumptoadpage')),
            ],
        ),
    ]
