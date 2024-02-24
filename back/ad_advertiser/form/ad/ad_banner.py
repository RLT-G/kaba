from django import forms
# from multiupload.fields import MultiImageField, MultiFileField


class Create_bannerForm(forms.Form):
    name = forms.CharField(max_length=255, label='Название', widget=forms.TextInput(attrs={'id': 'name'}))
    url = forms.URLField(max_length=255, label='Ссылка на рекламируемую страницу', widget=forms.URLInput(attrs={'id': 'url'}))
    title_option = forms.CharField(label='Варианты заголовка', required=False, widget=forms.TextInput(attrs={'id': 'title_option'}))
    description_option = forms.CharField(label='Варианты описаний', required=False, widget=forms.TextInput(attrs={'id': 'description_option'}))
    
    video_option1 = forms.FileField(label="Видео1", required=False, widget=forms.FileInput(attrs={'id': 'video_option1'}))
    video_option2 = forms.FileField(label="Видео2", required=False, widget=forms.FileInput(attrs={'id': 'video_option2'}))
    video_option3 = forms.FileField(label="Видео3", required=False, widget=forms.FileInput(attrs={'id': 'video_option3'}))
    video_option4 = forms.FileField(label="Видео4", required=False, widget=forms.FileInput(attrs={'id': 'video_option4'}))
    video_option5 = forms.FileField(label="Видео5", required=False, widget=forms.FileInput(attrs={'id': 'video_option5'}))

    image_options1 = forms.FileField(label="Изображение1", required=False, widget=forms.FileInput(attrs={'id': 'image_options1'}))
    image_options2 = forms.FileField(label="Изображение2", required=False, widget=forms.FileInput(attrs={'id': 'image_options2'}))
    image_options3 = forms.FileField(label="Изображение3", required=False, widget=forms.FileInput(attrs={'id': 'image_options3'}))
    image_options4 = forms.FileField(label="Изображение4", required=False, widget=forms.FileInput(attrs={'id': 'image_options4'}))
    image_options5 = forms.FileField(label="Изображение5", required=False, widget=forms.FileInput(attrs={'id': 'image_options5'}))

    audio_option1 = forms.FileField(label="Аудио1", required=False, widget=forms.FileInput(attrs={'id': 'audio_option1'}))
    audio_option2 = forms.FileField(label="Аудио2", required=False, widget=forms.FileInput(attrs={'id': 'audio_option2'}))
    audio_option3 = forms.FileField(label="Аудио3", required=False, widget=forms.FileInput(attrs={'id': 'audio_option3'}))
    audio_option4 = forms.FileField(label="Аудио4", required=False, widget=forms.FileInput(attrs={'id': 'audio_option4'}))
    audio_option5 = forms.FileField(label="Аудио5", required=False, widget=forms.FileInput(attrs={'id': 'audio_option5'}))

    toggle_field = forms.BooleanField(label='Показ на непроверенных аккаунтах', required=False, widget=forms.CheckboxInput(attrs={'id': 'toggle_field'}))

    def clean_title_option(self):
        title_option = self.cleaned_data.get('title_option')
        title_option_copy = str(title_option).replace(" ", "")
        for i in range(len(title_option_copy) - 1):
            if title_option_copy[i] == ',' and title_option_copy[i + 1] == ',':
                raise forms.ValidationError("Неверный формат")
        return title_option
    
    def clean_description_option(self):
        description_option = self.cleaned_data.get('description_option')
        description_option_copy = str(description_option).replace(" ", "")
        for i in range(len(description_option_copy) - 1):
            if description_option_copy[i] == ',' and description_option_copy[i + 1] == ',':
                raise forms.ValidationError("Неверный формат")
        return description_option
    
    # def clean_video_option(self):
    #     video_files = self.cleaned_data.get('video_option', [])
    #     for video_file in video_files:
    #         if not video_file.name.lower().endswith(('.mp4', '.avi', '.mkv', '.mov')):
    #             raise forms.ValidationError('Файл {} не является видеофайлом.'.format(video_file.name))
    #     return video_files