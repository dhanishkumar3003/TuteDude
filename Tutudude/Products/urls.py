from django.urls import path
from . import views

urlpatterns = [
    path('get/', views.product_list, name='product_list'),
    path('add/', views.add_product, name='add_product'),
    path('get/<int:pk>/', views.get_product, name='get_product'),
    path('delete/<int:pk>/', views.delete_product, name='delete_product'),

]
