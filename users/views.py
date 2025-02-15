from django.contrib.auth.views import LoginView
from django.views.generic import CreateView
from django.urls import reverse_lazy
from .forms import CustomUserCreationForm
from .models import CustomUser
from django.shortcuts import render

class LoginView(LoginView):
   template_name = 'login_page.html'
   redirect_authenticated_user = True

class RegistrationView(CreateView):
   model = CustomUser
   form_class = CustomUserCreationForm
   template_name = 'register_page.html'
   success_url = reverse_lazy('login') 