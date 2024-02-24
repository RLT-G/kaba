from django.http import HttpResponseNotFound, HttpRequest
from a_module.scripts.generate_unique_filename import *
from django.core.files.storage import default_storage
from ad_advertiser.models.site.site_profile import *
from ad_advertiser.models.ad.ad_audience import *
from ad_advertiser.models.ad.ad_company import *
from ad_advertiser.form.ad.ad_audience import *
from ad_advertiser.models.ad.ad_banner import *
from ad_advertiser.form.ad.ad_company import *
from django.shortcuts import render, redirect
from ad_advertiser.form.ad.ad_banner import *
from a_setting.settings.base import BASE_DIR
from ad_advertiser.models.site.site import *
from django.conf import settings
from django.urls import reverse
from datetime import datetime
from pprint import pprint


# создание
def createDef(request, section):

    if not request.session.get("form_progress"):
        request.session["form_progress"] = {
            'banner': None,
            'audience': None,
            'company': None
        }
    if request.method == 'GET':
        # раздел с баннерами
        if (section == "banner"):
            if request.session.get("form_progress")['audience'] is not None and\
                request.session.get("form_progress")['company'] is not None:
                button_text = 'Сохранить'
            else:
                button_text = 'Далее'
            if request.session.get("form_progress")['banner'] is None:
                form = Create_bannerForm()
            else:
                form = Create_bannerForm(request.session.get("form_progress")['banner'][0])
            data = {
                'form': form,
                'button_text': button_text
            }
            return render(request, 'ad_advertiser_site/create/section/banner.html', data)

        # раздел с аудиториямиc
        elif (section == "audience"):
            if request.session.get("form_progress")['banner'] is not None and\
                request.session.get("form_progress")['company'] is not None:
                button_text = 'Сохранить'
            else:
                button_text = 'Далее'
            if request.session.get("form_progress")['audience'] is None:
                form = Create_audienceForm()
            else:
                form = Create_audienceForm(request.session.get("form_progress")['audience'][0])
            data = {
                'form': form,
                'button_text': button_text
            }
            return render(request, 'ad_advertiser_site/create/section/audience.html', data)
            
        # раздел с компаниями
        elif (section == "company"):
            if request.session.get("form_progress")['audience'] is not None and\
                request.session.get("form_progress")['banner'] is not None:
                button_text = 'Сохранить'
            else:
                button_text = 'Далее'
            if request.session.get("form_progress")['company'] is None:
                form = Create_companyForm()
            else:
                form = Create_companyForm(request.session.get("form_progress")['company'][0])
            data = {
                'form': form,
                'button_text': button_text
            }
            return render(request, 'ad_advertiser_site/create/section/company.html', data)

        # на другие страницы выдаю 404
        else:
            return HttpResponseNotFound("Страница не найдена")
    elif request.method == 'POST':
        if (section == "banner"):
            form = Create_bannerForm(request.POST, request.FILES)
            if form.is_valid():
                db_paths = {}
                for el in ['video_option', 'image_options', 'audio_option']:
                    paths = []
                    for i in range(1, 6):
                        if f'{el}{i}' in request.FILES:
                            uploaded_file = request.FILES[f'{el}{i}']
                            save_path = f"{BASE_DIR}\\..\\a_media\\{generate_unique_filenameDef(str(uploaded_file.name))}"
                            paths.append(save_path)
                            with open(save_path, 'wb') as destination:
                                for chunk in uploaded_file.chunks():
                                    destination.write(chunk)
                    db_paths[el] = paths
                old_session = request.session.get('form_progress')
                request.session['form_progress'] = {
                    'banner': [request.POST, db_paths],
                    'audience': old_session['audience'],
                    'company': old_session['company']
                }
                del old_session
                if request.session.get("form_progress")['audience'] is None:
                    return redirect(reverse('ad_advertiser_createDef', kwargs={'section': 'audience'}))
                elif request.session.get("form_progress")['company'] is None:
                    return redirect(reverse('ad_advertiser_createDef', kwargs={'section': 'company'}))
                else:
                    save_data_to_dbDef(request)
                    del request.session["form_progress"]
                    return redirect(reverse('ad_advertiser_companyDef', kwargs={'section': 'company'}))
            else:
                if request.session.get("form_progress")['audience'] is not None and\
                    request.session.get("form_progress")['company'] is not None:
                    button_text = 'Сохранить'
                else:
                    button_text = 'Далее'
                data = {
                    'form': Create_bannerForm(request.POST),
                    'button_text': button_text
                }
                return render(request, 'ad_advertiser_site/create/section/banner.html', data)
        elif (section == "audience"):
            form = Create_audienceForm(request.POST)
            if form.is_valid():
                old_session = request.session.get('form_progress')
                request.session['form_progress'] = {
                    'banner': old_session['banner'],
                    'audience': [request.POST],
                    'company': old_session['company']
                }
                del old_session
                if request.session.get("form_progress")['banner'] is None:
                    return redirect(reverse('ad_advertiser_createDef', kwargs={'section': 'banner'}))
                elif request.session.get("form_progress")['company'] is None:
                    return redirect(reverse('ad_advertiser_createDef', kwargs={'section': 'company'}))
                else:
                    save_data_to_dbDef(request)
                    del request.session["form_progress"]
                    return redirect(reverse('ad_advertiser_companyDef', kwargs={'section': 'company'}))
            else:
                if request.session.get("form_progress")['banner'] is not None and\
                    request.session.get("form_progress")['company'] is not None:
                    button_text = 'Сохранить'
                else:
                    button_text = 'Далее'
                data = {
                    'form': Create_audienceForm(request.POST),
                    'button_text': button_text
                }
                return render(request, 'ad_advertiser_site/create/section/audience.html', data)
        elif (section == "company"):
            form = Create_companyForm(request.POST)
            if form.is_valid():
                old_session = request.session.get('form_progress')
                request.session['form_progress'] = {
                    'banner': old_session['banner'],
                    'audience': old_session['audience'],
                    'company': [request.POST]
                }
                del old_session
                if request.session.get("form_progress")['audience'] is None:
                    return redirect(reverse('ad_advertiser_createDef', kwargs={'section': 'audience'}))
                elif request.session.get("form_progress")['banner'] is None:
                    return redirect(reverse('ad_advertiser_createDef', kwargs={'section': 'banner'}))
                else:
                    save_data_to_dbDef(request)
                    del request.session["form_progress"]
                    return redirect(reverse('ad_advertiser_companyDef', kwargs={'section': 'company'}))
            else:
                if request.session.get("form_progress")['audience'] is not None and\
                    request.session.get("form_progress")['banner'] is not None:
                    button_text = 'Сохранить'
                else:
                    button_text = 'Далее'
                data = {
                    'form': Create_companyForm(request.POST),
                    'button_text': button_text
                }
                return render(request, 'ad_advertiser_site/create/section/company.html', data)

