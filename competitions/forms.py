from django import forms
from django.core.exceptions import ValidationError
from users.models import *
from .models import *

class RemoveMemberRequestForm(forms.ModelForm):
    reason = forms.CharField(
        label='Motivo da alteração',
        widget=forms.Textarea(attrs={'placeholder': 'Explique o motivo...', 'rows': 0}),
        required=True
    )
    
    class Meta:
        model = Request
        fields = ['reason']

class RemoveTeamRequestForm(forms.ModelForm):
    reason = forms.CharField(
        label='Motivo da alteração',
        widget=forms.Textarea(attrs={'placeholder': 'Explique o motivo...', 'rows': 0}),
        required=True
    )
    
    class Meta:
        model = Request
        fields = ['reason']

class TeamForm(forms.ModelForm):
    class Meta:
        model = Team
        fields = ['name', 'competition', 'abbreviation']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Ex: Servidores FC'}),
            'abbreviation': forms.TextInput(attrs={'placeholder': 'Ex: SVD'}),
        }
        error_messages = {
            'name': {
                'unique': "Já existe uma equipe com este nome na competição selecionada.",
            },
            'abbreviation': {
                'unique': "Já existe uma equipe com esta abreviação na competição selecionada.",
            },
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].label = 'Nome da Equipe'
        self.fields['competition'].label = 'Competição'
        self.fields['abbreviation'].label = 'Abreviação'
        self.fields['competition'].queryset = Competition.objects.all()
        self.fields['competition'].choices = [
            ('', 'Selecione a competição')
        ] + list(self.fields['competition'].choices)[1:]
        self.fields['competition'].widget.attrs['required'] = True
        self.fields['competition'].widget.attrs['onchange'] = "this.options[0].disabled = true;"
    
    def clean_abbreviation(self):
        abbreviation = self.cleaned_data['abbreviation']
        if len(abbreviation) < 3:
            raise forms.ValidationError('A abreviação deve ter 3 caracteres.')
        return abbreviation.upper()

class TeamMemberForm(forms.Form):
    username = forms.CharField(
        label='Matrícula',
        widget=forms.TextInput(attrs={'placeholder': 'Matrícula'})
    )
    full_name = forms.CharField(
        label='Nome Completo',
        widget=forms.TextInput(attrs={'placeholder': 'Nome Completo'})
    )
    course = forms.ModelChoiceField(
        queryset=Course.objects.all(),
        label='Curso',
        required=True
    )
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['course'].choices = [
            ('', 'Selecione seu curso')
        ] + list(self.fields['course'].choices)[1:]
        self.fields['course'].widget.attrs['required'] = True
        self.fields['course'].widget.attrs['onchange'] = "this.options[0].disabled = true;"
    
    def clean_username(self):
        username = self.cleaned_data.get('username')
        if not username:
            raise forms.ValidationError("A matrícula é obrigatória.")
        return username

# Requests Forms

class RejectRequestForm(forms.ModelForm):
    ACTION_CHOICES = [
        ('approved', 'Aprovar Solicitação'),
        ('rejected', 'Negar Solicitação'),
    ]

    action = forms.ChoiceField(
        choices=ACTION_CHOICES,
        widget=forms.RadioSelect(attrs={'class': 'radio-group'}),
        required=True,
    )

    class Meta:
        model = Request
        fields = ['reason_rejected']
        widgets = {
            'reason_rejected': forms.Textarea(attrs={'placeholder': 'Explique o motivo...', 'rows': 0}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['reason_rejected'].required = False
        self.fields['reason_rejected'].label = 'Motivo da rejeição'

    def clean(self):
        cleaned_data = super().clean()
        action = cleaned_data.get('action')
        reason_rejected = cleaned_data.get('reason_rejected')

        if action == 'rejected' and not reason_rejected:
            self.add_error('reason_rejected', 'Este campo é obrigatório ao negar a solicitação.')

        return cleaned_data
