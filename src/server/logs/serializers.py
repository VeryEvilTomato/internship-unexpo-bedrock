from rest_framework import serializers
from logs.models import Log

class LogSerializer(serializers.ModelSerializer):
    # user_number = serializers.RelatedField(
    #     source='logs.user',
    #     read_only=True,
    # )# revisar porque no sirve ...
    class Meta:
        model = Log
        fields =[
            'method',
            'number',
            'opening_date',
            'opening_time',
            #'user_number',
        ]
        