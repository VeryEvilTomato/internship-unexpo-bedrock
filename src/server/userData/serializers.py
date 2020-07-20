from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, password_validation
from userData.models import UserData


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=10,
        max_length=20
    )
    username = serializers.CharField(
        min_length=5,
        max_length=10
    )

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
            'is_staff',
            'is_active',
            "username",
            "password",
            "first_name",
            "last_name",
            "usersdata",
            "nums",
        ]
        depth = 1


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


# class PasswordSerializer(serializers.ModelSerializer):
#     old_password = serializers.CharField(
#         write_only=True, required=True, max_length=15)
#     new_password1 = serializers.CharField(
#         write_only=True, required=True, max_length=15)
#     new_password2 = serializers.CharField(
#         write_only=True, required=True, max_length=15)

#     def check_old_password(self, value):
#         user = self.context['request'].user
#         if not user
#     pass
