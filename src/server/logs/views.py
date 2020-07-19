from rest_framework import viewsets, permissions, request, status, generics
from rest_framework.response import Response
from .models import Log
import logs.mqtt as mqtt
from .serializers import LogSerializer
from time import sleep
from rest_framework.pagination import PageNumberPagination
from django.utils import timezone
from dateutil.parser import parse
from datetime import datetime
class CustomLogsPagination(PageNumberPagination):
    page_size = 200
    # page_query_param = 
    page_size_query_param = 'page_size'
    max_page_size = 1000
    
    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'page_size': self.page_size,
            'results': data
        })
class LogViewSet(viewsets.ModelViewSet):
    serializer_class = LogSerializer
    #filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    # pagination_class = CustomLogsPagination
    queryset = Log.objects.all().order_by('-opened') #filter(opened=timezone.now())
    permission_classes = [permissions.IsAuthenticated]
    # def get_queryset(self):
    #     filter = {}
    #     queryset = Log.objects.all()

    #     date = self.request.query_params.get('opened', None)
    #     if date is not None:
    #         filter['send_on__gte'] = parse(Log__opened)
    #     queryset = queryset.filter(**filter)
    #     return queryset

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
                    status=status.HTTP_503_SERVICE_UNAVAILABLE,
                )
            sleep(1)
        if mqtt.message_flag == True:
            mqtt.message_flag = False
            return super().create(request)

class ListLogsByDate(generics.ListAPIView):
    serializer_class = LogSerializer

    # def get_queryset(self):
    #     filter = {}
    #     queryset = Log.objects.all()

    #     date = self.request.query_params.get('opened', None)
    #     if date is not None:
    #         filter['send_on__gte'] = parse(opened)
    #         queryset = queryset.filter(**filter)
    #         return queryset

    # def get_queryset(self):
    #     queryset= Log.objects.all()
    #     date = self.request.query_params.get('opened', None)# consigo el string del prpio url
    #     print (date)
    #     datetime_obj= datetime.strptime(date, '%Y%m%d') # creo el objeto
    #     date = datetime_obj.date() # nada mas agarro la fecha
    #     if date is not None:
    #         queryset = queryset.filter(opened=date)
    #         return queryset


    # def get_queryset(self):
    #     opened=self.kwargs['opened']
    #     print (str(opened))
    #     opened_str = str(opened)
    #     datetime_obj = datetime.strptime(opened_str, '%Y%m%d')
    #     date_obj=datetime_obj.date()
    #     l = Log.objects.filter(opened__date=date_obj)
    #     s = LogSerializer(l, many=True)
    #     return Response(s.data)

    def get_queryset(self):
        opened=self.kwargs['opened']
        print (str(opened))
        opened_str = str(opened)
        filter={}
        queryset = Log.objects.all()
        if opened_str is not None:
            filter['opened'] = opened
        
        queryset = queryset.filter(**filter)
        return queryset