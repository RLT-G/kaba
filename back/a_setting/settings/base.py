import os
from pathlib import Path
from yookassa import Configuration

BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = 'django-insecure-6nw*xv!(2jvso%4a^9hnf(26p2o+9l)azxil+89122c!6w*q&8'


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    "corsheaders",
    # К Аккаунт
    'account.apps.AccountConfig',
    # К Рекламодатель
    'ad_advertiser.apps.AdAdvertiserConfig',
    # К Реламная сеть
    'ad_network.apps.AdNetworkConfig',
    'api',
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# время хранения сессии (сейчас == 30 лет) ((60 * 60 * 24 * 30 * 12) *30)
SESSION_COOKIE_AGE = 31104000 * 5

# стабильное кеширование (не сбросит после перезагрузки)
SESSION_ENGINE = 'django.contrib.sessions.backends.cached_db'


ROOT_URLCONF = 'a_setting.urls'


# путь к шаблонам 
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # пути для шаблонов django-allauth
        'DIRS': [BASE_DIR / 'templates', BASE_DIR / 'templates' / 'account'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "http://localhost:5001",
]


WSGI_APPLICATION = 'a_setting.wsgi.application'


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization

LANGUAGE_CODE = 'ru'

LANGUAGES = (('ru', 'Russian'),)

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_L10N = True

USE_TZ = False

#VK
VK_CLIENT_ID = "51643989"
VK_SECRET_KEY = "DrLAS8cwONDMS0kBEIen"
VK_REDIRECT = "http://localhost:5001/login/"

#Yandex
YANDEX_CLIENT_ID = "c850608ba62d47d6a780eaef664b1d04"
YANDEX_SECRET_KEY = "460af6e6f1c646409303ec8459a6136e"
YANDEX_REDIRECT = "http://localhost:5001/login/"

#Paykeeper
PAYKEEPER_LOGIN = "demo"
PAYKEEPER_PASSWORD = "demo"
PAYKEEPER_URL = "https://demo.paykeeper.ru"

#Qiwi
QIWI_TOKEN = "969cb317-ef77-4a4d-8977-0d30c5d89e3d"
QIWI_BASE_URL = "https://api-test.qiwi.com/" # for production https://api.qiwi.com/

#yookassa 
Configuration.account_id = "505371" #<Идентификатор магазина>
Configuration.secret_key = "test_*gF9ZX8OmDGvEo10Y76UlTzP5-N12S_GRFu5HK4M4APDs" #<Секретный ключ>


# статистика
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'statics')


# медиа
MEDIA_ROOT = os.path.join(BASE_DIR, 'a_media')


# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': 'api.exceptions.custom_exception_handler',
    # другие настройки
}
