from django.shortcuts import render
from ad_advertiser.models.site.site_profile import *
# from ad_advertiser.models.site.site import *
from ad_advertiser.models.profile.profile import *



# сайты
def siteDef(request):
    sites = site_profileModel.objects.filter(profile=profileModel.objects.get(account__login=request.session.get('user_login')))
    if sites.exists():
        ...
        data = {
            'sites': sites
        }
    else:
        data = {
            'message': 'У вас нет сайтов'
        }
    return render(request, 'ad_advertiser_site/site/site.html', data)