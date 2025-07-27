from django.db import models
from django.conf import settings
from Products.models import Product

class Order(models.Model):
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)

    RATING_CHOICES = [(i, str(i)) for i in range(1, 6)]
    rating = models.IntegerField(choices=RATING_CHOICES, null=True, blank=True)

    ORDER_STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PROCESSING', 'Processing'),
        ('SHIPPED', 'Shipped'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled'),
    ]
    order_status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='PENDING')

    def __str__(self):
        return f"Order #{self.id}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
