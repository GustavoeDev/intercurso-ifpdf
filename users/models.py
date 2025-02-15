from django.db import models
from django.contrib.auth.models import AbstractUser

class Course(models.Model):
   name = models.CharField(max_length=200)

class CustomUser(AbstractUser):
   registration = models.IntegerField(unique=True)
   name = models.CharField(max_length=200)
   email = models.EmailField(unique=True)
   course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True)

   USERNAME_FIELD = 'registration'
   REQUIRED_FIELDS = ['email', 'name']

   def __str__(self):
       return self.name
