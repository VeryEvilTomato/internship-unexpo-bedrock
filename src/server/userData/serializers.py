from rest_framework import serializers
from django.contrib.auth.models import User
from userData.models import UserData


class UserSerializer(serializers.ModelSerializer):
    # Model User fields that get serialized
    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "is_staff",
            "is_superuser",
            "last_login",
            "usersdata",
            "nums",
        ]
        depth = 1


class ChangePasswordSerializer(serializers.ModelSerializer):
    model = User
    # Serializer for password change endpoint
    # To-Do / in construction !!!
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    pass


class UserDataSerializers(serializers.ModelSerializer):
    # Model UserData fields that get serialized
    class Meta:
        model = UserData
        fields = [
            "accessLevel",
            "locks",
            "home",
            "user",
        ]
