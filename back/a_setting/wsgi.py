import os

from django.core.wsgi import get_wsgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'a_setting.settings.local')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'a_setting.settings.production')

application = get_wsgi_application()
