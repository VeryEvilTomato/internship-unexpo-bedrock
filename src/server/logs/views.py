from django.http import HttpResponse

from logs.models import Log

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from logs.serializers import LogSerializer

from datetime import datetime


def test(request):
    return HttpResponse("Hello World!")


@api_view(['GET', 'POST'])
def log_list(request, format=None):
    '''
    Lists either every log inside the registry or submit a new one
    '''
    if request.method == 'GET':
        # Request every log within the database
        logs = Log.objects.all();
        serializer = LogSerializer(logs, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        # Submit new log to the database
        serializer = LogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def log_detail(request, date_str, format=None):
    '''
    Lists logs within an specific date
    '''
    # Format date string to Date object and look up logs within
    # that specific date
    datetime_obj = datetime.strptime(date_str, '%Y%m%d')
    date_obj = datetime_obj.date()
    logs_within_date = Log.objects.filter(opened__date = date_obj)

    # Serialize date list to JSON
    serializer = LogSerializer(logs_within_date, many=True)

    return Response(serializer.data)



