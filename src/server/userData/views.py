from django.shortcuts import render
from rest_framework import viewsets
from .models import UserData
from .serializers import UserDataSerializer

# Create your views here.


class UserDataViewSet(viewsets.ModelViewSet):
    serializer_class = UserDataSerializer
    queryset = UserData.objects.all()
