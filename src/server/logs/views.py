from rest_framework import permissions, request, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Log
from .serializers import LogSerializer

import logs.mqtt as mqtt

from time import sleep
from django.utils import timezone
from dateutil.parser import parse
from datetime import datetime

#--------------------------------------------------------------------------
class Log_list(APIView):
    """
        Muestra la lista de logs, o crea un nuevo logs
    """
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        """Muestra la lista de logs"""
        logs=Log.objects.all()
        serializer=LogSerializer(logs, many=True)
        return Response (serializer.data)

    def post(self, request, format= None):
        """
            Crea un log y si el request esta mal 
            formulado envia el HTTP estatus code 400
        """
        serializer= LogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#-----------------------------------------------------------------------------------
class Logs_by_date(APIView):
    """
        Permite mostar la lista de logs
        pero filtrando por fecha
    """
    permission_classes=[permissions.IsAuthenticated]

    def get(self, request, opening_date, format=None):
        log = Log.objects.filter(opening_date=opening_date)
        serializer = LogSerializer(log, many=True)
        return Response(serializer.data)
#------------------------------------------------------------------------------------
class Log_detail(APIView):
    """
        Permite ver, actualizar y borrar
        los datos de un log en especifico
    
    """
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self, number):
        try:
            return Log.objects.get(number=number)
        except Log.DoesNotExist:
            return Response (
                {'Fail':'El usuario no existe'},
                status=status.HTTP_404_NOT_FOUND,
            )
    
    def get(self, request, number, format=None):
        log = Log.objects.filter(number=number)
        serializer = LogSerializer(log, many=True)
        return Response(serializer.data)

    def put(self, request, number, format=None):
        log = self.get_object(number)
        serializer = LogSerializer(log, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializar.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, number, format= None):
        log = self.get_object(number)
        log.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
#----------------------------------------------------------------------------------

class Log_detail_by_date(APIView):
    """
        premite filtar los log por numero de usuario
        y por fecha
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, number, opening_date, format=None):
        log = Log.objects.filter(number=number, opening_date = opening_date)
        serializer = LogSerializer(log, many=True)
        return Response(serializer.data)


# class CustomLogsPagination(PageNumberPagination):
#     page_size = 200
#     # page_query_param = 
#     page_size_query_param = 'page_size'
#     max_page_size = 1000
    
#     def get_paginated_response(self, data):
#         return Response({
#             'links': {
#                 'next': self.get_next_link(),
#                 'previous': self.get_previous_link()
#             },
#             'count': self.page.paginator.count,
#             'page_size': self.page_size,
#             'results': data
#         })
# class LogViewSet(viewsets.ModelViewSet):
#     serializer_class = LogSerializer
    #filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    # pagination_class = CustomLogsPagination
    # queryset = Log.objects.all().order_by('-opened') #filter(opened=timezone.now())
    # permission_classes = [permissions.IsAuthenticated]
    # def get_queryset(self):
    #     filter = {}
    #     queryset = Log.objects.all()

    #     date = self.request.query_params.get('opened', None)
    #     if date is not None:
    #         filter['send_on__gte'] = parse(Log__opened)
    #     queryset = queryset.filter(**filter)
    #     return queryset

    # def create(self, request):
    #     # puedes comentarlo para que no te genere peos en tus pruebas
    #     print("Opening gate")
    #     mqtt.client.publish(mqtt.TOPIC, payload="1", qos=mqtt.QOS, retain=False)
    #     print(mqtt.message_flag)
    #     i = 0
    #     while i <= 4 and mqtt.message_flag == False:
    #         i += 1
    #         if i == 4:
    #             return Response(
    #                 {"Fail": "----Modulo fuera de linea----"},
    #                 status=status.HTTP_503_SERVICE_UNAVAILABLE,
    #             )
    #         sleep(1)
    #     if mqtt.message_flag == True:
    #         mqtt.message_flag = False
    #         return super().create(request)

# class ListLogsByDate(generics.ListAPIView):
#     serializer_class = LogSerializer

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

    # def get_queryset(self):
    #     opened=self.kwargs['opened']
    #     print (str(opened))
    #     opened_str = str(opened)
    #     filter={}
    #     queryset = Log.objects.all()
    #     if opened_str is not None:
    #         filter['opened'] = opened
        
    #     queryset = queryset.filter(**filter)
    #     return queryset

