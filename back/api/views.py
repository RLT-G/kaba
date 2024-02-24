import base64
import json
import string
import uuid
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from django.core.serializers import serialize
import urllib.parse
import requests

from ad_advertiser.models.site.site import siteModel
from ad_advertiser.models.ad.ad_audience import ad_audienceModel
from ad_advertiser.models.ad.ad_banner import BannderImage, ad_bannerModel

from datetime import datetime, timedelta
import random
from rest_framework import status

from datetime import datetime
from django.utils.dateparse import parse_datetime
from django.db.models import Prefetch

from .permissions import isValidToken
from .serializers import *

from a_setting.settings.base import *

from account.models.action import actionModel
from account.models.account import accountModel, walletModel, walletOperationsModel
from account.models.social_network import social_networkModel
from account.models.verification import verificationModel
from account.models.social_network import social_networkModel
from ad_advertiser.models.ad.ad_company import BloggerCompany, RateModel, ad_bloggerCompanyModel, ad_companyModel, ad_statusModel, statisticModel, jumpToADPage, jumpsToMaskedLink
from ad_advertiser.models.ad.ad_banner import BannderImage
from .models import tokenModel

from a_module.scripts.sigmasms_voice_api import send_smsDef
import random
import secrets


def normalize_phone_number(pNumber: str) -> str | None:
    pNumber = pNumber.strip()
    if pNumber.startswith('8') or pNumber.startswith('7'):
        pNumber = '+7' + pNumber[1:]
        return pNumber
    elif pNumber.startswith('+'):
        return pNumber
    else:
        return None
    

class check_api(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'status': 'ok'})
    
# class social_networkModel(models.Model):

#     SOCIAL_NETWORK_CHOICES = (
#         ('vk', 'ВК'),
#         ('yandex', 'Яндекс'),
#         ('google', 'Google'),
#         ('telegram', 'Telegram'),
#         ('public_services', 'Госуслуги'),
#         ('classmates', 'Одноклассники'),
#         ('my_world', 'Мой мир'),
#     )

#     # Аккаунт
#     account = models.ForeignKey(accountModel, on_delete=models.CASCADE)

#     date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
#     social_network = models.CharField('Соцсеть', max_length=20, choices=SOCIAL_NETWORK_CHOICES)
#     token = models.CharField('Токен', max_length=255)

#     def __str__(self):
#         return str(self.pk) +', '+ self.social_network

#     class Meta:
#         verbose_name = 'Подключенная соцсеть'
#         verbose_name_plural = 'Подключенные соцсети'


