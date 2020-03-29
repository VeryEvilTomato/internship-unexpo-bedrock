from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import Log
from .serializers import LogSerializer


class LogViewSet(viewsets.ModelViewSet):
    serializer_class = LogSerializer
    queryset = Log.objects.all()
    permission_classes = [permissions.IsAdminUser]
