from django.shortcuts import render


# 
def statisticsDef(request):

    return render(request, 'ad_network/statistics/statistics.html', {})