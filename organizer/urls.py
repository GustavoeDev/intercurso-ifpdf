from django.urls import path
from . import views

urlpatterns = [
    path('modalidades/', views.view_modalitypage, name="view_modalitypage"),
]