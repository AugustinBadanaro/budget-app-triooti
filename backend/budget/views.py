from rest_framework import viewsets, permissions
from .models import Category, Transaction, Budget, UserProfile
from .serializers import CategorySerializer, TransactionSerializer, BudgetSerializer, UserProfileSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BudgetViewSet(viewsets.ModelViewSet):
    serializer_class = BudgetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProfile

class AutoBudgetView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        income = request.data.get('monthly_income')
        if not income or float(income) <= 0:
            return Response({'error': 'Revenu invalide'}, status=400)

        income = float(income)
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        profile.monthly_income = income
        profile.save()

        percentages = {'essential': 0.5, 'variable': 0.3, 'savings': 0.2}
        categories = Category.objects.filter(user=request.user)
        result = []
        for cat in categories:
            share = percentages.get(cat.group, 0.3) / max(
                categories.filter(group=cat.group).count(), 1
            )
            result.append({
                'category_id': cat.id,
                'category_name': cat.name,
                'group': cat.group,
                'suggested_amount': round(income * share, 2)
            })
        return Response(result)