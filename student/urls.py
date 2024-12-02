from django.urls import path
from . import views

urlpatterns = [
    path('', views.view_homepage, name="view_homepage"),
    path('gerenciar-equipes', views.view_manage_teams, name="manage_teams"),
    path('registrar-equipe', views.view_register_team, name="register_team"),
    path('login', views.view_login_page, name="login_page"),
]