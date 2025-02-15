from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate
from .models import *

class CustomUserCreationForm(forms.ModelForm):
    password = forms.CharField(
        widget=forms.PasswordInput,
        label="Senha"
    )
    
    class Meta:
        model = CustomUser
        fields = ['registration', 'name', 'email', 'password', 'course']
        labels = {
            'registration': 'Matrícula',
            'name': 'Nome Completo',
            'email': 'Endereço de E-mail',
            'course': 'Curso',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        self.fields['course'].choices = [
            ('', 'Selecione seu curso')
        ] + list(self.fields['course'].choices)[1:]
    
        self.fields['course'].widget.attrs['required'] = True
        self.fields['course'].widget.attrs['onchange'] = "this.options[0].disabled = true;"

        for field_name, field in self.fields.items(): 
            field.widget.attrs.update({
                'class': 'custom-input',
            })
            if isinstance(field, forms.ModelChoiceField):
                field.widget.attrs['placeholder'] = 'Selecione seu curso'
            elif field_name == 'registration': 
                field.widget.attrs['placeholder'] = 'Matrícula'
            elif field_name == 'name':
                field.widget.attrs['placeholder'] = 'Nome'
            elif field_name == 'email':
                field.widget.attrs['placeholder'] = 'E-mail'
            elif field_name == 'password':
                field.widget.attrs['placeholder'] = 'Senha'

    def clean_registration(self):
        """ Valida se a matrícula contém apenas números e tem um tamanho válido """
        registration = self.cleaned_data.get('registration')
        if not registration.isdigit():
            raise ValidationError("A matrícula deve conter apenas números.")
        if len(registration) < 5 or len(registration) > 15:
            raise ValidationError("A matrícula deve ter entre 5 e 15 dígitos.")
        return registration

    def clean_name(self):
        """ Valida se o nome contém apenas letras e espaços """
        name = self.cleaned_data.get('name')
        if not all(char.isalpha() or char.isspace() for char in name):
            raise ValidationError("O nome deve conter apenas letras e espaços.")
        return name

    def clean_email(self):
        """ Valida se o e-mail é único """
        email = self.cleaned_data.get('email')
        if CustomUser.objects.filter(email=email).exists():
            raise ValidationError("Este e-mail já está cadastrado.")
        return email

    def clean_password(self):
        """ Valida a senha (mínimo de 8 caracteres, letras e números) """
        password = self.cleaned_data.get('password')
        if len(password) < 8:
            raise ValidationError("A senha deve ter pelo menos 8 caracteres.")
        if password.isdigit() or password.isalpha():
            raise ValidationError("A senha deve conter pelo menos uma letra e um número.")
        return password

    def clean_course(self):
        """ Garante que o usuário selecione um curso válido """
        course = self.cleaned_data.get('course')
        if course == '':
            raise ValidationError("Por favor, selecione um curso válido.")
        return course

    def save(self, commit=True):
        user = super().save(commit=False)
        password = self.cleaned_data['password']
        user.set_password(password)
        if commit:
            user.save()
        return user
    
class LoginForm(AuthenticationForm):
    error_messages = {
        'invalid_login': "Por favor, entre com matrícula e senha corretos. ",
        'inactive': "Esta conta está inativa."
    }

    username = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Matrícula'}),
        label="Matrícula"  
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Senha'}),
        label="Senha"
    )
    
    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')  
        password = cleaned_data.get('password')

        print(f"Tentando autenticar: {username} | {password}") 

        user = authenticate(username=username, password=password) 
        print(f"Usuário autenticado: {user}")  

        if not user:
            raise forms.ValidationError("Matrícula ou senha inválidos.")

        return cleaned_data