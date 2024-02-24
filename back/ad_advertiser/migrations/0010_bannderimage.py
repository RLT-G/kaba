# Generated by Django 5.0 on 2024-01-29 19:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ad_advertiser', '0009_ad_bannermodel_image_file'),
    ]

    operations = [
        migrations.CreateModel(
            name='BannderImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='banner_images/')),
                ('banner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='banner_image', to='ad_advertiser.ad_bannermodel')),
            ],
        ),
    ]