import pytest
from rest_framework.test import APIClient
from budget.models import Transaction

@pytest.mark.django_db
def test_create_transaction(api_client, category):
    response = api_client.post("/api/transactions/", {
        "category": category.id,
        "type": "expense",
        "amount": "50.00",
        "date": "2026-08-07",
        "description": "Courses",
    })
    assert response.status_code == 201
    assert Transaction.objects.count() == 1

@pytest.mark.django_db
def test_delete_transaction(api_client, category, user):
    tx = Transaction.objects.create(
        user=user, category=category, type="expense",
        amount=20, date="2026-08-07", description="Test"
    )
    response = api_client.delete(f"/api/transactions/{tx.id}/")
    assert response.status_code == 204
    assert Transaction.objects.count() == 0

@pytest.mark.django_db
def test_transaction_requires_auth():
    client = APIClient()
    response = client.get("/api/transactions/")
    assert response.status_code == 401

@pytest.mark.django_db
def test_transaction_isolated_by_user(api_client, category, user):
    other_user = User = __import__("django.contrib.auth.models", fromlist=["User"]).User.objects.create_user(
        username="other", password="pass123"
    )
    other_category = category.__class__.objects.create(user=other_user, name="Autre", group="variable")
    Transaction.objects.create(
        user=other_user, category=other_category, type="expense",
        amount=10, date="2026-08-07", description="Pas à moi"
    )
    response = api_client.get("/api/transactions/")
    assert response.status_code == 200
    assert all(t["id"] != None for t in response.data)  # sanity
    ids = [t["id"] for t in response.data]
    for t in Transaction.objects.filter(user=other_user):
        assert t.id not in ids