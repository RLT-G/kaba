# Generated by Django 5.0 on 2024-01-14 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_tokenmodel_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tokenmodel',
            name='token',
            field=models.CharField(max_length=32, verbose_name='Токен'),
        ),
    ]
