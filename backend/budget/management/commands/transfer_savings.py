from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db.models import Sum
from budget.models import Budget, Category, Transaction
from datetime import date

class Command(BaseCommand):
    help = "Transfère le reste non dépensé de chaque budget vers la catégorie Épargne"

    def add_arguments(self, parser):
        parser.add_argument("--year", type=int, required=True)
        parser.add_argument("--month", type=int, required=True)

    def handle(self, *args, **options):
        year = options["year"]
        month = options["month"]

        for user in User.objects.all():
            budgets = Budget.objects.filter(
                user=user, month__year=year, month__month=month
            ).exclude(category__group="savings")

            if not budgets.exists():
                self.stdout.write(f"{user.username} : aucun budget pour {month}/{year}")
                continue

            total_remainder = 0
            for budget in budgets:
                spent = Transaction.objects.filter(
                    user=user,
                    category=budget.category,
                    type="expense",
                    date__year=year,
                    date__month=month,
                ).aggregate(total=Sum("amount"))["total"] or 0

                remainder = float(budget.limit_amount) - float(spent)
                self.stdout.write(
                    f"  {user.username} / {budget.category.name} : limite={budget.limit_amount}, dépensé={spent}, reste={remainder:.2f}"
                )
                if remainder > 0:
                    total_remainder += remainder

            if total_remainder > 0:
                savings_category = Category.objects.filter(user=user, group="savings").first()
                if not savings_category:
                    self.stdout.write(f"{user.username} : pas de catégorie Épargne, transfert ignoré.")
                    continue

                Transaction.objects.create(
                    user=user,
                    category=savings_category,
                    type="income",
                    amount=round(total_remainder, 2),
                    date=date(year, month, 1),
                    description=f"Transfert épargne — reste non dépensé {month}/{year}",
                )
                self.stdout.write(f"{user.username} : {total_remainder:.2f} F transférés vers Épargne")
            else:
                self.stdout.write(f"{user.username} : aucun reste positif à transférer ce mois-ci.")