# Generated by Django 5.1.3 on 2025-02-18 16:59

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_customuser_course'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='name',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='registration',
        ),
        migrations.AlterField(
            model_name='customuser',
            name='username',
            field=models.CharField(default='default_user', max_length=20, unique=True, validators=[django.core.validators.RegexValidator('^\\d+$', 'A matrícula deve conter apenas números.')]),
            preserve_default=False,
        ),
    ]
