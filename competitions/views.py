from django.shortcuts import render

# Aluno

def view_homepage(request):
    return render(request, 'home.html')

def view_manage_teams(request):
    return render(request, 'manage_teams.html')

def view_add_team(request):
    return render(request, 'register_team.html')

def view_league_page(request):
    return render(request, 'league_page.html')

def view_group_stage_page(request):
    return render(request, 'group_stage_page.html')

def view_qualifiers_stage_page(request):
    return render(request, 'qualifiers_stage_page.html')

# Organizador

def view_modality_page(request):
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
