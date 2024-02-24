import requests
import json
from random import choice
from pprint import pprint

def call_userDef(recipient: str):
    """
        Данная функция совершает звонок человеку по номеру recipient
        Звонок осуществляется с помощью api sigmasms
        recipient должен быть в формате '+79240123664'

        Номер телефона с которого поступит звнок на recipient выберается случайно из списка senders,
        расположенного внутри области видимости функции call_userDef

        Функция call_userDef возвращаает статус код, ответ sigmasms, и последние 4 цифры номера
        телефона с которого поступит звнок на recipient

        Номера телефонов senders должны пройти модерацию на sigmasms в личном кабинете
    """
    senders = ['74956665611']
    call_data = {
        'url': 'https://online.sigmasms.ru/api/sendings',
        'headers': {
            "Content-Type": "application/json",
            "Authorization": "f6245603658400acb70ba423784b02ee29370320bee75678e620b4c89b0c5d84"
        },
        'payload': {
            "recipient": recipient,
            "type": "voice",
            "payload": {
                "sender": choice(senders),
                "text": "Это тестовое сообщение.\nИзменённый текст будет отправлен на модерацию.",
                "tts": "aws:tatyana"
            }
        }
    }
    response = requests.post(call_data['url'], json=call_data['payload'], headers=call_data['headers'])
    return response.status_code, response.text, call_data['payload']['payload']['sender'][-1:-5:-1][::-1]


def send_smsDef(recipient: str, verify_code: str) -> dict:
    """
        Функция для отправки sms
        recipient - номер полуателя в формате +79280123557
        verify_code - текст сообщения

        Возвращает ответ от plusofon.ru
        Документация - https://help.plusofon.ru/api/v1/sms
    """
    print(recipient, verify_code)
    url = 'https://restapi.plusofon.ru/api/v1/sms'
    token = '8FVrZqScTpySOlRIPpSFC2smVZj3jJTmBUXo'
    payload = {
        "text": f"Ваш код верификации: {verify_code}",
        "number_id": 23758,
        "to": recipient,
        "dlr_level": 3,
        "reject_long": False,
        "count_pdu": False
    }
    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Client': '10553',
      'Authorization': f'Bearer {token}'
    }
    response = requests.request('POST', url, headers=headers, json=payload)
    print(response.json())
    return response.json()

def get_numbers_dataDef():
    """
        Функция для получения данных о активных номерах plusofon.ru
        Документация - https://help.plusofon.ru/api/v1/number#get_number
    """
    url = 'https://restapi.plusofon.ru/api/v1/number'
    token = '8FVrZqScTpySOlRIPpSFC2smVZj3jJTmBUXo'
    payload = {
        "phone_type": "def"
    }
    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Client': '10553',
      'Authorization': f'Bearer {token}'
    }
    response = requests.request('GET', url, headers=headers, json=payload)
    response.json()
    pprint(response.json())