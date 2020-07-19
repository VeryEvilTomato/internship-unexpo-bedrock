from django.shortcuts import render
from rest_framework import viewsets, status, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from userData.serializers import UserSerializer, UserDataSerializers
from userData.models import UserData
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides 'list', 
    'create', 'retrieve', 'update' and 'destroy' actions
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(detail=True, methods=['put'], name='change Password', permission_classes=[permissions.IsAuthenticated])
    def set_password(self, request, pk=None):
        user = self.get_object()
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.data['password'])
            user.save()
            return Response({'status': 'contraseña cambiada'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'retrieve':
            # only Authenticated users can retrieve (Admin is auth user to)
            permission_classes = [permissions.IsAuthenticated]

        else:
            # only the admin can use the rest of the actions
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]


class UserDataViewSet(viewsets.ModelViewSet):
    # only the admin can use these view
    serializer_class = UserDataSerializers
    queryset = UserData.objects.all()
    permission_classes = [permissions.IsAuthenticated]
