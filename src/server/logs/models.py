from django.db import models
from nums.models import Number

# Database model for a gate opening log

class Log(models.Model):
    number_id = models.ForeignKey(Number, on_delete=models.CASCADE)
    opened = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['opened']
