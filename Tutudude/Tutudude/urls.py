from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import path, re_path


schema_view = get_schema_view(
   openapi.Info(
      title="Vendor raw products",
      default_version='v1',
      description="API documentation",
      contact=openapi.Contact(email="you@example.com"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)



urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'), 
    path('admin/', admin.site.urls),
    path('Products/', include('Products.urls')),  
    path('Orders/', include('Orders.urls')),  
    path('users/',include('User.urls'))
    ]+[
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
