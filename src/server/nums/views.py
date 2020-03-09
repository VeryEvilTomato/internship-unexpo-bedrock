from nums.models import Number

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from nums.serializers import NumberSerializer

@api_view(['GET'])
def num_list(request, format=None):
    '''
    List either every phone number or submit a new one
    '''
    if request.method == 'GET':
        # Request every number within the db
        numbers = Number.objects.all();
        serializer = NumberSerializer(numbers, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def num_detail(request, phone_str, format=None):
    '''
    CRUD for phone numbers within the system
    '''
    if request.method == 'GET':
        phone = Number.objects.filter(number__exact=phone_str).first()
        serializer = NumberSerializer(phone)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        # If phone number is found within the database 
        # respond with status 400
        phone = Number.objects.filter(number__exact=phone_str).first()
        if phone:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # Insert 'number' key in the unserialized data dictionary
        request.data['number'] = phone_str
        serializer = NumberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        phone = Number.objects.filter(number__exact=phone_str).first()
        serializer = NumberSerializer(phone, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        phone = Number.objects.filter(number__exact=phone_str).first()
        if phone:
            phone.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


