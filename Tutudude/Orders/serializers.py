from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Order, OrderItem
from Products.models import Product

User = get_user_model()

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    users = serializers.PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all()
    )

    class Meta:
        model = Order
        fields = ['id', 'users', 'created_at', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        users = validated_data.pop('users')
        order = Order.objects.create()
        order.users.set(users)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order
