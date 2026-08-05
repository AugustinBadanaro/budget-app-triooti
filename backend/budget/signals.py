from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Category

DEFAULT_CATEGORIES = [
    ("Alimentation", "essential"),
    ("Logement", "essential"),
    ("Transport", "variable"),
    ("Télécom", "variable"),
    ("Loisirs", "variable"),
    ("Santé", "variable"),
    ("Épargne", "savings"),
]

@receiver(post_save, sender=User)
def create_default_categories(sender, instance, created, **kwargs):
    if created:
        for name, group in DEFAULT_CATEGORIES:
            Category.objects.create(user=instance, name=name, group=group)