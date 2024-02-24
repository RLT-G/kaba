from django import forms
from ad_advertiser.models.profile.profile import *

# # Форма регестрации пользователей
class RegistrationForm(forms.ModelForm):
    class Meta:
        model = profileModel
        fields = ["data_legal_country", "data_legal_currency", "data_legal_form", "data_legal_id"]