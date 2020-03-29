from django.db import models
from nums.models import Number

# Database model for a gate opening log


class Log(models.Model):
    number = models.ForeignKey(
        Number, related_name="logs", on_delete=models.CASCADE)
    opened = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-opened"]

    def __str__(self):
        return "Fecha= %s" % (self.opened)
