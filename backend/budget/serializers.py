from rest_framework import serializers
from .models import Category, Transaction, Budget, UserProfile

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'color']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'category', 'type', 'amount', 'date', 'description', 'created_at']

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Le montant doit être strictement positif.")
        return value

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