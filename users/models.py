from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
   registration = models.IntegerField(unique=True)
   name = models.CharField(max_length=200)
   email = models.EmailField(unique=True)

   USERNAME_FIELD = 'registration'
   REQUIRED_FIELDS = ['email', 'name']

   def __str__(self):
       return self.name
