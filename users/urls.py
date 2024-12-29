from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.view_login_page, name="login"),
    path('cadastro/', views.view_register_page, name="register"),
]


