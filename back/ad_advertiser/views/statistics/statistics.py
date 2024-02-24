from django.shortcuts import render


# статистика. сводка
def statisticsDef(request):

    return render(request, 'ad_advertiser_site/statistics/statistics.html', {})