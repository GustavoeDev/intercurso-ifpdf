from django.shortcuts import render

def view_login_page(request):
    return render(request, 'login_page.html')

def view_register_page(request):
    return render (request, 'register_page.html')