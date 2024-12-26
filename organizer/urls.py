from django.urls import path
from . import views

urlpatterns = [
    path('modalidades/', views.view_modalitypage, name="modality_list"),
    path('equipes/', views.view_teams_page, name="teams_list"),
    path('equipes/registrar-equipe', views.view_register_team, name="register-team"),
    path('equipes/editar-equipe', views.view_edit_team, name="edit-team"),
    path('competicoes/', views.view_competitions_page, name="competitions_list"),
    path('competicoes/detail', views.view_detail_comp_page, name="detail"), # deatail vai ser subituido pelo id/nome da competição
    path('solicitacoes/', views.view_requests, name="requests_list"),
]