from django.urls import path
from . import views

urlpatterns = [
    path('modalidades/', views.view_modalitypage, name="view_modalitypage"),
    path('equipes/', views.view_teams_page, name="view_teams_page"),
    path('equipes/registrar-equipe', views.view_register_team, name="register-team"),

] 