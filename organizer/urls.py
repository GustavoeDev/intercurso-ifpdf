from django.urls import path
from . import views

urlpatterns = [
    path('modalidades/', views.view_modalitypage, name="view_modalitypage"),
    path('equipes/', views.view_teams_page, name="view_teams_page"),
    path('equipes/registrar-equipe', views.view_register_team, name="register-team"),
    path('equipes/editar-equipe', views.view_edit_team, name="edit-team"),
    path('competicoes/', views.view_competitions_page, name="view_competitions_page"),
    path('solicitacoes/', views.view_requests, name="view_requests"),
]