# Generated by Django 5.0 on 2024-02-10 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ad_advertiser', '0023_ad_companymodel_budget_day_jumptoadpage_company'),
    ]

    operations = [
        migrations.AddField(
            model_name='ad_companymodel',
            name='current_cpc',
            field=models.PositiveIntegerField(default=0, verbose_name='Текущий CPC'),
        ),
    ]