from django.urls import path
from . import views

urlpatterns = [
    path('', views.view_homepage, name="view_homepage"),
    path('gerenciar-equipes', views.view_manage_teams, name="manage_teams"),
    path('registrar-equipe', views.view_register_team, name="register_team"),
    path('login', views.view_login_page, name="login_page"),
    path('competicao/basquete', views.view_league_page, name="league_page"),
    path('competicao/futsal-masculino', views.view_group_stage_page, name="group_stage_page"),
    path('competicao/volei-indoor', views.view_qualifiers_stage_page, name="qualifiers_stage_page")
]