from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, TransactionViewSet, BudgetViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('transactions', TransactionViewSet, basename='transaction')
router.register('budgets', BudgetViewSet, basename='budget')

urlpatterns = router.urls


from django.urls import path
from .views import AutoBudgetView

urlpatterns = router.urls + [
    path('budgets/auto/', AutoBudgetView.as_view(), name='auto-budget'),
]