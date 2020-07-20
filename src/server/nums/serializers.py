from rest_framework import serializers
from nums.models import Number


class NumberSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Number
        fields = [
            'id',
            'number',
            'user',
        ]
