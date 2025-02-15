from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

class Course(models.Model):
   name = models.CharField(max_length=200)

   def __str__(self):
       return self.name

class CustomUserManager(BaseUserManager):
    def create_user(self, registration, email, name, password=None, **extra_fields):
        if not registration:
            raise ValueError('O número de matrícula é obrigatório')
        if not email:
            raise ValueError('O email é obrigatório')
        
        user = self.model(
            registration=registration,
            email=self.normalize_email(email),
            name=name,
            **extra_fields
        )
        user.set_password(password) 
        user.save(using=self._db)
        return user

    def create_superuser(self, registration, email, name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(registration, email, name, password, **extra_fields)

class CustomUser(AbstractUser):
   registration = models.CharField(
        max_length=20, 
        unique=True,
        validators=[RegexValidator(r'^\d+$', 'A matrícula deve conter apenas números.')],
    )
   name = models.CharField(max_length=200)
   email = models.EmailField(unique=True)
   course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True)

   username = models.CharField(max_length=200, blank=True, null=True)

   USERNAME_FIELD = 'registration'
   REQUIRED_FIELDS = ['email', 'name']

   objects = CustomUserManager()

   def __str__(self):
       return self.name