class verifyAPIViews(APIView):
    """
    Параметры:
    - `phone_number` (строка): Номер телефона пользователя.
    - `type` (строка): Тип запроса (возможные значения: "register", "login").
    - `login` (строка): Уникальный логин (Указывается в случае type=register)
    - `firstname` (строка): Имя пользователя (Указывается в случае type=register)

    Отправит код, в случае type=register создаст запись в accountModel
    """
    def post(self, request, *args, **kwargs):
        # Получаю данные
        phone_number = request.data.get('phone_number', '')
        phone_number = normalize_phone_number(str(phone_number))
        type = request.data.get('type', '')


        # Проверка
        if phone_number is None:
            return Response({'error': 'Invalid phone number.'}, status=status.HTTP_400_BAD_REQUEST)
        if not phone_number or not type:
            return Response({'error': 'Phone number and request type are required.'}, status=status.HTTP_400_BAD_REQUEST)
        if type not in ['register', 'login']:
            return Response({'error': 'Invalid request type.'}, status=status.HTTP_400_BAD_REQUEST)


        if type == 'register':
            # Получение доп данных для регистрации
            firstname = request.data.get('firstname', '')
            login = request.data.get('login', '')

            # Проверка
            if not firstname or not login:
                return Response({'error': 'Firstname and login are required.'}, status=status.HTTP_400_BAD_REQUEST)
            if accountModel.objects.filter(login=login).exists():
                return Response({'error': 'User with this login already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            if accountModel.objects.filter(phone_number=phone_number).exists():
                return Response({'error': 'User with this phone number already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                # Создаю аккаунт
                account = accountModel(login=login, name_first=firstname, phone_number=phone_number)
                account.save()

                # Отправляю код
                code = str(random.randint(100000, 999999))
                verify_code = verificationModel(account=account, code_verification=code)
                verify_code.save()
                send_smsDef(recipient=phone_number, verify_code=code)

                data = {
                    'status': 'success', 
                    'user_id': account.id
                }
            except Exception as ex:
                return Response({'error': f'{ex}'}, status=status.HTTP_400_BAD_REQUEST)


        elif type == 'login':
            try:
                account_instance = accountModel.objects.get(phone_number=phone_number)
            except accountModel.DoesNotExist:
                return Response({'error': f'User with phonenumber {phone_number} not found'}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                code = str(random.randint(100000, 999999))
                verify_code = verificationModel(account=account_instance, code_verification=code)
                verify_code.save()
                answer = send_smsDef(recipient=phone_number, verify_code=code)
            except Exception as ex:
                return Response({'error': f'{ex}'}, status=status.HTTP_400_BAD_REQUEST)

            data = {
                'status': 'success', 
                'user_id': account_instance.id
            }

        return Response(data, status=status.HTTP_200_OK)
    
class vk_authAPIViews(APIView):
    def post(self, request):
        debug = True  # Переменная для включения режима отладки

        code = request.data.get('code', '')
        if not code:
            return Response({'error': 'code is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if debug:
            print("1-----------------------------------------------------------\nCode received:", code)

        # Параметры для URL
        params = {
            "client_id": VK_CLIENT_ID,
            "client_secret": VK_SECRET_KEY,
            "redirect_uri": VK_REDIRECT,
            "code": code
        }

        # URL для запроса
        url = "https://oauth.vk.com/access_token"

        try:
            # Отправка GET-запроса
            response = requests.get(url, params=params)
            response.raise_for_status()  # Проверка на ошибки HTTP

            if debug:
                print("2------------------------------------------------\nAccess token response:", response.json())

            token_data = response.json()
        except requests.RequestException as e:
            print("[1]--------------------------Error during access token request:", e)
            return Response({'error': 'Failed to get access token'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            user_id = token_data['user_id']
            access_token = token_data['access_token']
            email = token_data.get('email')  # Email может отсутствовать

            if debug:
                print("3------------------------------------------------\nToken data:")
                print("User ID:", user_id)
                print("Access Token:", access_token)
                print("Email:", email if email else "No email")

            vk_api_url = "https://api.vk.com/method/users.get"
            params = {
                "user_ids": user_id,
                "access_token": access_token,
                "fields": "photo_200",
                "v": "5.199"
            }
            
            api_response = requests.get(vk_api_url, params=params)
            api_response.raise_for_status()  # Проверка на ошибки HTTP
            user_data = api_response.json()

            if debug:
                print("4------------------------------------------------\nVK API response:", user_data)

            first_name = user_data['response'][0]['first_name']
            last_name = user_data['response'][0]['last_name']
            photo = user_data['response'][0]['photo_200']

        except requests.RequestException as e:
            print("[2]-------------------------------------Error during VK API request:", e)
            return Response({'error': 'Failed to get user data'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except (KeyError, IndexError) as e:
            print("[3]---------------------------------------Error parsing VK API response:", e)
            return Response({'error': 'Invalid data received from VK API'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            # Проверка существования социального аккаунта
            t_social_account = social_networkModel.objects.filter(vk_id=user_id)
            if debug:
                print("5-----------------------------------------------\nSocial account:",
                      t_social_account, t_social_account.exists(), t_social_account.first(), access_token)
            if t_social_account.exists():
                # Получение аккаунта
                account = t_social_account.first().account
                if debug:
                    print("6-----------------------------------------------------------\nSocial account exists:", account)

                # Создание токена и ответ
                token = str(secrets.token_hex(32))
                tokenModel(account=account, token=token).save()
                response_data = {
                    'status': 'success',
                    'user_id': account.id,
                    'token': token,
                    'name': account.name_first + ' ' + account.name_last,
                    'avatar': account.avatar,
                    'isBlogger': account.isBlogger
                }
            else:
                # Создание нового аккаунта
                
                # Устанавка аватара локально
                
                
                account = accountModel.objects.create(
                    name_first=first_name,
                    name_last=last_name,
                    avatar=photo
                )
                if debug:
                    print("7---------------------------------------------------------\nCreated new account:", account)

                account.save()
                social_networkModel.objects.create(
                    token=access_token,
                    account=account,
                    social_network=social_networkModel.SOCIAL_NETWORK_CHOICES[0][0],
                    vk_id=user_id
                )
                token = str(secrets.token_hex(32))
                tokenModel(account=account, token=token).save()
                response_data = {
                    'status': 'success',
                    'user_id': account.id,
                    'token': token,
                    'name': account.name_first + ' ' + account.name_last,
                    'avatar': account.avatar,
                    'isBlogger': account.isBlogger
                }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            print("[4]---------------------------------------Error processing or creating account:", e)
            return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class yandex_authAPIViews(APIView):
    def post(self, request):
        debug = True
        code = request.data.get('code', '')
        if not code:
            return Response({'error': 'code is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if debug:
            print("Yandex code:", code)
        
        yandex_api_url = "https://oauth.yandex.ru/token"
        params = {
            "grant_type": "authorization_code",
            "code": code,
            "client_id": YANDEX_CLIENT_ID,
            "client_secret": YANDEX_SECRET_KEY
        }
        
        try:
            api_response = requests.post(yandex_api_url, data=params)
            #create request with form data
            
            api_response.raise_for_status()  # Проверка на ошибки HTTP
            token_data = api_response.json()
            
            if debug:
                print("0------------------------------------------------\nYandex API response:", api_response)
            
            access_token = token_data['access_token']
            
            if debug:
                print("1------------------------------------------------\nYandex API response:", token_data)
                
            yandex_api_url = "https://login.yandex.ru/info"
            params = {
                "format": "json",
                "oauth_token": access_token
            }
            
            api_response = requests.get(yandex_api_url, params=params)
            api_response.raise_for_status()  # Проверка на ошибки HTTP
            user_data = api_response.json()
            
            if debug:
                print("2------------------------------------------------\nYandex API response:", user_data, api_response)
                
            user_id = user_data['id']
            first_name = user_data['first_name']
            last_name = user_data['last_name']
            photo = user_data['default_avatar_id']
            avatar = f"https://avatars.yandex.net/get-yapic/{photo}/islands-200"
            phone = user_data['default_phone'].get('number', '')
            login = user_data['login']
            
            if debug:
                print("3------------------------------------------------\nYandex API response:", user_id, first_name, last_name, avatar, phone, login)
                
        except Exception as e:
            print("[2]---------------------------------------Error parsing Yandex API response:", e)
            return Response({'error': 'Invalid data received from Yandex API'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Проверка существования социального аккаунта
        # Replace 'social_account' with the appropriate model name
        t_social_account = social_networkModel.objects.filter(ya_id=user_id)
        if t_social_account.exists():
            # Social account exists
            # Получение аккаунта
            account = t_social_account.first().account
            if debug:
                print("3-----------------------------------------------------------\nSocial account exists:", account)

            # Создание токена и ответ
            token = str(secrets.token_hex(32))
            tokenModel(account=account, token=token).save()
            #get or create wallet
            walletModel.objects.get_or_create(account=account)
            
            response_data = {
                'status': 'success',
                'user_id': account.id,
                'token': token,
                'name': account.name_first + ' ' + account.name_last,
                'avatar': account.avatar,
                'isBlogger': account.isBlogger
            }
        else:
            # Создание нового аккаунта
                
            # Устанавка аватара локально
            
            
            account = accountModel.objects.create(
                name_first=first_name,
                name_last=last_name,
                avatar=avatar,
                login=login,
                phone_number=phone
            )
            if debug:
                print("7---------------------------------------------------------\nCreated new account:", account)

            account.save()
            social_networkModel.objects.create(
                token=access_token,
                account=account,
                social_network=social_networkModel.SOCIAL_NETWORK_CHOICES[0][0],
                ya_id=user_id
            )
            token = str(secrets.token_hex(32))
            tokenModel(account=account, token=token).save()
            walletModel.objects.create(account=account).save()
            response_data = {
                'status': 'success',
                'user_id': account.id,
                'token': token,
                'name': account.name_first + ' ' + account.name_last,
                'avatar': account.avatar,
                'isBlogger': account.isBlogger
            }

        return Response(response_data, status=status.HTTP_200_OK)
    

class verify_codeAPIViews(APIView):
    """
    Параметры:
    - `user_id` (целое число): ID пользователя.
    - `code` (строка): Код подтверждения.

    Сверит код, создаст токен
    """
    def post(self, request):
        # Получение данных
        user_id = request.data.get('user_id', '')
        verify_code = request.data.get('code', '')


        # Проверки 
        if not user_id or not verify_code:
            return Response({'error': 'user_id and code are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        current_account = accountModel.objects.filter(id=int(user_id))
        if not current_account.exists():
            return Response({'error': 'User with this id not found.'}, status=status.HTTP_400_BAD_REQUEST)
        
        current_verification = verificationModel.objects.filter(account=current_account.first())
        if not current_verification.exists():
            return Response({'error': 'Verification code was not sent.'}, status=status.HTTP_400_BAD_REQUEST)
        
        saved_code = current_verification.last().code_verification


        # id: 1,
		# name: 'Test User',
		# avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
		# permission: {
		# 	id: 0,
		# 	name: 'Просмотр',
		# } as IPermission,
		# nick: '@testuser',
		# isBlogger: false,

        # Проверка кода верификации
        if str(verify_code) == str(saved_code):
            # Создание токена и его сохранение
            token = str(secrets.token_hex(8))
            tokenModel(account=current_account.first(), token=token).save()
            data = {
                'status': 'success',
                'token': token,
                'user_id': current_account.first().id,
                'name': current_account.first().name_first + ' ' + current_account.first().name_last,
                'avatar': current_account.first().avatar,
                # 'permission': current_account.first().permission,
                'nick': current_account.first().login,
                'isBlogger': current_account.first().isBlogger,
            }
        else:
            return Response({'error': 'Invalid code.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(data, status=status.HTTP_200_OK)
    

class check_tokenAPIViews(APIView):
    def post(self, request):
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'status': 'ok', 'user_id': current_token.first().account.id}, status=status.HTTP_200_OK)


# all private data can be accessed by user token
# get ad_companyModel (private POST)
class getCompaniesAPIViews(APIView):
    def post(self, request):
        # get user by token
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        user = current_token.first().account
        companies = list(ad_companyModel.objects.filter(account=user.id).values())
        
        #create one object with all data
        for company in companies:
            site = siteModel.objects.filter(id=company["site_id"])
            if not site.exists():
                return Response({'error': 'site not found.'}, status=status.HTTP_400_BAD_REQUEST)
            
            #get images from BannerImage model from ad_bannerModel from company
            
            images = []
            for banner in ad_bannerModel.objects.filter(ad_company=company["id"]):
                for image in BannderImage.objects.filter(banner=banner):
                    #get full url
                    full_url = request.build_absolute_uri(image.image.url).replace("a_media/a_media", "a_media")
                    images.append(full_url)
            # print(images)
            company["images"] = images
            site = site.first()
            
            #JSON serialization
            company["site"] = {}
            company["site"]["id"] = site.id
            company["site"]["domain"] = site.domain
            company["site"]["date_creation"] = site.date_creation
            company["site"]["shows"] = site.shows
            company["site"]["masked_domain"] = site.masked_domain
            
            # print("1-------------------------------------------------------------")
            
            # ad_statusModel and ad_companyModel many-to-many relation. Get all ad_statusModel objects for this company
            company["ad_status"] = list(ad_statusModel.objects.filter(companies=company["id"]).values())
            
            # ad_audienceModel and ad_companyModel many-to-many relation. Get all ad_audienceModel objects for this company
            company["ad_audience"] = list(ad_audienceModel.objects.filter(ad_company=company["id"]).values())
            
            # ad_bannerModel and ad_companyModel many-to-many relation. Get all ad_bannerModel objects for this company
            company["ad_banner"] = list(ad_bannerModel.objects.filter(ad_company=company["id"]).values())

            

            # print(companies, user, site)
        return Response(companies, status=status.HTTP_200_OK)
    

# get balance (private POST)
class getBalanceAPIViews(APIView):
    def post(self, request):
        # get user by token
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        user = current_token.first().account
        walletModel.objects.get_or_create(account=user)
        balance = walletModel.objects.filter(account=user.id).first().balance
        currency = walletModel.objects.filter(account=user.id).first().currency_sign
        return Response({'balance': balance, 'currency': currency, 'status': 'ok'}, status=status.HTTP_200_OK)

# get wallet operations (private POST)
class getWalletOperationsAPIViews(APIView):
    def post(self, request):
        # get user by token
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        user = current_token.first().account
        wallet = walletModel.objects.filter(account=user.id).first()
        operations = list(walletOperationsModel.objects.filter(wallet=wallet).values())
        return Response(operations, status=status.HTTP_200_OK)

from django.db import transaction
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework import status
import json
from datetime import datetime as dt, timedelta
import random
from django.utils.dateparse import parse_datetime

from datetime import datetime as dt, timedelta
class AddCompany(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
            # Token validation
            token = request.data.get('token', '')
            if not token:
                return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

            current_token = tokenModel.objects.filter(token=token).select_related('account')
            if not current_token.exists():
                return Response({'error': 'Token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
            account = current_token.first().account

            # Parsing data
            try:
                company_data = json.loads(request.data.get('Company', '{}'))
                auditor_data = json.loads(request.data.get('Auditor', '{}'))
                banner_data = json.loads(request.data.get('Banner', '{}'))
            except json.JSONDecodeError:
                return Response({'error': 'Invalid JSON data.'}, status=status.HTTP_400_BAD_REQUEST)

            # Retrieve or create the site
            domain = company_data.get('cLink', '')
            price_target = company_data.get('cTarget', 0)
            ban_show = company_data.get('cBanShow', []) if company_data.get('cBanShow', []) else []
            site, _ = siteModel.objects.get_or_create(domain=domain)

            # print("1-----------------------------------------------------------------------------------------------")

            # Create ad_company
            company = ad_companyModel.objects.create(
                name=company_data.get('cName', ''),
                site=site,
                # date_start=parse_datetime(company_data.get('cDateStart', '')) if company_data.get('cDateStart', '') else None,
                # date_finish=parse_datetime(company_data.get('cDateEnd', '')) if company_data.get('cDateEnd', '') else None,
                date_start=dt.strptime(company_data.get('cDateStart', ''), '%d.%m.%Y') if company_data.get('cDateStart', '') else None,
                date_finish=dt.strptime(company_data.get('cDateEnd', ''), '%d.%m.%Y') if company_data.get('cDateEnd', '') else None,
                price_target = price_target,
                ban_show = ban_show,
                budget_week=int(company_data.get('cWeekBudget', 0)),
                channel_taboo=company_data.get('cSettingsLink', []) if company_data.get('cSettingsLink', []) else [],
                phrase_plus=company_data.get('cKeyWord', []) if company_data.get('cKeyWord', []) else [],
                phrase_minus=company_data.get('cKeyWordDel', []) if company_data.get('cKeyWordDel', []) else [],
                status_text='Остановлена',
                views=0,
                account=account,
            )
            
            # print("2-----------------------------------------------------------------------------------------------")
            

            # Create ad_audience
            audience = ad_audienceModel.objects.create(
                name=auditor_data.get('aName', ''),
                site=site,
                ad_company=company,
                geography=auditor_data.get('aGeography', []),
                category=auditor_data.get('aCategories', []),
                interest=auditor_data.get('aFavor', []),
                gender_age=auditor_data.get('aGenderNAge', []),
                device=auditor_data.get('aDevice', []),
                solvency=[],
                account=account,
            )

            # print("3-----------------------------------------------------------------------------------------------")


            # Create ad_banner
            banner = ad_bannerModel.objects.create(
                account=account,
                site=site,
                ad_company=company,
                ad_audience=audience,
                name=banner_data.get('bName', ''),
                link=banner_data.get('bLink', ''),
                title_option=banner_data.get('titleArray', []),
                description_option=banner_data.get('descrArray', []),
                video_option=[],
                audio_option=[],
                channel_private_bool=banner_data.get('bUnvirfied', True)
            )

            # print("4-----------------------------------------------------------------------------------------------")

            files = request.FILES.getlist('bImages')  # Получение списка файлов

            # Список экземпляров BannderImage, которые будут связаны с баннером
            img_instances = []

            for file in files:
                # Генерация уникального имени для файла
                unique_file_name = f"{uuid.uuid4()}{file.name[file.name.rfind('.'):]}"
                
                # Сохранение файла в нужной директории и получение URL к файлу
                file_name = default_storage.save(f'banner_images/{unique_file_name}', ContentFile(file.read()))
                file_url = default_storage.url(file_name)
                
                # Создание экземпляра BannderImage для каждого изображения
                image = BannderImage.objects.create(
                    banner=banner,  # если поле 'banner' необязательно, это можно опустить
                    image=file_url
                )
                
                img_instances.append(image)

            # Для установления связи с новым набором изображений (заменит все существующие связи)
            banner.images.set(img_instances)

            return Response({'message': 'Company, Auditor, Banner, and Banner Images created successfully!'}, status=status.HTTP_201_CREATED)


class GetAudience(APIView):

    def get(self, request):
        token = request.GET.get('token', '')

        if not token:
            return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token).first()
        if not current_token:
            return Response({'error': 'Token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        audiences = ad_audienceModel.objects.filter(account=current_token.account)
        audience_data = [{'name': audience.name, 'geography': audience.geography, 'device': audience.device} for audience in audiences]

        return Response({'audiences': audience_data}, status=status.HTTP_200_OK)

class GetBanners(APIView):

    def get(self, request):
        token = request.GET.get('token', '')

        if not token:
            return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token).first()
        if not current_token:
            return Response({'error': 'Token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        banners = ad_bannerModel.objects.filter(account=current_token.account)
        banner_data = [{'name': banner.name, 'link': banner.link, 'title_option': banner.title_option} for banner in banners]

        return Response({'banners': banner_data}, status=status.HTTP_200_OK)

class GetSites(APIView):

    def get(self, request):
        token = request.GET.get('token', '')

        if not token:
            return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token).first()
        if not current_token:
            return Response({'error': 'Token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch related banners and companies
        banners = ad_bannerModel.objects.filter(account=current_token.account)
        companies = ad_companyModel.objects.filter(account=current_token.account)

        # Extract unique site ids from banners and companies
        site_ids = set(banners.values_list('site', flat=True)) | set(companies.values_list('site', flat=True))

        # Fetch unique sites by ids and prefetch related companies
        unique_sites = siteModel.objects.filter(id__in=site_ids).distinct().prefetch_related(
            Prefetch('ad_companyModel_siteModel', queryset=companies, to_attr='related_companies')
        )

        # Construct site data with associated companies
        site_data = []
        for site in unique_sites:
            site_companies = [{
                'id': company.id,
                'name': company.name,
                'date_start': company.date_start,
                'date_finish': company.date_finish,
                'status_text': company.status_text,
                # Include other company fields as needed
            } for company in getattr(site, 'related_companies', [])]

            site_data.append({
                'id': site.id,
                'domain': site.domain,
                'date_creation': site.date_creation,
                'companies': site_companies
            })

        return Response({'sites': site_data}, status=status.HTTP_200_OK)

class depositAPIViews(APIView):
    def post(self, request):
        # get user by token
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = current_token.first().account
        currency = walletModel.objects.filter(account=user.id).first().currency_sign
        
        pay_amount = request.data.get('pay_amount', '')
        if not pay_amount:
            return Response({'error': 'pay_amount is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        pay_amount = float(pay_amount)
        
        clientId = user.id
        service_name = "Пополнение баланса"
        
        data = {
            "clientId": str(clientId),
            "service_name": service_name,
            "pay_amount": str(pay_amount),
            "token": ""
        }
        
        url = PAYKEEPER_URL + "/change/invoice/preview/"
        
        #base64 encoded login and password (login:password) for basic auth
        encoded_login = base64.b64encode(bytes(PAYKEEPER_LOGIN + ":" + PAYKEEPER_PASSWORD, "utf-8")).decode("utf-8")
        print(encoded_login, "Encoded login")
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + encoded_login
        }
        
        token_paykeeper = ""
        
        #get token using only headers
        response = requests.post(PAYKEEPER_URL + "/info/settings/token/", headers=headers)
        if response.status_code == 200:
            print(response.json())
            token_paykeeper = response.json()["token"]
            data["token"] = str(token_paykeeper)

        #check token
        if token_paykeeper == "":
            return Response({'error': 'paykeeper token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
        invoice_id = ""
        invoice_url = ""
        print(token_paykeeper, "Token paykeeper")
        
        #response to url by using token in body, and headers applyed
        # data = json.dumps(data)
        response = requests.post(url, headers=headers, data=data)
        if response.status_code == 200:
            print(response.json(), "Data:", data)
            invoice_id = response.json()["invoice_id"]
            invoice_url = response.json()["invoice_url"]
        
        if invoice_id == "":
            return Response({'error': 'paykeeper invoice id is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if invoice_url == "":
            return Response({'error': 'paykeeper invoice url is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
        wallet = walletModel.objects.filter(account=user.id).first()
        walletOperationsModel.objects.create(
            wallet=wallet,
            balance=pay_amount,
            invoice_id=invoice_id,
            isConfirm=False
        )
        
        return Response({'url': invoice_url, 'invoice_id': invoice_id, 'status': 'ok'}, status=status.HTTP_200_OK)
    
class depositApplyAPIViews(APIView):
    def post(self, request):
        # Получение пользователя по токену
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        if not current_token.exists():
            return Response({'error': 'token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = current_token.first().account
        currency = walletModel.objects.filter(account=user.id).first().currency_sign
        
        invoice_id = request.data.get('invoice_id', '')
        
        if not invoice_id:
            return Response({'error': 'invoice_id is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        wallet = walletModel.objects.filter(account=user.id).first()
        
        print("Start invoice_id", invoice_id)
        
        # Кодированные логин и пароль для базовой аутентификации
        encoded_login = base64.b64encode(bytes(PAYKEEPER_LOGIN + ":" + PAYKEEPER_PASSWORD, "utf-8")).decode("utf-8")
        
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + encoded_login
        }
        
        token_paykeeper = ""
        
        body_data = {
            "token": token_paykeeper,
            "id": invoice_id
        }
        print(body_data, "body_data")
        
        # Получение токена используя только заголовки
        response = requests.get(PAYKEEPER_URL + "/info/settings/token/", headers=headers)
        if response.status_code == 200:
            token_paykeeper = response.json()["token"]
            body_data = {
                "token": token_paykeeper
            }
        
        # Проверка токена
        if token_paykeeper == "":
            return Response({'error': 'paykeeper token is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
        operation = walletOperationsModel.objects.filter(invoice_id=invoice_id, wallet=wallet).first()
        
        # Если операция уже была подтверждена, возвращаем статус ok
        if operation.isConfirm:
            return Response({'status': 'ok'}, status=status.HTTP_200_OK)
        
        url = PAYKEEPER_URL + "/info/invoice/byid/?id=" + invoice_id
        print(url)
        
        response = requests.get(url, headers=headers, json=body_data, data=body_data)
        if response.status_code == 200:
            print(response.json())
            if response.json()["status"] == "paid":
                isConfirm = True
            else:
                isConfirm = False
        
        if not isConfirm:
            return Response({'error': 'paykeeper error.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Пополнение баланса происходит только если операция не была подтверждена ранее.
        if not operation.isConfirm:
            wallet.balance += operation.balance
            wallet.save()
        
            operation.isConfirm = True
            operation.operationType = '+'
            operation.operation = 'Пополнение'
            operation.save()
        
        return Response({'status': 'ok'}, status=status.HTTP_200_OK)

class WalletOperationsView(APIView):
    def get(self, request):
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Получение данных пользователя по токену (замените следующую строку своей логикой получения пользователя)
        current_token = tokenModel.objects.filter(token=token)
        user = current_token.first().account # Реализуйте функцию get_user_by_token(token)
        if user is None:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        wallet = walletModel.objects.filter(account=user).first()
        if not wallet:
            return Response({'error': 'Wallet not found.'}, status=status.HTTP_404_NOT_FOUND)

        operations = walletOperationsModel.objects.filter(wallet=wallet)
        
        # Формируем список операций для ответа
        operations_list = []
        for operation in operations:
            operation_data = {
                'date_creation': operation.date_creation,
                'balance': operation.balance,
                'currency_sign': operation.currency_sign,
                'operation': operation.operation,
                'operationType': operation.operationType,
                'invoice_id': operation.invoice_id,
                'isConfirm': operation.isConfirm
            }
            operations_list.append(operation_data)
        
        return Response({'operations': operations_list}, status=status.HTTP_200_OK)
    
    
class getAllActiveCompanies(APIView):

    def get(self, request):
        token = request.GET.get('token', '')

        if not token:
            return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Проверка наличия пользователя и его токена
        try:
            current_token = tokenModel.objects.get(token=token)
        except tokenModel.DoesNotExist:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_404_NOT_FOUND)
        
        user = current_token.account

        # Получаем ID компаний, которые уже добавлены пользователем
        added_company_ids = BloggerCompany.objects.filter(account=user).values_list('company', flat=True)

        # Получаем список активных компаний, исключая добавленные
        active_companies = ad_companyModel.objects.exclude(id__in=added_company_ids).filter(
            status_text='Активная'
        ).prefetch_related(
            Prefetch('ad_bannerModel_ad_companyModel', queryset=ad_bannerModel.objects.prefetch_related('banner_image')),
            'ad_audienceModel_ad_companyModel',
            'ad_statusModel_companies',
        ).select_related('site')
        
        
        # Construct the response data
        companies_data = []
        for company in active_companies:
            company_info = {
                'id': company.id,
                'name': company.name,
                'date_start': company.date_start,
                'date_finish': company.date_finish,
                'status_text': company.status_text,
                'budget_week': company.budget_week,
                'views': company.views,
                'ban_show': company.ban_show,
                'site': {
                    'id': company.site.id if company.site else None,
                    'domain': company.site.domain if company.site else '',
                    'date_creation': company.site.date_creation if company.site else None,
                    'masked_domain': company.site.masked_domain if company.site else '',
                    'shows': company.site.shows if company.site else 0,
                },
                'banners': [
                    {
                        'id': banner.id,
                        'name': banner.name,
                        'link': banner.link,
                        'title_option': banner.title_option,
                        'description_option': banner.description_option,
                        'image_option': banner.image_option,
                        'video_option': banner.video_option,
                        
                        'audio_option': banner.audio_option,
                        'channel_private_bool': banner.channel_private_bool,
                        'images': BannderImage.objects.filter(banner=banner).values_list('image', flat=True),
                    } for banner in company.ad_bannerModel_ad_companyModel.all()
                ],
                'audiences': [
                    {
                        'id': audience.id,
                        'name': audience.name,
                        'geography': audience.geography,
                        'category': audience.category,
                        'interest': audience.interest,
                        'gender_age': audience.gender_age,
                        'device': audience.device,
                        'solvency': audience.solvency,
                    } for audience in company.ad_audienceModel_ad_companyModel.all()
                ],
                'statuses': [
                    {
                        'id': status.id,
                        'status': status.status,
                        'text': status.text,
                    } for status in company.ad_statusModel_companies.all()
                ]
            }
            companies_data.append(company_info)

        return Response({'companies': companies_data}, status=status.HTTP_200_OK)


class GetBloggerCompanies(APIView):

    def post(self, request):
        # Получение и валидация токена
        token = request.POST.get('token', '')
        if not token:
            return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            current_token = tokenModel.objects.get(token=token)
        except tokenModel.DoesNotExist:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_404_NOT_FOUND)

        user = current_token.account

        # Получение списка компаний, добавленных блогером
        blogger_companies = BloggerCompany.objects.filter(account=user).select_related('company').all()

        # Сериализация данных
        companies_data = []
        for blogger_company in blogger_companies:
            company = blogger_company.company
            modelMaskedDomain = jumpToADPage.objects.filter(site=company.site).first()
            model_clicks = statisticModel.objects.filter(masked_url=modelMaskedDomain.masked_url).first()
            # print(model_clicks)
            company_data = {
                'clicks': model_clicks.clicks_sum if model_clicks else 0,
                'id': company.id,
                'name': company.name,
                'tin': company.account.tin,
                'formOrganization': company.account.formOrganization,
                'date_start': company.date_start,
                'date_finish': company.date_finish,
                'status_text': company.status_text,
                'price_target': company.price_target,
                'budget_week': company.budget_week,
                'views': company.views,
                'ban_show': company.ban_show,
                'site': {
                    'id': company.site.id if company.site else None,
                    'domain': company.site.domain if company.site else '',
                    'date_creation': company.site.date_creation if company.site else None,
                    'masked_domain': modelMaskedDomain.masked_url if modelMaskedDomain else '',
                    'shows': company.site.shows if company.site else 0,
                },
                'banners': [
                    {
                        'id': banner.id,
                        'name': banner.name,
                        'link': banner.link,
                        'title_option': banner.title_option,
                        'description_option': banner.description_option,
                        'image_option': banner.image_option,
                        'video_option': banner.video_option,
                        
                        'audio_option': banner.audio_option,
                        'channel_private_bool': banner.channel_private_bool,
                        'images': BannderImage.objects.filter(banner=banner).values_list('image', flat=True),
                    } for banner in company.ad_bannerModel_ad_companyModel.all()
                ],
                'audiences': [
                    {
                        'id': audience.id,
                        'name': audience.name,
                        'geography': audience.geography,
                        'category': audience.category,
                        'interest': audience.interest,
                        'gender_age': audience.gender_age,
                        'device': audience.device,
                        'solvency': audience.solvency,
                    } for audience in company.ad_audienceModel_ad_companyModel.all()
                ],
                'statuses': [
                    {
                        'id': status.id,
                        'status': status.status,
                        'text': status.text,
                    } for status in company.ad_statusModel_companies.all()
                ]
            }
            companies_data.append(company_data)

        return Response({'companies': companies_data}, status=status.HTTP_200_OK)


class AddCompanyToBlogger(APIView):
    def post(self, request):
        with transaction.atomic():  # Используем транзакцию для обеспечения целостности данных
            token = request.data.get('token', '')
            if not token:
                return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

            current_token = tokenModel.objects.filter(token=token)
            if not current_token.exists():
                return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

            user = current_token.first().account

            company_id = request.data.get('company_id', '')
            if not company_id:
                return Response({'error': 'company_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                company = ad_companyModel.objects.get(id=company_id)
            except ad_companyModel.DoesNotExist:
                return Response({'error': 'Company not found.'}, status=status.HTTP_404_NOT_FOUND)

            # Проверяем, не добавлена ли уже эта компания блогером
            if BloggerCompany.objects.filter(company=company, account=user).exists():
                return Response({'error': 'The company is already added by the user.'}, status=status.HTTP_409_CONFLICT)

            # Создаем запись в модели BloggerCompany
            BloggerCompany.objects.create(company=company, account=user)

            # Генерация маскированного URL
            masked_domain = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(64))
            site = company.site  # Предполагаем, что у компании уже есть связанный сайт

            # Создаем запись в модели jumpToADPage
            jumpToADPage.objects.create(account=user, site=site, masked_url=masked_domain, company=company)

            return Response({
                'status': 'ok',
                'message': 'Company added successfully to blogger.',
                'masked_domain': masked_domain  # Возвращаем маскированный URL в ответе
            }, status=status.HTTP_201_CREATED)



    
# class getCompanyBloggers(APIView):
#     def post(self, request):
#         token = request.GET.get('token', '')
#         user = None
#         if token:
#             try:
#                 user = tokenModel.objects.get(token=token).account
#             except tokenModel.DoesNotExist:
#                 # If token is provided but invalid, return an error
#                 return Response({'error': 'Invalid token.'}, status=status.HTTP_404_NOT_FOUND)

#         # Fetch all active companies, filter by user if user is not None
#         if user:
#             # user_companies = ad_companyModel.objects.filter(account=user).values_list('id', flat=True)
#             active_companies = ad_companyModel.objects.all()
#         else:
#             active_companies = ad_companyModel.objects.all()

#         active_companies = active_companies.filter(
#             status_text='Активная'
#         ).prefetch_related(
#             Prefetch('ad_bannerModel_ad_companyModel', queryset=ad_bannerModel.objects.prefetch_related('banner_image')),
#             'ad_audienceModel_ad_companyModel',
#             'ad_statusModel_companies',
#         ).select_related('site')
#         #active_companies = active_companies.select_related('site')
        
        
        
#         # Construct the response data
#         companies_data = []
#         for company in active_companies:
#             if not ad_bloggerCompanyModel.objects.filter(company=company).exists():
#                 continue
#             company_info = {
#                 'id': company.id,
#                 'name': company.name,
#                 'date_start': company.date_start,
#                 'date_finish': company.date_finish,
#                 'status_text': company.status_text,
#                 'budget_week': company.budget_week,
#                 'views': company.views,
#                 'price_target': company.price_target,
#                 'ban_show': company.ban_show,
#                 'site': {
#                     'id': company.site.id if company.site else None,
#                     'domain': company.site.domain if company.site else '',
#                     'date_creation': company.site.date_creation if company.site else None,
#                     'masked_domain': company.site.masked_domain if company.site else '',
#                     'shows': company.site.shows if company.site else 0,
#                 },
#                 'banners': [
#                     {
#                         'id': banner.id,
#                         'name': banner.name,
#                         'link': banner.link,
#                         'title_option': banner.title_option,
#                         'description_option': banner.description_option,
#                         'image_option': banner.image_option,
#                         'video_option': banner.video_option,
#                         'audio_option': banner.audio_option,
#                         'channel_private_bool': banner.channel_private_bool,
#                         'images': [image.image.url for image in banner.banner_image.all()]  # Don't work
#                     } for banner in company.ad_bannerModel_ad_companyModel.all()
#                 ],
#                 'audiences': [
#                     {
#                         'id': audience.id,
#                         'name': audience.name,
#                         'geography': audience.geography,
#                         'category': audience.category,
#                         'interest': audience.interest,
#                         'gender_age': audience.gender_age,
#                         'device': audience.device,
#                         'solvency': audience.solvency,
#                     } for audience in company.ad_audienceModel_ad_companyModel.all()
#                 ],
#                 'statuses': [
#                     {
#                         'id': status.id,
#                         'status': status.status,
#                         'text': status.text,
#                     } for status in company.ad_statusModel_companies.all()
#                 ]
#             }
#             companies_data.append(company_info)

#         return Response({'companies': companies_data}, status=status.HTTP_200_OK)
    
    
# class jumpToADPage(models.Model):
#     date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)
#     account = models.ForeignKey('accountModel', on_delete=models.CASCADE)
#     site = models.ForeignKey('siteModel', on_delete=models.CASCADE)
    
#     shows = models.IntegerField('Показы', default=0)
    
#     masked_url = models.CharField('Маскированный URL', max_length=512)

#     def __str__(self):
#         return str(self.pk) + ', ' + str(self.isJump)
    
# class jumpsToMaskedLink(models.Model):
#     date_creation = models.DateTimeField('Дата и время создания', auto_now_add=True)

#     def __str__(self):
#         return str(self.pk) + ', ' + str(self.isJump)

class generateMaskedURL(APIView):
    def post(self, request):
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        current_token = tokenModel.objects.filter(token=token)
        user = current_token.first().account
        if user is None:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        domain = request.data.get('domain', '')
        if not domain:
            return Response({'error': 'domain is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        company_id = request.data.get('company_id', '')

        #generate random string (64 chars) unique and create jumpToADPage model
        masked_domain = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(64))
        jumpToADPage.objects.create(account=user, site=siteModel.objects.get(domain=domain), masked_url=masked_domain, company=ad_companyModel.objects.get(id=company_id))

        return Response({'masked_domain': masked_domain}, status=status.HTTP_200_OK)
    
    
from django.db.models import F
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class checkTransition(APIView):
    def post(self, request):
        masked_domain = request.data.get('masked_domain', '')
        if not masked_domain:
            return Response({'error': 'masked_domain is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        jump = jumpToADPage.objects.select_related('site', 'account').filter(masked_url=masked_domain).first()
        if not jump:
            return Response({'error': 'Jump not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        current_time = timezone.now()
        company = jump.site.ad_companyModel_siteModel.first()  # Assuming direct relation for simplicity

        # Checks if action should be taken based on campaign period and status
        if not (company.date_start <= current_time <= company.date_finish) or company.status_text != "Активная":
            return Response({'message': 'No action taken due to company status or campaign period.'}, status=status.HTTP_200_OK)
        
        # Increment jump shows
        jump.shows += 1
        jump.save()

        # Create jumpsToMaskedLink record
        jumpsToMaskedLink.objects.create(jump=jump)
        
        # Update company statistics
        self.update_statistics(jump.masked_url, current_time, company)
        
        return Response({'normal_url': jump.site.domain}, status=status.HTTP_200_OK)

    def update_statistics(self, masked_url, click_time, company):
        stats, created = statisticModel.objects.get_or_create(
            masked_url=masked_url,
            defaults={'clicks_sum': 1, 'clicks': [click_time], 'first_click': click_time, 'last_click': click_time}
        )
        
        if not created:
            stats.clicks_sum += 1
            stats.clicks.append(click_time)
            stats.last_click = click_time
            stats.save()

        if stats.last_click >= company.date_finish:
            company.status_text = "Завершена"
            company.save()
        
        self.calculate_current_cpc(company)
        self.paymentToBlogger(masked_url, stats.first_click, stats.last_click, stats.clicks_sum, company)

        # Assuming payment processing is called here or elsewhere as needed

    def calculate_current_cpc(self, company):
        # Placeholder for CPC calculation logic. Adjust as needed.
        # This could involve complex logic based on total clicks, budget, and campaign performance.
        company.current_cpc = min(company.price_target, company.current_cpc)  # Simplified example
        company.save()
        
    def paymentToBlogger(self, masked_url, first_click, last_click, click_sum, company):
        # Check company status before proceeding
        if company.status_text != "Активная":
            return

        # Get the company's wallet to check the balance
        company_wallet = get_object_or_404(walletModel, account=company.account)

        # If the company's wallet balance is <= 0, update status and return
        if company_wallet.balance <= 0:
            company.status_text = "Остановлена"
            company.save(update_fields=['status_text'])
            return

        jump_page = jumpToADPage.objects.get(masked_url=masked_url)
        blogger = jump_page.account

        # Calculate total consumption with respect to company's price_target
        cpc = min(company.current_cpc, company.price_target)
        total_consumption = cpc * click_sum
        
        # Check if payment exceeds the company's remaining balance
        if total_consumption > company_wallet.balance:
            # Optional: Handle scenario where partial payment could be considered or simply stop payment
            company.status_text = "Остановлена"
            company.save(update_fields=['status_text'])
            return

        # Proceed with payment if conditions are met
        blogger_wallet, _ = walletModel.objects.get_or_create(account=blogger, defaults={'balance': 0})
        blogger_wallet.balance = F('balance') + total_consumption
        blogger_wallet.save(update_fields=['balance'])
        
        walletOperationsModel.objects.create(
            wallet=blogger_wallet,
            operation=f"Payment for company '{company.name}' (ID {company.id})",
            balance=total_consumption,
            operationType="+",
            isConfirm=True
        )
    
from django.db.models import Sum, Avg
from collections import defaultdict
from django.db.models.functions import TruncDay
from django.db.models.functions import TruncWeek

#TODO
class StatisticsAPIView(APIView):
    DEBUG = True  # Переменная для режима отладки
    TEST = True  # Переменная для тестового режима

    def post(self, request, *args, **kwargs):
        # Получение данных из запроса
        company_ids = request.data.get('company_ids', [])
        token = request.data.get('token', '')
        
        print("0-----------------------------------------------------------\nCompany IDs:", company_ids)
        print("Token:", token)
        print("Company IDs:", company_ids)
        print("0end-----------------------------------------------------------")
        # Валидация токена (Реализуйте функцию валидации токена)
        if not self.validate_token(token):
            return Response({'error': 'Invalid or expired token'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            # Получение статистики для указанных компаний
            statistics = self.get_statistics(company_ids)

            if self.DEBUG:
                print("Statistics: ", statistics)

            return Response(statistics, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def validate_token(self, token):
        """
        Функция для валидации токена пользователя.
        """
        return tokenModel.objects.filter(token=token).exists()

    def get_statistics(self, company_ids):
            """
            Функция для получения статистики по указанным компаниям.
            """
            if self.TEST:
                return self.generate_dummy_data()

            statistics = {
                'click_sum': 0,
                'cpc_sum': 0.0,
                'total_spent': 0.0,
                'statistics': {
                    'click': [],
                    'spent': [],
                    'cpc': [],
                }
            }

            # Обработка реальных данных
            jumpToADPage.objects.filter(company=company_ids)
            stats = statisticModel.objects.filter(company__id__in=company_ids)
            statistics['click_sum'] = stats.aggregate(Sum('clicks_sum'))['clicks_sum__sum'] or 0
            
            # Расчет расходов и средней цены за клик
            weekly_stats = stats.annotate(week=TruncWeek('last_click')).values('week', 'company').annotate(
                weekly_clicks=Sum('clicks_sum')
            ).order_by('week')

            for week_stat in weekly_stats:
                company = week_stat['company']
                weekly_clicks = week_stat['weekly_clicks']
                weekly_budget = company.budget_week
                price_per_click = company.price_target
                
                # Расчет фактической средней цены за клик
                if weekly_clicks * price_per_click <= weekly_budget:
                    actual_price_per_click = price_per_click
                else:
                    actual_price_per_click = weekly_budget / weekly_clicks

                # Расчет расходов за неделю
                weekly_spent = weekly_clicks * actual_price_per_click
                statistics['total_spent'] += weekly_spent
                
                # Сохранение данных о расходах и кликах по неделям
                statistics['statistics']['spent'].append({
                    'week': week_stat['week'].strftime('%Y-%m-%d'),
                    'spent': weekly_spent,
                    'clicks': weekly_clicks
                })
                statistics['statistics']['cpc'].append({
                    'week': week_stat['week'].strftime('%Y-%m-%d'),
                    'cpc': actual_price_per_click
                })

                
            statistics['cpc_sum'] = statistics['total_spent'] / statistics['click_sum'] if statistics['click_sum'] > 0 else 0



            return statistics

    def generate_dummy_data(self):
        """
        Функция для генерации тестовых данных.
        """
        data = {
            'click_sum': random.randint(1000, 10000),
            'cpc_sum': random.uniform(0.5, 5.0),
            'consumption': random.randint(10000, 20000),
            'statistics': {
                'click': [],
                'cpc': [],
                'consumption': [],
            }
        }

        # Создание статистики для каждого дня в периоде
        date_cursor = datetime.now() - timedelta(days=364)  # Начало периода - 1 год назад
        for i in range(365):
            date_str = date_cursor.strftime('%Y-%m-%d %H:%M:%S')
            data['statistics']['click'].append({'datetime': date_str, 'value': random.randint(0, 100)})
            data['statistics']['cpc'].append({'datetime': date_str, 'value': random.uniform(0, 10)})
            data['statistics']['consumption'].append({'datetime': date_str, 'value': random.randint(0, 1000)})
            date_cursor += timedelta(days=1)

        return data
    
#delete company
class deleteCompany(APIView):
    def post(self, request):
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = tokenModel.objects.get(token=token).account
        except tokenModel.DoesNotExist:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_404_NOT_FOUND)

        #get companies ids array
        company_id = request.data.get('companies_ids', [])
        #from string ("[3,4]") to array ([3, 4])
        company_id = json.loads(company_id)
        print("---------------------------------------------------------------------------\n",type(company_id), company_id,"\n------------------\n")
        
        if not company_id:
            return Response({'error': 'company_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            #get array of companies from their ids
            company = ad_companyModel.objects.filter(id__in=company_id)
        except ad_companyModel.DoesNotExist:
            return Response({'error': 'Company not found.'}, status=status.HTTP_404_NOT_FOUND)

        #if all companies are not associated with the user
        if not company.filter(account=user).exists():
            return Response({'error': 'The company is not associated with the user.'}, status=status.HTTP_403_FORBIDDEN)

        #delete companies
        company.delete()

        return Response({'status': 'ok'}, status=status.HTTP_200_OK)
    
class continueCompaniesAPI(APIView):
    def post(self, request):
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=400)

        try:
            user = tokenModel.objects.get(token=token).account
        except tokenModel.DoesNotExist:
            return Response({'error': 'Invalid token.'}, status=404)

        #get wallet of user
        wallet = walletModel.objects.filter(account=user.id).first()
        #check if balance is <= 0 then return status: "no money"
        if wallet.balance <= 0:
            return Response({'status': 'no money'})

        #get companies ids array
        company_id = request.data.get('companies_ids', [])
        company_id = json.loads(company_id)
        

        companies = ad_companyModel.objects.filter(account=user, id__in=company_id)
        
        #if all companies are not associated with the user
        if not companies.exists():
            return Response({'error': 'The company is not associated with the user.'}, status=403)
        
        for company in companies:
            if company.status_text == "Остановлена":
                company.status_text = "Активная"
                company.save()
        
        return Response({'status': 'ok'})

class pauseCompaniesAPI(APIView):
    def post(self, request):
        token = request.data.get('token', '')
        if not token:
            return Response({'error': 'token is required.'}, status=400)

        try:
            user = tokenModel.objects.get(token=token).account
        except tokenModel.DoesNotExist:
            return Response({'error': 'Invalid token.'}, status=404)

        #get companies ids array
        company_id = request.data.get('companies_ids', [])
        company_id = json.loads(company_id)

        companies = ad_companyModel.objects.filter(account=user, id__in=company_id)
        
        #if all companies are not associated with the user
        if not companies.exists():
            return Response({'error': 'The company is not associated with the user.'}, status=403)
        
        for company in companies:
            if company.status_text == "Активная":
                company.status_text = "Остановлена"
                company.save()
                
        return Response({'status': 'ok'})
    
    
import datetime
import random
import json
from django.http import JsonResponse
from django.views import View
from django.db.models import Avg, Sum
from django.db.models.functions import TruncHour, TruncDay, TruncMonth, TruncYear
from collections import defaultdict
from django.utils.timezone import make_aware
from datetime import timedelta
from datetime import datetime as dt

# Set DEBUG and TEST mode
    
class CompanyStatisticsAPI(APIView):
    DEBUG = True
    TEST = False
    def post(self, request, *args, **kwargs):
        # Extract and validate input data
        try:
            companies_ids = request.POST.get('companies_ids')  # Should be a list of company ids
            token = request.POST.get('token')  # User token
            step = request.POST.get('step')  # Step: hour/day/month/year
            if not all([companies_ids, token, step]):
                raise ValueError("Missing required fields: companies_ids, token, or step.")

            companies_ids = json.loads(companies_ids)
            
            if not token:
                return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                user = tokenModel.objects.get(token=token).account
            except tokenModel.DoesNotExist:
                return Response({'error': 'Invalid token.'}, status=status.HTTP_404_NOT_FOUND)
            
            print("---------------------------------------------\n")
            print(f"User: {user}, Companies: {companies_ids}, Step: {step}")
            print("---------------------------------------------\n")
            # Debug logging
            if self.DEBUG:
                print(f"User: {user}, Companies: {companies_ids}, Step: {step}")
            
            # Validate step
            if step not in ['hour', 'day', 'month', 'year']:
                raise ValueError("Invalid step. Choose from 'hour', 'day', 'month', 'year'.")

            # Generate or fetch data
            if self.TEST:
                # Generate mock data
                data = self.generate_mock_data(companies_ids, step)
            else:
                # Fetch actual data from DB
                data = self.fetch_data_from_db(companies_ids, step, user)

            return JsonResponse(data, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)




    def fetch_data_from_db(self, companies_ids, step, user):
        # Fetch related site IDs through ad_companyModel
        related_sites = ad_companyModel.objects.filter(
            id__in=companies_ids, 
            account=user
        ).values_list('site', flat=True)

        # Fetch the jumpToADPage instances for those sites
        jump_pages = jumpToADPage.objects.filter(site__id__in=related_sites).values_list('masked_url', flat=True)

        # Fetch statistics for those masked_urls
        stats = statisticModel.objects.filter(
            masked_url__in=jump_pages
        )
        company_budgets = ad_companyModel.objects.filter(
            id__in=companies_ids, 
            account=user
        ).values_list('id', 'budget_week', 'price_target')

        # Process the data in Python
        truncated_stats = defaultdict(lambda: {'total_clicks': 0, 'total_cpc': 0, 'total_consumption': 0, 'click_times': []})  # A default dictionary to store aggregated data

        # Aggregate clicks
        for stat in stats:
            for click_time in stat.clicks:  # Assuming clicks is a list of datetime strings
                # Truncate click_time based on step
                if step == 'hour':
                    truncated_date = make_aware(dt(click_time.year, click_time.month, click_time.day, click_time.hour))
                elif step == 'day':
                    truncated_date = make_aware(dt(click_time.year, click_time.month, click_time.day))
                elif step == 'month':
                    truncated_date = make_aware(dt(click_time.year, click_time.month, 1))
                elif step == 'year':
                    truncated_date = make_aware(dt(click_time.year, 1, 1))

                truncated_stats[truncated_date]['total_clicks'] += 1
                truncated_stats[truncated_date]['click_times'].append(click_time)

        # Calculate CPC based on the aggregated data
        for company_id, budget_week, price_target in company_budgets:
            for truncated_date, data in truncated_stats.items():
                click_count = data['total_clicks']
                # Calculate CPC based on your provided logic
                if (click_count * price_target) <= budget_week:
                    cpc = price_target
                else:
                    cpc = budget_week / click_count if click_count > 0 else 0

                data['total_cpc'] = cpc
                data['total_consumption'] += cpc * click_count  # Update consumption based on CPC and click count

        # Prepare response data
        response_data = []
        for truncated_date, data in truncated_stats.items():
            response_data.append({
                'truncated_date': truncated_date,
                'total_clicks': data['total_clicks'],
                'avg_cpc': data['total_cpc'],
                'total_consumption': data['total_consumption'],
                # ... include other fields you need
            })

        # Sort the response data by truncated_date
        response_data.sort(key=lambda x: x['truncated_date'])

        # Prepare data labels
        datalabels = [data['truncated_date'].strftime("%d %B") if step in ['day', 'month', 'year'] else data['truncated_date'].strftime("%H:%M") for data in response_data]

        # Prepare final response
        response = {
            'click_sum': sum(data['total_clicks'] for data in response_data),
            'cpc_sum': sum(data['avg_cpc'] for data in response_data) / len(response_data) if response_data else 0,
            'consumption': sum(data['total_consumption'] for data in response_data),
            'datalabels': datalabels,
            'statistics': response_data
        }
        return response

    def generate_mock_data(self, companies_ids, step):
        # Generate mock data
        mock_data = []
        start_date = datetime.datetime.now() - datetime.timedelta(days=365)
        end_date = datetime.datetime.now()

        # Generate mock data for each day/hour/month/year
        while start_date <= end_date:
            for company_id in companies_ids:
                data_point = {
                    'company_id': company_id,
                    'datetime': start_date.strftime("%d %B %Y %H:%M") if step == 'hour' else start_date.strftime("%d %B %Y"),
                    'clicks': random.randint(100, 500),
                    'cpc': random.uniform(0.1, 2.0),
                    'consumption': random.randint(1000, 5000)
                }
                mock_data.append(data_point)

            # Increment date
            if step == 'hour':
                start_date += datetime.timedelta(hours=1)
            elif step == 'day':
                start_date += datetime.timedelta(days=1)
            elif step == 'month':
                start_date += datetime.timedelta(days=30)
            elif step == 'year':
                start_date += datetime.timedelta(days=365)

        return mock_data

class BloggerStatisticsAPI(APIView):
    DEBUG = True  # Set to False in production
    TEST = False

    def post(self, request, *args, **kwargs):
        try:
            masked_url = request.POST.get('masked_url')  # Should be the masked URL of the company
            token = request.POST.get('token')  # User token
            step = request.POST.get('step')  # Step: hour/day/month/year

            if not all([masked_url, token, step]):
                raise ValueError("Missing required fields: masked_url, token, or step.")

            if not token:
                return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                user = tokenModel.objects.get(token=token).account
            except tokenModel.DoesNotExist:
                return Response({'error': 'Invalid token.'}, status=status.HTTP_404_NOT_FOUND)

            if self.DEBUG:
                print(f"User: {user}, Masked URL: {masked_url}, Step: {step}")

            # Validate step
            if step not in ['hour', 'day', 'month', 'year']:
                raise ValueError("Invalid step. Choose from 'hour', 'day', 'month', 'year'.")

            # Generate or fetch data
            if self.TEST:
                # Generate mock data
                data = self.generate_mock_data(masked_url, step)
            else:
                # Fetch actual data from DB
                data = self.fetch_data_from_db(masked_url, step, user)

            return JsonResponse(data, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    def fetch_data_from_db(self, masked_url, step, user):
        # Fetch the jumpToADPage instance for the masked_url
        try:
            jump_page = jumpToADPage.objects.get(masked_url=masked_url)
        except jumpToADPage.DoesNotExist:
            return JsonResponse({'error': 'Invalid masked_url.'}, status=404)

        # Fetch the related company and its budget and price_target
        try:
            company = ad_companyModel.objects.get(site=jump_page.site, account=user)
        except ad_companyModel.DoesNotExist:
            return JsonResponse({'error': 'No company associated with the given masked_url and user.'}, status=404)

        # Fetch statistics for the masked_url
        stats = statisticModel.objects.filter(masked_url=masked_url)

        # Process the data in Python
        truncated_stats = defaultdict(lambda: {'total_clicks': 0, 'total_cpc': 0, 'total_consumption': 0, 'click_times': []})

        # Aggregate clicks
        for stat in stats:
            for click_time in stat.clicks:  # Assuming clicks is a list of datetime strings
                truncated_date = self.truncate_date(click_time, step)
                data = truncated_stats[truncated_date]
                data['total_clicks'] += 1
                data['click_times'].append(click_time)
                
        # Calculate CPC based on the aggregated data
        budget_week = company.budget_week
        price_target = company.price_target
        for truncated_date, data in truncated_stats.items():
            click_count = data['total_clicks']
            if click_count * price_target <= budget_week:
                cpc = price_target
            else:
                cpc = budget_week / click_count if click_count > 0 else 0

            data['total_cpc'] = cpc
            data['total_consumption'] = cpc * click_count

        # Prepare response data
        response_data = []
        for truncated_date, data in truncated_stats.items():
            response_data.append({
                'truncated_date': truncated_date.isoformat(),
                'total_clicks': data['total_clicks'],
                'avg_cpc': data['total_cpc'],
                'total_consumption': data['total_consumption']
            })

        # Sort the response data by truncated_date
        response_data.sort(key=lambda x: x['truncated_date'])

        # Prepare final response
        response = {
            'click_sum': sum(data['total_clicks'] for data in response_data),
            'cpc_sum': sum(data['avg_cpc'] for data in response_data) / len(response_data) if response_data else 0,
            'consumption': sum(data['total_consumption'] for data in response_data),
            'datalabels': [data['truncated_date'] for data in response_data],
            'statistics': response_data
        }
        return response
    
    def truncate_date(self, click_time, step):
        if step == 'hour':
            return make_aware(dt(click_time.year, click_time.month, click_time.day, click_time.hour))
        elif step == 'day':
            return make_aware(dt(click_time.year, click_time.month, click_time.day))
        elif step == 'month':
            return make_aware(dt(click_time.year, click_time.month, 1))
        elif step == 'year':
            return make_aware(dt(click_time.year, 1, 1))
        else:
            raise ValueError(f"Invalid step: {step}")

    def generate_mock_data(self, mask_link, step):
        # Generate mock data
        mock_data = []
        start_date = dt.now() - timedelta(days=365)
        end_date = dt.now()

        # Generate mock data for each day/hour/month/year
        while start_date <= end_date:
            data_point = {
                'mask_link': mask_link,
                'datetime': start_date.strftime("%Y-%m-%d %H:%M") if step == 'hour' else start_date.strftime("%Y-%m-%d"),
                'clicks': random.randint(100, 500),
                'cpc': random.uniform(0.1, 2.0),
                'consumption': random.randint(1000, 5000)
            }
            mock_data.append(data_point)

            # Increment date
            if step == 'hour':
                start_date += timedelta(hours=1)
            elif step == 'day':
                start_date += timedelta(days=1)
            elif step == 'month':
                start_date += timedelta(days=30)
            elif step == 'year':
                start_date += timedelta(days=365)

        return mock_data

from yookassa import Payout
from yookassa.domain.models.currency import Currency
from yookassa import SbpBanks
import var_dump as var_dump
Configuration.account_id = "505371" #<Идентификатор магазина>
Configuration.secret_key = "test_*gF9ZX8OmDGvEo10Y76UlTzP5-N12S_GRFu5HK4M4APDs" #<Секретный ключ>

class PayoutToBloggerAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            token = request.data.get('token')
            cardnumber = request.data.get('cardnumber')
            amount = int(request.data.get('amount')) 
            #sbp_bank_list = SbpBanks.list()
            #print(sbp_bank_list)
            
            if not token:
                return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

            if not cardnumber:
                return Response({'error': 'cardnumber is required.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                user = tokenModel.objects.get(token=token).account
            except tokenModel.DoesNotExist:
                return Response({'error': 'Invalid token.'}, status=status.HTTP_404_NOT_FOUND)
        
            #get user wallet
            wallet = walletModel.objects.filter(account=user).first()
            
            if not wallet:
                return Response({'error': 'Wallet not found.'}, status=status.HTTP_404_NOT_FOUND)
            
            if wallet.balance <= 0:
                return Response({'error': 'Insufficient balance.'}, status=status.HTTP_400_BAD_REQUEST)

            if amount > wallet.balance:
                return Response({'error': 'Amount exceeds balance.'}, status=status.HTTP_400_BAD_REQUEST)

            res = Payout.create({
                'amount': {
                    'value': f"{amount - (amount * 0.2)}",
                    'currency': Currency.RUB,
                },
                'payout_destination_data': {
                    "type": "bank_card",
                    "card": {
                        "number": cardnumber
                    }
                },
                'description': 'Выплата блогеру c комиссией 20%',

                "test": "test"
            })
            
            #serialize res

            #create wallet operation
            walletOperationsModel.objects.create(
                wallet=wallet,
                balance=wallet.balance,
                operationType='-',
                operation="Выплата блогеру",
            ).save()
            
            wallet.balance -= amount 
            wallet.save()
            
            return Response({'response': res}, status=status.HTTP_200_OK)

        
        except Exception as e:
            print(e)
            return Response({'error': 'Something went wrong.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GeneralSettingsAPI(APIView):
    def post(self,request):
        tin = request.data.get('tin')
        formOrganization = request.data.get('formOrganization')
        token = request.data.get('token')  # User token

        if not tin or not formOrganization: 
            return Response({'error': 'tin ro formOrganization is not found.'}, status=status.HTTP_400_BAD_REQUEST)

        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = tokenModel.objects.get(token=token).account
        except tokenModel.DoesNotExist:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_404_NOT_FOUND)

        user.tin = tin
        user.formOrganization = formOrganization
        user.save()

        return Response({'200': 'ok.'}, status=status.HTTP_200_OK) 
    
class RateAPIView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'rate': RateModel.objects.all()}, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        token = request.data.get('token') # string
        comment = request.data.get('comment') # string
        rate = int(request.data.get('rate')) # int by 0 to 5
        site = request.data.get('site') # int
        
        if not token:
            return Response({'error': 'token is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not comment:
            return Response({'error': 'comment is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not rate:
            return Response({'error': 'rate is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not site:
            return Response({'error': 'site is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = tokenModel.objects.get(token=token).account
        except tokenModel.DoesNotExist:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_404_NOT_FOUND)
        
        c = RateModel.objects.create(account=user, comment=comment, rate=rate, site=site).save()
        
        return Response({'rate': c}, status=status.HTTP_200_OK)