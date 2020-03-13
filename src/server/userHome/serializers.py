from rest_framework import serializers
from .models import UserHome


class UserHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserHome
        fields = "__all__"
