from django.shortcuts import render
from django.http import HttpResponse

def view_homepage(request):
    return render(request, 'home.html')

def view_manage_teams(request):
    return render(request, 'manage_teams.html')

def view_register_team(request):
    return render(request, 'register_team.html')

def view_login_page(request):
    return render(request, 'login_page.html')