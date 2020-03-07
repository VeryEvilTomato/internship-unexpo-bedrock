from django.db import models
from django.conf import settings

# User database reference

User = settings.AUTH_USER_MODEL

# Database model for registered phone numbers

class Number(models.Model):
    user_id = models.ForeignKey(User, default=1, on_delete=models.CASCADE)
    number = models.CharField(max_length=10)
    car_model = models.CharField(max_length=15)
    car_plate = models.CharField(max_length=6)
    house_num = models.IntegerField()
    street_num = models.IntegerField()

    class Meta:
        ordering = ['number']
