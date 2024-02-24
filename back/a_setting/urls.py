from django.contrib import admin
from django.urls import path, include
# для подключения картинок
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    # админка
    path('admin/', admin.site.urls),
    # Сервис аккаунтов
    path('', include('account.urls')),
    #api
    path('api/', include('api.urls')),
    # сервис реклама 
    path('ad_advertiser/', include('ad_advertiser.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)