# Generated by Django 5.0 on 2024-02-03 17:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0018_jumptoadpage_account'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jumptoadpage',
            name='account',
        ),
        migrations.RemoveField(
            model_name='jumptoadpage',
            name='site',
        ),
        migrations.DeleteModel(
            name='jumpsToMaskedLink',
        ),
        migrations.DeleteModel(
            name='jumpToADPage',
        ),
    ]
