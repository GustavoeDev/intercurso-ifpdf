from django.urls import path
from . import views

urlpatterns = [
    # Aluno
    path('', views.view_homepage, name="homepage"),
    path('gerenciar-equipes/', views.view_manage_teams, name="manage_teams"),
    path('registrar-equipe/', views.view_add_team, name="register_team_student"),
    path('competicao/basquete/', views.view_league_page, name="league"), #basquete vai ser substituido pelo id/nome da competição
    path('competicao/futsal-masculino/', views.view_group_stage_page, name="group"), #futsal-masculino vai ser substituido pelo id/nome da competição
    path('competicao/volei-indoor/', views.view_qualifiers_stage_page, name="qualifiers"), #volei-indoor vai ser substituido pelo id/nome da competição
    # Organizador
    path('organizador/modalidades/', views.view_modality_page, name="modality_list"),
    path('organizador/equipes/', views.view_teams_page, name="teams_list"),
    path('organizador/equipes/registrar-equipe/', views.view_register_team, name="register_team"),
    path('organizador/equipes/editar-equipe/', views.view_edit_team, name="edit_team"),
    path('organizador/competicoes/', views.view_competitions_page, name="competitions_list"),
    path('organizador/competicoes/detalhes/', views.view_detail_comp_page, name="detail"), # deatail vai ser subituido pelo id/nome da competição
    path('organizador/solicitacoes/', views.view_requests, name="requests_list"),
]