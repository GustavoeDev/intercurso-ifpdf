from django.db import models
from users.models import CustomUser

class Modality(models.Model):
  name = models.CharField(max_length=255, unique=True)

  def __str__(self):
    return self.name

class Competition(models.Model):
  SYSTEM_CHOICES = [
    ('league', 'League'),
    ('group', 'Group'),
    ('qualifiers', 'Qualifiers'),
  ]

  STATUS_CHOICES = [
    ('pendent', 'Pendent'),
    ('in_course', 'In Course'),
    ('finished', 'Finished'),
  ]

  name = models.CharField(max_length=255, unique=True, blank=False)
  modality = models.ForeignKey(Modality, on_delete=models.CASCADE, blank=False)
  system = models.CharField(max_length=255, choices=SYSTEM_CHOICES, blank=False)
  min_members_per_team = models.IntegerField(blank=False)
  max_members_per_team = models.IntegerField(blank=False)
  image = models.CharField(max_length=255, blank=True) # URL
  status = models.CharField(max_length=255, choices=STATUS_CHOICES, default='pendent')
  start_date = models.DateField(null=True, blank=True)
  end_date = models.DateField(null=True, blank=True)

  def __str__(self):
    return self.name

class Team(models.Model):
  name = models.CharField(max_length=255, unique=True)
  members = models.ManyToManyField(CustomUser, blank=False)
  competition = models.ForeignKey(Competition, on_delete=models.CASCADE, blank=False)
  pontuation = models.IntegerField(blank=True, default=0)
  abbreviation = models.CharField(max_length=3)
  register_date = models.DateField(auto_now_add=True)
  
  STATUS_CHOICES = [
    ('pendent', 'Pendent'),
    ('approved', 'Approved'),
  ]
  status = models.CharField(max_length=255, choices=STATUS_CHOICES, default='pendent')

  def __str__(self):
    return self.name

class Clasification(models.Model):
    team = models.OneToOneField(Team, on_delete=models.CASCADE, blank=False)
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE, blank=False)
    victories = models.IntegerField(blank=False, default=0)
    defeats = models.IntegerField(blank=False, default=0)
    ties = models.IntegerField(blank=True, default=0)
    pontuation = models.IntegerField(blank=False, default=0)
    games_played = models.IntegerField(blank=False, default=0)
    points_pro = models.IntegerField(blank=False, default=0) 
    points_against = models.IntegerField(blank=False, default=0)
    position = models.IntegerField(blank=False, default=0)

    @property
    def points_difference(self):
        return self.points_pro - self.points_against

    @points_difference.setter
    def points_difference(self, value):
        # Ignora a atribuição, pois points_difference é calculado
        pass

    @classmethod
    def update_positions(cls, competition_instance):
        classifications = cls.objects.filter(competition=competition_instance).annotate(
          points_difference=models.F('points_pro') - models.F('points_against')
        ).order_by(
            '-pontuation',
            '-points_difference'
        )
        position = 1
        for classification in classifications:
            cls.objects.filter(id=classification.id).update(position=position)
            position += 1

    def save(self, *args, **kwargs):
        # Salva o objeto
        super().save(*args, **kwargs)
        # Atualiza as posições após salvar
        self.update_positions(self.competition)

    def __str__(self):
        return f"{self.team.name} - {self.competition.name}"

class Game(models.Model):
  team_a = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_a', blank=False)
  team_b = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_b', blank=False)
  score_a = models.IntegerField(blank=True, null=True)
  score_b = models.IntegerField(blank=True, null=True)
  date = models.DateTimeField(blank=True, null=True)
  related_round = models.ForeignKey('Round', on_delete=models.CASCADE, blank=True, null=True)

  STATUS_CHOICES = [
    ('pendent', 'Pendent'),
    ('in_course', 'In Course'),
    ('finished', 'Finished'),
  ]
  status = models.CharField(max_length=255, choices=STATUS_CHOICES, default='pendent')

  def __str__(self):
    return f"{self.team_a} vs {self.team_b}"
  
class Round(models.Model):
  number = models.IntegerField(blank=False)
  competition = models.ForeignKey(Competition, on_delete=models.CASCADE, blank=False)

  def __str__(self):
    return f'{self.number}'

class Request(models.Model):
  REQUEST_TYPE_CHOICES = [
    ('approve_team', 'Approve Team'),
    ('delete_team', 'Delete Team'),
    ('remove_team_member', 'Remove Team Member'),
  ]
  STATUS_CHOICES = [
    ('pendent', 'Pendent'),
    ('done', 'Done'),
  ]
  request_type = models.CharField(max_length=255, choices=REQUEST_TYPE_CHOICES, blank=False)
  team = models.ForeignKey(Team, on_delete=models.CASCADE, blank=True)
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=True, null=True)
  reason = models.TextField(blank=True)
  status = models.CharField(max_length=255, choices=STATUS_CHOICES, default='pendent')
  created_at = models.DateTimeField(auto_now=True)