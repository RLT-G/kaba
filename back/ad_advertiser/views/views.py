from django.shortcuts import render, redirect

from ad_advertiser.forms.ad_companyForm import ad_company_baseForm


def index(request):
    return render(request, 'ad_index.html')


# Вывод представления для страницы по добавления записи в ad_company
def create(request):
    if request.method == 'POST':
        form = ad_company_baseForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = ad_company_baseForm()
    data = {
        'form': form,
    }
    return render(request, 'ad_create.html', data)
