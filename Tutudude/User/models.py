from django.db import models
from django.contrib.auth.models import AbstractUser


class UserModel(AbstractUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username=models.CharField(max_length=100,unique=True,null=False,blank=False)
    email = models.CharField(unique=True, null=False, blank=False, max_length=255)
    password = models.CharField(max_length=200)
    shop_name = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(max_length=50, choices=[('vendor', 'Vendor'), ('supplier', 'Supplier')], default='vendor')
    address = models.TextField(blank=True, null=True)
    google_map_link = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.role}{self.email}"
    
    

