from django import forms
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError


class Create_companyForm(forms.Form):
    name = forms.CharField(max_length=255, label='Название', widget=forms.TextInput(attrs={'id': 'name'}))
    url = forms.URLField(max_length=255, label='Ссылка', widget=forms.URLInput(attrs={'id': 'url'}))
    date_start = forms.DateField(label='Начало компании', widget=forms.TimeInput(attrs={'id': 'date1'}))
    date_finish = forms.DateField(label='Окончание компании', widget=forms.TimeInput(attrs={'id': 'date2'}))
    # Не забудь цели добавить дурень
    budget_week = forms.IntegerField(label='Недельный бюджет', widget=forms.NumberInput(attrs={'id': 'budget_week'}))
    phrase_plus = forms.CharField(label='Ключевые фразы', widget=forms.TextInput(attrs={'id': 'phrase_plus'}))
    phrase_minus = forms.CharField(label='Минус фразы', widget=forms.TextInput(attrs={'id': 'phrase_minus'}))
    channel_taboo = forms.CharField(label='Запрет показов', widget=forms.TextInput(attrs={'id': 'channel_taboo'}))

    def clean_date_start(self):
        date_start = self.cleaned_data.get('date_start')
        if date_start.year < 100:
            raise forms.ValidationError("Год должен быть в формате YY")
        return date_start
    
    def clean_date_finish(self):
        date_finish = self.cleaned_data.get('date_finish')
        if date_finish.year < 100:
            raise forms.ValidationError("Год должен быть в формате YY")
        return date_finish
        
    def clean_budget_week(self):
        budget_week = self.cleaned_data.get('budget_week')
        if int(budget_week) < 0:
            raise forms.ValidationError("Бюджет не может быть отрицательным")
        if str(budget_week).isdigit() is False:
            raise forms.ValidationError("Бюджет должен быть числом")
        return budget_week
    
    def clean_phrase_plus(self):
        phrase_plus = self.cleaned_data.get('phrase_plus')
        phrase_plus_copy = str(phrase_plus).replace(" ", "")
        for i in range(len(phrase_plus_copy) - 1):
            if phrase_plus_copy[i] == ',' and phrase_plus_copy[i + 1] == ',':
                raise forms.ValidationError("Неверный формат")
        return phrase_plus
    
    def clean_phrase_minus(self):
        phrase_minus = self.cleaned_data.get('phrase_minus')
        phrase_minus_copy = str(phrase_minus).replace(" ", "")
        for i in range(len(phrase_minus_copy) - 1):
            if phrase_minus_copy[i] == ',' and phrase_minus_copy[i + 1] == ',':
                raise forms.ValidationError("Неверный формат")
        return phrase_minus

    def clean_channel_taboo(self):
        channel_taboo = self.cleaned_data.get('channel_taboo')
        channel_taboo_copy = str(channel_taboo).replace(" ", "")
        for i in range(len(channel_taboo_copy) - 1):
            if channel_taboo_copy[i] == ',' and channel_taboo_copy[i + 1] == ',':
                raise forms.ValidationError("Неверный формат")
        url_validator = URLValidator()
        for el in str(channel_taboo).replace(" ", "").split(','):
            try:
                url_validator(el)
            except ValidationError as ex:
                raise forms.ValidationError(ex)
        return channel_taboo