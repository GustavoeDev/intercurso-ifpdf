from django.shortcuts import render
from django.http import HttpResponse

def view_homepage(request):
    return render(request, 'home.html')
