from django.db import models
from django.conf import settings
from userData.models import UserData

# User database reference
User = settings.AUTH_USER_MODEL


class Number(models.Model):
    """
    Database model for registered phone numbers
    """

    # user = models.ForeignKey(User, default=1, on_delete=models.CASCADE)
    number = models.CharField(max_length=10)
    userData = models.ForeignKey(
        UserData, null=True, blank=False, on_delete=models.CASCADE
    )

    class Meta:
        ordering = ["number"]

    def __str__(self):
        return "Telefono= %s | Datos del Usuario= %s" % (self.number, self.userData)

