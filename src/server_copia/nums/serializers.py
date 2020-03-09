from rest_framework import serializers
from nums.models import Number

class NumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Number
        fields = ['user_id', 'number', 'car_model', 'car_plate', 'house_num', 'street_num']
