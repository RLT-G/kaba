# Generated by Django 5.0 on 2024-01-21 01:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0013_walletoperationsmodel_iskeyused_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='walletoperationsmodel',
            old_name='key',
            new_name='innvoice_id',
        ),
        migrations.RenameField(
            model_name='walletoperationsmodel',
            old_name='isKeyUsed',
            new_name='isConfirm',
        ),
    ]
