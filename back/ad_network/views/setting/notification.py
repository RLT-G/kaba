from django.shortcuts import render


# настройки
def settingDef(request, section):

    # настройка уведомлений
    # if (section == "notification"):
    return render(request, 'ad_network/setting/section/notification.html', {})