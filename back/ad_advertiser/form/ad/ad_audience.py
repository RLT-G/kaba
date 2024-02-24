from django import forms


class Create_audienceForm(forms.Form):
    name = forms.CharField(max_length=255, label='Название', widget=forms.TextInput(attrs={'id': 'name'}))
    url = forms.URLField(max_length=255, label='Ссылка', widget=forms.URLInput(attrs={'id': 'url'}))
    geography = forms.JSONField(label='География показов')
    category = forms.JSONField(label='Категории')
    interest = forms.JSONField(label='Интересы')
    gender_age = forms.JSONField(label='Пол и возраст')
    device = forms.JSONField(label='Устройства')
    solvency = forms.CharField(label='Платежеспособность', widget=forms.TextInput(attrs={'id': 'solvency'}))
    
    def clean_solvency(self):
        solvency = self.cleaned_data.get('solvency')
        solvency_copy = str(solvency).replace(" ", "")
        for i in range(len(solvency_copy) - 1):
            if solvency_copy[i] == ',' and solvency_copy[i + 1] == ',':
                raise forms.ValidationError("Неверный формат")
        for el in str(solvency).replace(" ", "").split():
            if not el in ['top1', 'top2_5', 'top6_10', 'top11_40']:
                raise forms.ValidationError("Некорректные данные")
        return solvency