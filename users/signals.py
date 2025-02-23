from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

@receiver(post_save, sender=CustomUser)
def add_user_to_group(sender, instance, created, **kwargs):
    if created and instance.is_superuser:
        organizer_group = Group.objects.get(name='Organizer')
        instance.groups.add(organizer_group)