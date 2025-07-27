# from django.shortcuts import render
from rest_framework.generics import CreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from .models import UserModel
from .serializers import UserSerializers,LoginSerializer
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import login,authenticate,logout
from drf_yasg.utils import swagger_auto_schema
from django.db.models import Q

from Orders.models import Order, OrderItem  # Adjust import based on your structure
from django.db.models import F, Sum, Avg

class RevenueAndRatingView(APIView):
    def get(self, request):
        completed_orders = Order.objects.filter(order_status='completed')

        # Calculate total revenue
        total_revenue = OrderItem.objects.filter(
            order__in=completed_orders
        ).aggregate(
            revenue=Sum(F('quantity') * F('product__price'))
        )['revenue'] or 0

        # Calculate average rating
        avg_rating = completed_orders.aggregate(
            average_rating=Avg('rating')
        )['average_rating'] or 0

        return Response({
            "total_revenue": float(total_revenue),
            "average_rating": round(avg_rating, 2)
        }, status=status.HTTP_200_OK)
    
class UserCreateView(CreateAPIView):
    queryset=UserModel.objects.all()
    serializer_class=UserSerializers

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response({
            "status": True,
            "message": "User created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)
    
class DetailUserView(RetrieveUpdateDestroyAPIView):
    queryset=UserModel.objects.all()
    serializer_class=UserSerializers
    lookup_field="pk"


class LoginUserView(APIView):
    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self,request):
        username=request.data.get('username')
        password=request.data.get("password")
        try:
            user_o=UserModel.objects.get(Q(username=username)|Q(email=username)&Q(password=password))
        except:
            return Response({"error":"user not found"},status=status.HTTP_404_NOT_FOUND)
        
        user=authenticate(request,username=user_o.username,password=password)
        
        if user is not None:
            login(request, user)
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    def post(self,request):
        logout(request)
        return Response(status=status.HTTP_200_OK)