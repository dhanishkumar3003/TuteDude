# from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from .models import UserModel
from .serializers import UserSerializers
from rest_framework import status


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

