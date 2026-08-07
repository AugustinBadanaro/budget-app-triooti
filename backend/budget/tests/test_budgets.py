import pytest
from budget.models import Budget

@pytest.mark.django_db
def test_create_budget(api_client, category):
    response = api_client.post("/api/budgets/", {
        "category": category.id,
        "limit_amount": "100.00",
        "month": "2026-08-01",
    })
    assert response.status_code == 201
    assert Budget.objects.count() == 1

@pytest.mark.django_db
def test_delete_budget(api_client, category, user):
    b = Budget.objects.create(user=user, category=category, limit_amount=100, month="2026-08-01")
    response = api_client.delete(f"/api/budgets/{b.id}/")
    assert response.status_code == 204