from rest_framework import serializers
from .models import Category, Transaction, Budget, UserProfile
from django.db import models

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'color']

class TransactionSerializer(serializers.ModelSerializer):
    budget_status = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = ['id', 'category', 'type', 'amount', 'date', 'description', 'created_at', 'budget_status']

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Le montant doit être strictement positif.")
        return value

    def get_budget_status(self, obj):
        from .models import Budget
        if obj.type != 'expense':
            return None
        budget = Budget.objects.filter(
            user=obj.user, category=obj.category,
            month__year=obj.date.year, month__month=obj.date.month
        ).first()
        if not budget:
            return None
        total = Transaction.objects.filter(
            user=obj.user, category=obj.category, type='expense',
            date__year=obj.date.year, date__month=obj.date.month
        ).aggregate(total=models.Sum('amount'))['total'] or 0
        percentage = round((float(total) / float(budget.limit_amount)) * 100, 1)
        return {'limit': float(budget.limit_amount), 'spent': float(total), 'percentage': percentage}

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['id', 'category', 'limit_amount', 'month', 'is_auto_generated']

    def validate_limit_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Le montant du budget doit être positif.")
        return value

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['monthly_income', 'currency']