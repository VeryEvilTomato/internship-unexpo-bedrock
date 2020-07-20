from rest_framework import serializers
from logs.models import Log
from nums.models import Number

class LogSerializer(serializers.ModelSerializer):
    number_id = serializers.CharField(source='number.id', read_only=True)
    user = serializers.CharField(source='number.user', read_only=True)
    number = serializers.CharField(source='number.number', read_only=True)
    class Meta:
        model = Log
        exclude = ['id']

        