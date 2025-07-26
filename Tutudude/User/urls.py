from django.urls import path
from .views import UserCreateView,LoginUserView,LogoutView,DetailUserView

urlpatterns = [
    path('register/',UserCreateView.as_view(),name="register"),
    path('login/',LoginUserView.as_view(),name="login"),
    path('logout/',LogoutView.as_view(),name="logout"),
    path("<int:pk>/",DetailUserView.as_view(),name="detail")
]