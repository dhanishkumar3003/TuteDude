from django.db import models
from django.conf import settings
from Products.models import Product

class Order(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='orders')

    def __str__(self):
        usernames = ", ".join(user.username for user in self.users.all())
        return f"Order #{self.id} by [{usernames}]"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
