from django.db import models

# Create your models here.

"""
    Model for storing information of user's home.
"""


class UserHome(models.Model):
    residenceName = models.CharField(
        max_length=30, null=True, blank=True, verbose_name="Nombre de residencia"
    )
    streetBlockNumber = models.CharField(
        max_length=10, null=True, blank=False, verbose_name="Numero de manzana"
    )
    homeNumber = models.CharField(
        max_length=4, null=True, blank=False, verbose_name="Numero de casa"
    )

    def __str__(self):
        return "Residencia= %s | Manzana= %s | Casa= %s" % (
            self.residenceName,
            self.streetBlockNumber,
            self.homeNumber,
        )
