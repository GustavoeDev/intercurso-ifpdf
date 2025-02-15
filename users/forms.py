from django import forms
from .models import *

class CustomUserCreationForm(forms.ModelForm):
   password = forms.CharField(widget=forms.PasswordInput)

   class Meta:
        model = CustomUser
        fields = ['registration', 'name', 'email', 'password', 'course']