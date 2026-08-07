import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from budget.models import Category, Transaction, Budget

@pytest.fixture
def user(db):
    return User.objects.create_user(username="testuser", password="testpass123")

@pytest.fixture
def api_client(user):
    client = APIClient()
    client.force_authenticate(user=user)
    return client

@pytest.fixture
def category(db, user):
    return Category.objects.create(user=user, name="Alimentation", group="essential")