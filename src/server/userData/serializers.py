from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from userData.models import UserData


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        return user
    # Model User fields that get serialized

    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "username",
            "password",
            "first_name",
            "last_name",
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
            "user",
            "residenceName",
            "streetBlockNumber",
            "homeNumber",
            "enrollment",
            "brandModel",
            "color",
        ]
