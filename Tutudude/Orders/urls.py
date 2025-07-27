from django.urls import path
from . import views

urlpatterns = [
    path('ViewOrders/', views.list_orders, name='list_orders'),
    path('CreateOrder/', views.create_order, name='create_order'),
    path('orders/<int:order_id>', views.update_order, name='update_order'),
]
