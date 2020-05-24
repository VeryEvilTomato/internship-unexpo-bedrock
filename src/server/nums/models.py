from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class Number(models.Model):
    """
    Database model for registered phone numbers
    """
    number = models.CharField(max_length=10)
    user = models.ForeignKey(
        User,
        related_name="nums",
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )

    class Meta:
        ordering = ["number"]

    def __str__(self):
        return 'Telefono= %s | Datos del Usuario= %s' % (self.number, self.user)
