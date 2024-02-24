import os
from a_setting.settings.base import *
from a_module.scripts.db_env import *

DEBUG = True
ALLOWED_HOSTS = ["http://localhost:5001", "localhost", "127.0.0.1"]


# отправка сессий только через https
CSRF_COOKIE_SECURE = False


# БД
DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.postgresql',
        # 'ENGINE': 'django.db.backends.postgresql_psycopg2',
        # 'NAME': 'db_kaba',
        # 'USER': 'admin',
        # 'PASSWORD': 'kaba1234',
        # 'HOST': 'localhost',
        # 'PORT': '',
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'db_kaba',
        'USER': 'postgres',
        'PASSWORD': '1488',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}


# для фото
MEDIA_URL = '/a_media/'