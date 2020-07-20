from rest_framework import serializers
from logs.models import Log
from nums.models import Number

class LogSerializer(serializers.ModelSerializer):
    # number_id = serializers.CharField(source='number.id')
    user = serializers.CharField(source='number.user', read_only=True)
    phone = serializers.CharField(source='number.number', read_only=True)
    is_superuser = serializers.CharField(source='number.user.is_superuser', read_only=True)
    class Meta:
        model = Log
        fields = [
            'number',
            'method',
            'is_superuser',
            'user',
            'phone',
            'opening_date',
            'opening_time',
        ]

        