from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework import permissions
from django.views.decorators.csrf import csrf_exempt
from .models import Log
import logs.mqtt as mqtt
from .serializers import LogSerializer

"""
    Traté de no darme mucha mala vida probando si publicaba,
    así que sencillamente cree un View a los pingazos que
    si llega en una petición POST, ejecuta el método
    publish de la clase MqttClient
"""


class LogViewSet(viewsets.ModelViewSet):
    serializer_class = LogSerializer
    queryset = Log.objects.all()
    permission_classes = [permissions.IsAdminUser]

@csrf_exempt
def CreateLogView(request):
    if request.method == 'POST':
        print("Opening gate")
        mqtt.client.publish()
        return JsonResponse({'message': 'ok'})

