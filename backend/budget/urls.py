from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import CategoryViewSet, TransactionViewSet, BudgetViewSet, AutoBudgetView

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('transactions', TransactionViewSet, basename='transaction')
router.register('budgets', BudgetViewSet, basename='budget')

urlpatterns = [
    path('budgets/auto/', AutoBudgetView.as_view(), name='auto-budget'),
] + router.urls