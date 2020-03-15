from rest_framework import serializers
from userData.models import UserData


class UserDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserData
        fields = [
            "name",
            "lastName",
            "accesLevel",
            "locks",
            "home",
            "nums",
        ]

