from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets, permissions, request, status
from rest_framework.response import Response
from .models import Log
import logs.mqtt as mqtt
from .serializers import LogSerializer
from time import sleep


class LogViewSet(viewsets.ModelViewSet):
    serializer_class = LogSerializer
    queryset = Log.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        # puedes comentarlo para que no te genere peos en tus pruebas
        print("Opening gate")
        mqtt.client.publish(mqtt.TOPIC, payload="1", qos=mqtt.QOS, retain=False)
        print(mqtt.message_flag)
        i = 0
        while i <= 4 and mqtt.message_flag == False:
            i += 1
            if i == 4:
                return Response(
                    {"Fail": "----Modulo fuera de linea----"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            sleep(1)
        if mqtt.message_flag == True:
            mqtt.message_flag = False
            return super().create(request)

