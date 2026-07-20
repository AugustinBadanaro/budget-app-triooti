from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    GROUP_CHOICES = [
        ('essential', 'Besoins essentiels'),
        ('variable', 'Dépenses variables'),
        ('savings', 'Épargne'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=50)
    icon = models.CharField(max_length=50, blank=True)
    color = models.CharField(max_length=7, default='#D6336C')
    group = models.CharField(max_length=20, choices=GROUP_CHOICES, default='variable')

    def __str__(self):
        return self.name


class Transaction(models.Model):
    TYPE_CHOICES = [
        ('income', 'Revenu'),
        ('expense', 'Dépense'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='transactions')
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    description = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.type} - {self.amount} FCFA"


class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budgets')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='budgets')
    limit_amount = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.DateField()
    is_auto_generated = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.category.name} - {self.limit_amount} FCFA"


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    monthly_income = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=10, default='XOF')
