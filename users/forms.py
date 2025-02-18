from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate
from .models import *

from django import forms
from django.core.exceptions import ValidationError
from .models import CustomUser

class CustomUserCreationForm(forms.ModelForm):
    password = forms.CharField(
        widget=forms.PasswordInput,
        label="Senha"
    )

    full_name = forms.CharField(
        label="Nome Completo",
        max_length=200,
        widget=forms.TextInput(attrs={'placeholder': 'Nome'})
    )

    class Meta:
        model = CustomUser
        fields = ['username', 'full_name', 'email', 'password', 'course']
        labels = {
            'username': 'Matrícula',
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
            elif field_name == 'username':
                field.widget.attrs['placeholder'] = 'Matrícula'
            elif field_name == 'email':
                field.widget.attrs['placeholder'] = 'E-mail'
            elif field_name == 'password':
                field.widget.attrs['placeholder'] = 'Senha'

    def clean_username(self):
        """ Valida se a matrícula contém apenas números e tem um tamanho válido """
        username = self.cleaned_data.get('username')
        if not username.isdigit():
            raise ValidationError("A matrícula deve conter apenas números.")
        if len(username) < 5 or len(username) > 15:
            raise ValidationError("A matrícula deve ter entre 5 e 15 dígitos.")
        return username

    def clean_full_name(self):
        """ Valida se o nome completo contém apenas letras e espaços """
        full_name = self.cleaned_data.get('full_name')
        if not all(char.isalpha() or char.isspace() for char in full_name):
            raise ValidationError("O nome deve conter apenas letras e espaços.")

        # Verifica se há pelo menos um sobrenome
        if len(full_name.split()) < 2:
            raise ValidationError("Digite seu nome completo (Nome e Sobrenome).")

        return full_name

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
        user.password = self.cleaned_data['password']
        user.set_password(user.password)

        # Separar o nome completo em first_name e last_name
        full_name = self.cleaned_data['full_name'].strip().split()
        user.first_name = full_name[0]  # Primeiro nome
        user.last_name = " ".join(full_name[1:]) if len(full_name) > 1 else ""  # Restante como sobrenome

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