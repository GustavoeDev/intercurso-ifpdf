from django import forms
from django.core.exceptions import ValidationError
from django.utils import timezone
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

class AddModalityForm(forms.ModelForm):
  name = forms.CharField(
    label='Nome da modalidade',
    validators=[RegexValidator(r'^[a-zA-Z\s]+$', 'A modalidade deve conter apenas letras.')],
    widget=forms.TextInput(attrs={'placeholder': 'Modalidade'}),
    error_messages={
      'unique': "Já existe uma modalidade com este nome.",
      'invalid': "A nome deve conter apenas letras."
    }
  )

  class Meta:
    model = Modality
    fields = ['name']

class EditModalityForm(forms.ModelForm):
  name = forms.CharField(
    label='Nome da modalidade',
    validators=[RegexValidator(r'^[a-zA-Z\s]+$', 'A modalidade deve conter apenas letras.')],
    widget=forms.TextInput(attrs={'placeholder': 'Modalidade'}),
    error_messages={
      'unique': "Já existe uma modalidade com este nome.",
      'invalid': "A nome da modalidade deve conter apenas letras."
    }
  )

  class Meta:
    model = Modality
    fields = ['name']

class AddCompetitionForm(forms.ModelForm):
    name = forms.CharField(
        label="Nome da competição",
        max_length=100,
        widget=forms.TextInput(attrs={
            'placeholder': 'Ex: Basquete mascsulino',
            'required': 'required',
        }),
        validators=[RegexValidator(r'^[A-Za-z\s]+$', 'O nome da competição deve conter apenas letras e espaços.')],
        error_messages={
            'unique': "Já existe uma competição com este nome.",
            'invalid': "O nome da competição deve conter apenas letras e espaços."
        }
    )

    SYSTEM_CHOICES = [
        ('group', 'Grupos'),
        ('league', 'Pontos Corridos'),
        ('qualifiers', 'Eliminatórias'),
    ]

    system = forms.ChoiceField(
        label="Sistema da competição",
        choices=SYSTEM_CHOICES,
        widget=forms.RadioSelect(attrs={
            'required': 'required',
        })
    )

    min_members_per_team = forms.IntegerField(
        label="Quantidade mínima de participantes por equipe",
        widget=forms.NumberInput(attrs={
            'placeholder': 'Ex: 8',
            'required': 'required',
        }),
        min_value=1  # Valor mínimo permitido
    )

    max_members_per_team = forms.IntegerField(
        label="Quantidade máxima de participantes por equipe",
        widget=forms.NumberInput(attrs={
            'placeholder': 'Ex: 12',
            'required': 'required',
        }),
        min_value=1  # Valor mínimo permitido
    )

    def clean(self):
        cleaned_data = super().clean()
        min_players = cleaned_data.get('min_members_per_team')
        max_players = cleaned_data.get('max_members_per_team')

        if min_players and max_players and min_players > max_players:
            raise forms.ValidationError(
            "A quantidade máxima deve ser maior ou igual à quantidade mínima."
        )

        return cleaned_data

    class Meta:
        model = Competition
        fields = ['name', 'system', 'min_members_per_team', 'max_members_per_team']
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
class EditScoreboardForm(forms.ModelForm):
    score_a = forms.IntegerField(
       required=False,
    )
    score_b = forms.IntegerField(
       required=False,
    )
    status = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput,
    )

    date = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date'}),  # Usa um input de data HTML5
        required=False,  # Torna o campo opcional
    )
    time = forms.TimeField(
        widget=forms.TimeInput(attrs={'type': 'time'}),  # Usa um input de hora HTML5
        required=False,  # Torna o campo opcional
    )
    
    def save(self, commit=True):
        game = super().save(commit=False)

        if self.cleaned_data.get('score_a') is not "":
            game.score_a = self.cleaned_data['score_a']

        if self.cleaned_data.get('score_b') is not "":
            game.score_b = self.cleaned_data['score_b']

        if self.cleaned_data.get('date') and self.cleaned_data.get('time'):
            game.date = timezone.make_aware(
                timezone.datetime.combine(
                    self.cleaned_data['date'],
                    self.cleaned_data['time']
                )
            )
        elif self.cleaned_data.get('date'):
            # Se apenas a data for fornecida, define a hora como 00:00
            game.date = timezone.make_aware(
                timezone.datetime.combine(
                    self.cleaned_data['date'],
                    timezone.datetime.min.time()
                )
            )
        elif self.cleaned_data.get('time'):
            # Se apenas a hora for fornecida, define a data como a data atual
            game.date = timezone.make_aware(
                timezone.datetime.combine(
                    timezone.now().date(),
                    self.cleaned_data['time']
                )
            )
        else:
            # Se nenhum valor for fornecido, define o campo como None
            game.date = None

        # Salva o objeto se commit=True
        if commit:
            game.save()
        
        # Retorna o objeto game
            return game

        #Atualiza o status com base no valor do checkbox
        if self.cleaned_data['status']:
            game.status = 'finished'
        else:
            game.status = 'in_course'
        if commit:
            game.save()
            return game

    class Meta:
        model = Game
        fields = ['score_a', 'score_b']
