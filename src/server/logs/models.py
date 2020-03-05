from django.db import models
from django.conf import settings

# User database reference

User = settings.AUTH_USER_MODEL

# Database model for a gate opening log

class Log(models.Model):
    user_id = models.ForeignKey(User, default=1, on_delete=models.CASCADE)
    opened = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['opened']
