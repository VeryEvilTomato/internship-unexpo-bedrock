from rest_framework import serializers
from logs.models import Log
from nums.models import Number

class LogSerializer(serializers.ModelSerializer):
    # number_id = serializers.CharField(source='number.id')
    username = serializers.CharField(source='number.user.username', read_only=True)
    first_name = serializers.CharField(source='number.user.first_name', read_only=True)
    last_name = serializers.CharField(source='number.user.last_name', read_only=True)
    phone = serializers.CharField(source='number.number', read_only=True)
    is_staff = serializers.CharField(source='number.user.is_staff', read_only=True)
    class Meta:
        model = Log
        fields = [
            'error',
            'number',
            'method',
            'is_staff',
            'username',
            'first_name',
            'last_name',
            'phone',
            'opening_date',
            'opening_time',
        ]

        