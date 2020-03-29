from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import UserHome
from .serializers import UserHomeSerializer

# Create your views here.


class UserHomeViewSet(viewsets.ModelViewSet):
    serializer_class = UserHomeSerializer
    queryset = UserHome.objects.all()
    permission_classes = [permissions.IsAdminUser]
