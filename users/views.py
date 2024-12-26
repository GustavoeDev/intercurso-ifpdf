from django.shortcuts import render

def view_login_page(request):
    return render(request, 'login_page.html')
