from rest_framework import serializers
from nums.models import Number


class NumberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Number
        fields = [
            "id",
            "number",
            "userData",
            "logs",
        ]
