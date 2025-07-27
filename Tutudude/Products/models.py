from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Grains & Cereals', 'Grains & Cereals'),
        ('Legumes & Pulses', 'Legumes & Pulses'),
        ('Fruits', 'Fruits'),
        ('Vegetables', 'Vegetables'),
        ('Nuts & Seeds', 'Nuts & Seeds'),
        ('Meat', 'Meat'),
        ('Seafood', 'Seafood'),
        ('Dairy', 'Dairy'),
        ('Oils', 'Oils'),
        ('Spices', 'Spices'),
        ('Sweeteners', 'Sweeteners'),
        ('Others', 'Others')
    ]

    PRODUCT_TYPE_CHOICES = [
        ('Veg', 'Veg'),
        ('Non-Veg', 'Non-Veg'),
        ('Vegan', 'Vegan'),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(null=True, blank=True)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    product_type = models.CharField(max_length=10, choices=PRODUCT_TYPE_CHOICES, default='Veg')  # ✅ New field

    def __str__(self):
        return self.name
