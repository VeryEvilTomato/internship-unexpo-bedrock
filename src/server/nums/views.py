from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import Number
from .serializers import NumberSerializer

# Create your views here


class NumberViewSet(viewsets.ModelViewSet):
    serializer_class = NumberSerializer
    queryset = Number.objects.all()
    permission_classes = [permissions.IsAuthenticated]

