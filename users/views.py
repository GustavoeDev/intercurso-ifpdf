from django.contrib.auth.views import LoginView
from django.views.generic import CreateView
from django.urls import reverse_lazy
from django.contrib.auth import login
from .forms import CustomUserCreationForm, LoginForm
from .models import CustomUser
from django.shortcuts import render

from django.contrib.auth import logout
from django.shortcuts import redirect

class CustomLoginView(LoginView):
    template_name = 'login_page.html' 
    redirect_authenticated_user = True
    authentication_form = LoginForm
    
    def get_success_url(self):
        if self.request.user.groups.filter(name='Organizer').exists():
            return '/organizador/modalidades/' 
        return '/' 

def LogoutView(request):
   logout(request)
   return redirect('homepage') 

class RegistrationView(CreateView):
   model = CustomUser
   form_class = CustomUserCreationForm
   template_name = 'register_page.html'
   success_url = reverse_lazy('login') 