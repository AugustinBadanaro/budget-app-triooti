from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import RebalanceGroupView

from .views import (
    CategoryViewSet,
    TransactionViewSet,
    BudgetViewSet,
    AutoBudgetView,
    RegisterView,
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'transactions', TransactionViewSet, basename='transaction')
router.register(r'budgets', BudgetViewSet, basename='budget')

urlpatterns = [
    path('budgets/auto/', AutoBudgetView.as_view(), name='auto-budget'),
    path('register/', RegisterView.as_view(), name='register'),
    path("budgets/rebalance/", RebalanceGroupView.as_view(), name="rebalance-group"),
] + router.urls