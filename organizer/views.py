from django.shortcuts import render

def view_modalitypage(request):
    return render(request, 'modality_page.html')

def view_teams_page(request):
    return render(request, 'teams_page.html')

def view_register_team(request):
    return render(request, 'register_team_page.html')
