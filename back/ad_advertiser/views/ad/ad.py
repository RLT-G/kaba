from django.shortcuts import render
from django.http import HttpResponseNotFound
from ad_advertiser.models.ad.ad_audience import *
from ad_advertiser.models.ad.ad_company import *
from ad_advertiser.models.ad.ad_banner import *
from ad_advertiser.models.ad.table.columns_ad_company import *
from ad_advertiser.models.profile.profile import *
from ad_advertiser.models.ad.table.columns_ad_audience import * 
from ad_advertiser.models.ad.table.columns_ad_banner import *


# компании
def adDef(request, section):
    user_login = request.session.get('user_login')

    # раздел с баннерами
    if (section == "banner"):
        attr = columns_ad_bannerModel.objects.filter(profile=profileModel.objects.get(account__login=user_login))
        if not attr.exists():
            attr = columns_ad_bannerModel(profile=profileModel.objects.get(account__login=user_login))
        else:
            attr = attr.first()
        all_data = ad_bannerModel.objects.filter(profile=profileModel.objects.get(account__login=user_login))
        if not all_data.exists():
            data = {
                'message': 'У вас нет ни одного баннера'
            }
        else:
            data = {
                'banner_data': all_data
            }
        return render(request, 'ad_advertiser_site/ad/section/banner.html', data)

    # раздел с аудиториями
    elif (section == "audience"):
        attr = columns_ad_audienceModel.objects.filter(profile=profileModel.objects.get(account__login=user_login))
        if not attr.exists():
            attr = columns_ad_audienceModel(profile=profileModel.objects.get(account__login=user_login))
        else:
            attr = attr.first()
        all_data = ad_audienceModel.objects.filter(profile=profileModel.objects.get(account__login=user_login))
        if not all_data.exists():
            data = {
                'message': 'У вас нет ни одной аудитории'
            }
        else:
            data = {
                'audience_data': all_data
            }
        return render(request, 'ad_advertiser_site/ad/section/audience.html', data)
    
    # раздел с компаниями
    elif (section == "company"):

        attr = columns_ad_companyModel.objects.filter(profile=profileModel.objects.get(account__login=user_login))
        if not attr.exists():
            attr = columns_ad_companyModel(profile=profileModel.objects.get(account__login=user_login))
        else:
            attr = attr.first()
        all_data = ad_companyModel.objects.filter(profile=profileModel.objects.get(account__login=user_login))
        if not all_data.exists():
            data = {
                'message': 'У вас нет ни одной компании'
            }
        else:
            data = {
                'company_data': all_data
            }
        return render(request, 'ad_advertiser_site/ad/section/company.html', data)
    
    # на другие страницы выдаю 404
    else:
        return HttpResponseNotFound("Страница не найдена")