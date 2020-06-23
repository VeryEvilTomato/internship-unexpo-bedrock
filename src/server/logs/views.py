from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets, permissions, request
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import action
from .models import Log
import logs.mqtt as mqtt
from .serializers import LogSerializer


class LogViewSet(viewsets.ModelViewSet):
    serializer_class = LogSerializer
    queryset = Log.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        print("Opening gate")
        # Samuel recuerda normativa estandar del formato autopep8 para el lenguaje Python
        mqtt.client.publish(mqtt.TOPIC, payload='1',
                            qos=mqtt.QOS, retain=False)
        return super().create(request)
