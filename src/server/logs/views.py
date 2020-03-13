from django.shortcuts import render
from rest_framework import viewsets
from .models import Log
from .serializers import LogSerializer


class LogViewSet(viewsets.ModelViewSet):
    serializer_class = LogSerializer
    queryset = Log.objects.all()


# def test(request):
#     return HttpResponse("Hello World!")


# @api_view(['GET'])
# def log_list(request, format=None):
#     '''
#     Lists either every log inside the registry
#     '''
#     logs = Log.objects.all();
#     serializer = LogSerializer(logs, many=True)
#     return Response(serializer.data)


# @api_view(['POST'])
# def log_submit(request, phone_str, format=None):
#     '''
#     Submits a new log to the database
#     '''
#     number = Number.objects.filter(number__exact=phone_str).first()
#     if not number:
#         return Response(status=status.HTTP_400_BAD_REQUEST)
#     log = Log.objects.create(number_id=number.id)
#     try:
#         log.save()
#         return Response(status=status.HTTP_200_OK)
#     except:
#         return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# @api_view(['GET'])
# def log_detail(request, date_str, format=None):
#     '''
#     Lists logs within an specific date
#     '''
#     # Format date string to Date object and look up logs within
#     # that specific date
#     datetime_obj = datetime.strptime(date_str, '%Y%m%d')
#     date_obj = datetime_obj.date()
#     logs_within_date = Log.objects.filter(opened__date = date_obj)

#     # Serialize date list to JSON
#     serializer = LogSerializer(logs_within_date, many=True)

#     return Response(serializer.data)