def save_data_to_dbDef(request: HttpRequest) -> None:
    def convert_date_format(input_date):
        original_date = datetime.strptime(input_date, r'%y.%m.%d')
        formatted_date = original_date.strftime(r'%Y-%m-%d %H:%M:%S')
        return formatted_date
    def site_profile_connect(form_data):
        if site_profileModel.objects.filter(
            profile=profileModel.objects.get(account__login=request.session.get('user_login')),
            site=siteModel.objects.get(domain=form_data['url'])).exists() is False:
            site_profileModel(
            profile=profileModel.objects.get(account__login=request.session.get('user_login')),
            site=siteModel.objects.get(domain=form_data['url'])
            )
#  'banner': [<QueryDict: {'csrfmiddlewaretoken': ['CdA7IsmDdLck3t5iZPapIw6pWRAZ0U2UxztHEGW5V7fb8qfJG3zNBPBF45YXuK2p'],
#  'name': ['adasd'], 'url': ['http://dsf.io'], 'title_option': ['asd, фыв,в фыв,ыв'],
#  'description_option': ['фыв,вфыв,вфывфы,вфв'], 'toggle_field': ['on']}>,
# {'audio_option': ['C:\\Users\\RLT\\vs_code\\kaba_vs\\kaba\\a_setting\\..\\a_media\\4f03166ecb1449c0b464678f604b8ee9.ico',
#                 'C:\\Users\\RLT\\vs_code\\kaba_vs\\kaba\\a_setting\\..\\a_media\\283d8e57fa81401d978bf305d875d250.jpg',
#                 'C:\\Users\\RLT\\vs_code\\kaba_vs\\kaba\\a_setting\\..\\a_media\\77bfe40ae3b54309a0ed6517d4139c38.png'],
# 'image_options': ['C:\\Users\\RLT\\vs_code\\kaba_vs\\kaba\\a_setting\\..\\a_media\\3bcce903ab924472bdba0d2c9a2cb240.jpg',
#                 'C:\\Users\\RLT\\vs_code\\kaba_vs\\kaba\\a_setting\\..\\a_media\\00071f3d83f247c09935616e668d3149.jpg',
#                 'C:\\Users\\RLT\\vs_code\\kaba_vs\\kaba\\a_setting\\..\\a_media\\2757833995c84fa2b493c8a9af6c2fdd.png'],
# 'video_option': ['C:\\Users\\RLT\\vs_code\\kaba_vs\\kaba\\a_setting\\..\\a_media\\1b3dd1faf8154d0b8d0548ba15c0bd7b.jpg',
#                 'C:\\Users\\RLT\\vs_code\\kaba_vs\\kaba\\a_setting\\..\\a_media\\09bfca1327e34781889f7a711aefff15.png']}],

    pprint(request.session.get('form_progress'))
    company_form_data = request.session.get('form_progress')['company'][0]
    site_exists = siteModel.objects.filter(domain=company_form_data['url']).exists()
    if not site_exists:
        siteModel(domain=company_form_data['url']).save()
    site_profile_connect(company_form_data)
    
    new_entry_company = ad_companyModel(
        profile=profileModel.objects.get(account__login=request.session.get('user_login')),
        site=siteModel.objects.get(domain=company_form_data['url']),
        name=company_form_data['name'],
        date_start=convert_date_format(company_form_data['date_start']),
        date_finish=convert_date_format(company_form_data['date_finish']),
        budget_week=int(company_form_data['budget_week']),
        channel_taboo=company_form_data['channel_taboo'].replace(" ", '').split(','),
        phrase_plus=company_form_data['phrase_plus'].replace(" ", '').split(','),
        phrase_minus=company_form_data['phrase_minus'].replace(" ", '').split(','),
    )
    new_entry_company.save()

    audience_form_data = request.session.get('form_progress')['audience'][0]
    site_exists = siteModel.objects.filter(domain=audience_form_data['url']).exists()
    if not site_exists:
        siteModel(domain=audience_form_data['url']).save()
    site_profile_connect(audience_form_data)
    
    new_entry_audience = ad_audienceModel(
        profile=profileModel.objects.get(account__login=request.session.get('user_login')),
        site=siteModel.objects.get(domain=audience_form_data['url']),
        ad_company=new_entry_company,
        name=audience_form_data['name'],
        category=audience_form_data['category'],
        device=audience_form_data['device'],
        gender_age=audience_form_data['gender_age'],
        geography=audience_form_data['geography'],
        interest=audience_form_data['interest'],
        solvency=audience_form_data['solvency'].replace(" ", '').split(','),
    )
    new_entry_audience.save()
    banner_form_data = request.session.get('form_progress')['banner'][0]
    banner_file_paths = request.session.get('form_progress')['banner'][1]
    site_exists = siteModel.objects.filter(domain=banner_form_data['url']).exists()
    site_profile_connect(banner_form_data)

    if not site_exists:
        siteModel(domain=banner_form_data['url']).save()
    ad_bannerModel(
        profile=profileModel.objects.get(account__login=request.session.get('user_login')),
        site=siteModel.objects.get(domain=banner_form_data['url']),
        ad_company=new_entry_company,
        ad_audience=new_entry_audience,
        name=banner_form_data['name'],
        link=banner_form_data['url'],
        title_option=banner_form_data['title_option'].replace(" ", '').split(','),
        description_option=banner_form_data['description_option'].replace(" ", '').split(','),
        image_option=banner_file_paths['image_options'],
        video_option=banner_file_paths['video_option'],
        audio_option=banner_file_paths['audio_option'],
        channel_private_bool=True if banner_form_data.get('toggle_field') == 'on' else False
    ).save()