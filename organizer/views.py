from django.shortcuts import render

def view_modalitypage(request):
    return render(request, 'modality_page.html')
