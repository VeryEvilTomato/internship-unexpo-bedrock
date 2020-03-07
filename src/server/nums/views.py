from nums.models import Number

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from nums.serializers import NumberSerializer

@api_view(['GET', 'POST'])
def num_list(request, format=None):
    '''
    List either every phone number or submit a new one
    '''
    if request.method == 'GET':
        # Request every number within the db
        numbers = Number.objects.all();
        serializer = NumberSerializer(numbers, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        # Submit new phone number to the db
        serializer = NumberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def num_detail(request, format=None):
    '''
    CRUD for phone numbers within the system
    '''
    if request.method == 'GET':
        pass
    elif request.method == 'POST':
        pass
    elif request.method == 'PUT':
        pass
    elif request.method == 'DELETE':
        pass




