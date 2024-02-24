import os
from a_setting.settings.base import *


DEBUG = False
ALLOWED_HOSTS = ['kaba-green.ru', 'www.kaba-green.ru']


# перенаправит на https
SECURE_SSL_REDIRECT = True


# Значение флага SameSite (способ передачи сессий)
CSRF_COOKIE_SAMESITE = 'Lax'
SESSION_COOKIE_SAMESITE = 'Lax'
# # отправка сессий только через https
# CSRF_COOKIE_SECURE = True
# домен для сессий
SESSION_COOKIE_DOMAIN = '.kaba-green.ru'


# БД
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        # 'NAME': BASE_DIR / 'db.sqlite3',
    },
    # 'default': {
    #     'ENGINE': 'django.db.backends.mysql',
    #     'NAME': 'u0884041_db_kaba',
    #     'HOST': '127.0.0.1',
    #     'PORT': '3306',
    #     'USER': 'u0884041',
    #     'PASSWORD': '9905oN6_',
    # },
}




# медиа
STATICFILES_DIRS = [
    # os.path.join(BASE_DIR, 'primary/static'),
    os.path.join(BASE_DIR, 'ad_advertiser/static'),
]
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# для фото
MEDIA_URL = '/kaba/a_media/'