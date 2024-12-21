from django.shortcuts import render

def view_modalitypage(request):
    return render(request, 'modality_page.html')

def view_teams_page(request):
    return render(request, 'teams_page.html')

def view_register_team(request):
    return render(request, 'register_team_page.html')

def view_edit_team(request):
    return render(request, 'edit_team_page.html')

def view_competitions_page(request):
    return render(request, 'competitions_page.html')

def view_detail_comp_page(request):
    return render(request, 'detail_competition_page.html')

def view_requests(request):
    return render(request, 'requests_page.html')
