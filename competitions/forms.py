from django import forms
from users.models import *
from .models import *

class AddUserToTeamForm(forms.Form):
    username = forms.CharField(
        label='Matrícula',
        max_length=20,
        validators=[RegexValidator(r'^\d+$', 'A matrícula deve conter apenas números.')],
        widget=forms.TextInput(attrs={'placeholder': 'Matrícula'})
    )
    full_name = forms.CharField(
        label='Nome completo',
        max_length=255,
        widget=forms.TextInput(attrs={'placeholder': 'Nome'})
    )
    course = forms.ModelChoiceField(
        label='Curso',
        queryset=Course.objects.all(),
        empty_label=None,
        widget=forms.Select(attrs={'placeholder': 'Escolha seu curso'})
    )

    def clean_username(self):
        username = self.cleaned_data['username']
        if not username.isdigit():
            raise forms.ValidationError('A matrícula deve conter apenas números.')
        return username
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['course'].choices = [
            ('', 'Selecione seu curso')
        ] + list(self.fields['course'].choices)[1:]

        self.fields['course'].widget.attrs['required'] = True
        self.fields['course'].widget.attrs['onchange'] = "this.options[0].disabled = true;"

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

class AddModalityForm(forms.ModelForm):
    name = forms.CharField(
        label='Nome da modalidade',
        validators=[RegexValidator(r'^[a-zA-Z]+$', 'A modalidade deve conter apenas letras.')],
        widget=forms.TextInput(attrs={'placeholder': 'Modalidade'}),
        error_messages={
            'unique': "Já existe uma modalidade com este nome.",
            'invalid': "A modalidade deve conter apenas letras."
        }
    )

    class Meta:
        model = Modality
        fields = ['name']