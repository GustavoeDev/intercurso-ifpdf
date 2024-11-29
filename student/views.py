from django.shortcuts import render
from django.http import HttpResponse

def view_homepage(request):
    return render(request, 'home.html')

def view_manage_teams(request):
    return render(request, 'manage_teams.html')
