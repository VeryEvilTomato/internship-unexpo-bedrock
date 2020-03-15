from rest_framework import serializers
from .models import UserHome


class UserHomeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserHome
        fields = [
            "id",
            "residenceName",
            "streetBlockNumber",
            "homeNumber",
            "usersdata",
        ]
