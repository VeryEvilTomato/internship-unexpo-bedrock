from django.db import models
from django.conf import settings
from userData.models import UserData

# User database reference
User = settings.AUTH_USER_MODEL


class Number(models.Model):
    """
    Database model for registered phone numbers
    """
    number = models.CharField(max_length=10)
    userData = models.ForeignKey(
        UserData, related_name="nums", null=True, blank=False, on_delete=models.CASCADE
    )

    class Meta:
        ordering = ["number"]

    def __str__(self):
        return 'Telefono= %s | Datos del Usuario= %s' % (self.number, self.userData)
