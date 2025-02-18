from django import forms
from users.models import *

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