# Generated by Django 5.0 on 2024-01-21 02:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0014_rename_key_walletoperationsmodel_innvoice_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='walletoperationsmodel',
            old_name='innvoice_id',
            new_name='invoice_id',
        ),
    ]
