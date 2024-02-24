from django import forms
# Импорт модели пользователей для валидации
from account.models.account import *


# Форма регестрации пользователей
class RegistrationForm(forms.Form):
    name = forms.CharField(max_length=100, label='Имя', widget=forms.TextInput(attrs={'id': 'name'}))
    login = forms.CharField(max_length=30, label='Логин', widget=forms.TextInput(attrs={'id': 'login'}))
    phone_number = forms.CharField(max_length=20, label='Номер телефона', widget=forms.TextInput(attrs={'id': 'phone_number'}))
    confirmation_code = forms.CharField(max_length=4, label='Код подтверждения', widget=forms.TextInput(attrs={'id': 'confirmation_code'}))
    terms_of_use = forms.BooleanField(label='Пользовательское соглашение', required=False)
    agreement = forms.BooleanField(label='Договор', required=False)

    # def clean_name(self):
    #     name = self.cleaned_data.get('name')

    # Валидация логина
    def clean_login(self):
        login = self.cleaned_data.get('login')
        # Есть ли в бд такой логин?
        if not accountModel.objects.filter(login=login).exists():
            return login
        raise forms.ValidationError("Логин занят, замените пожалуйста")

    # Валидация номера телефона
    def clean_phone_number(self):
        phone_number = self.cleaned_data.get('phone_number')
        # В начале +, состоит из чисел, длина в пределах [10; 25]
        if phone_number[0] == "+":
            if phone_number[1::].isdigit():
                if 25 >= len(phone_number) >= 10:
                    return phone_number
        raise forms.ValidationError("Неподдерживаемый формат номера телефона")

    # def clean_confirmation_code(self):
    #     confirmation_code = self.cleaned_data.get('confirmation_code')

    # Валидация пользовательского соглашения
    def clean_terms_of_use(self):
        terms_of_use = self.cleaned_data.get('terms_of_use')
        if terms_of_use is False:
            raise forms.ValidationError("Вы должны принять условия пользовательского соглашения")
        return terms_of_use

    # Валидация условия договора
    def clean_agreement(self):
        agreement = self.cleaned_data.get('agreement')
        if agreement is False:
            raise forms.ValidationError("Вы должны принять условия договора")
        return agreement
