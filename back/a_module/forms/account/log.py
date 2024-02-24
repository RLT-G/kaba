from django import forms
# Импорт модели пользователей для валидации
from account.models.account import *


# Форма для входа (Логин или пароль)
class Authentication_part1Form(forms.Form):
    login_or_phone_number = forms.CharField(
        max_length=30,
        label='Логин или номер телефона',
        widget=forms.TextInput(attrs={'id': 'login_or_phone_number'})
    )

    # Валидация логина или пароля
    def clean_login_or_phone_number(self):
        login_or_phone_number = self.cleaned_data.get('login_or_phone_number')
        # Есть ли в бд такой логин или номер телефона?
        if accountModel.objects.filter(login=login_or_phone_number).exists():
            return login_or_phone_number
        elif accountModel.objects.filter(phone_number=login_or_phone_number).exists():
            return login_or_phone_number
        raise forms.ValidationError("Неверный логин или номер телефона")


# Форма для входа (Подтверждение номера)
class Authentication_part2Form(forms.Form):
    confirmation_code = forms.CharField(
        max_length=4,
        label='Код подтверждения',
        widget=forms.TextInput(attrs={'id': 'confirmation_code'})
    )
