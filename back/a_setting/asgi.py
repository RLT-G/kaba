import os

from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'a_setting.settings.local')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'a_setting.settings.production')

application = get_asgi_application()