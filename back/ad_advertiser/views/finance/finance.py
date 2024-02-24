from django.shortcuts import render
from ad_advertiser.models.profile.finance_operation import *
from ad_advertiser.models.profile.profile import *


# финансы
def financeDef(request):
    profile = profileModel.objects.get(account__login=request.session.get('user_login'))
    finance = finance_operationModel.objects.filter(profile=profile)
    if finance.exists():
        data = {
            'financial_actions': finance
        }
    else:
        data = {
            'message': 'Финансовая история отсудствует'
        }

    return render(request, 'ad_advertiser_site/finance/finance.html', data)