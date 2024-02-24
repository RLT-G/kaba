# Импорирую функцию для api запроса sigmasms
from a_module.scripts.sigmasms_voice_api import *
# Штучки для обработки ответа ajax
from django.http import JsonResponse, HttpResponseBadRequest


# По запросу ajax делает api запрос sigmasms
def make_api_callDef(request):
    # Проверка на метод и то что запрос сделал именно ajax
    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'GET':
        # Получение параметров из URL
        phone_number = f"+{request.GET.get('param1')}"
        # Формируем ответ на клиентскую часть ajax
        if phone_number[0] == "+" and phone_number[1::].isdigit() and 25 >= len(phone_number) >= 10:
            answer = list(call_userDef(phone_number))
        else:
            answer = "Неподдерживаемый формат номера телефона"
        # Возвращение JSON-ответа
        response_data = {'result': answer, 'param': phone_number}
        print(answer)
        return JsonResponse(response_data)
    else:
        # Обработка других случаев (например, POST-запросы или ручные запросы)
        return HttpResponseBadRequest('Invalid request')

