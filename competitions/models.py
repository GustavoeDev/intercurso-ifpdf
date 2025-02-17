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
  members_per_team = models.IntegerField(blank=False)
  image = models.CharField(max_length=255, blank=True) # URL
  status = models.CharField(max_length=255, choices=STATUS_CHOICES, default='pendent')
  start_date = models.DateField()
  end_date = models.DateField()

  def __str__(self):
    return self.name

class Team(models.Model):
  name = models.CharField(max_length=255, unique=True)
  members = models.ManyToManyField(CustomUser, blank=False)
  competition = models.ForeignKey(Competition, on_delete=models.CASCADE, blank=False)
  pontuation = models.IntegerField(blank=True, default=0)
  register_date = models.DateField()
  
  STATUS_CHOICES = [
    ('pendent', 'Pendent'),
    ('approved', 'Approved'),
  ]
  status = models.CharField(max_length=255, choices=STATUS_CHOICES, default='pendent')

  def __str__(self):
    return self.name


class Game(models.Model):
  team_a = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_a', blank=False)
  team_b = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_b', blank=False)
  score_a = models.IntegerField(blank=True, null=True)
  score_b = models.IntegerField(blank=True, null=True)
  date = models.DateTimeField()

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
  games = models.ManyToManyField(Game, blank=True)

  def __str__(self):
    return self.name