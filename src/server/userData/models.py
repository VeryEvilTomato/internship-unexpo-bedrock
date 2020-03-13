from django.db import models
from django.contrib.auth import user_logged_in
from userHome.models import UserHome

# Create your models here.

"""
    Model for storing information of registered users.
"""


class UserData(models.Model):
    ADMIN_LEVEL = "NA"
    NORMAL_LEVEL = "NU"
    LIMIT_LEVEL = "NL"

    ACCES_LEVEL = [
        (ADMIN_LEVEL, "Administrador"),
        (NORMAL_LEVEL, "Normal"),
        (LIMIT_LEVEL, "Limitado"),
    ]
    name = models.CharField(max_length=20, verbose_name="Nombre")
    lastName = models.CharField(max_length=20, verbose_name="Apellido")
    home = models.ForeignKey(UserHome, null=True, blank=False, on_delete=models.CASCADE)
    accesLevel = models.CharField(
        max_length=3,
        choices=ACCES_LEVEL,
        default=NORMAL_LEVEL,
        verbose_name="Nivel de acceso",
    )
    locks = models.BooleanField(null=False, default=False, verbose_name="Bloqueado")
    # loginData = models.OneToOneField(
    #     user_logged_in, null=True, blank=False, on_delete=models.CASCADE
    # )

    def __str__(self):
        return "Nombre: %s | Apellido= %s | Nivel= %s | Bloqueado= %s" % (
            self.name,
            self.lastName,
            self.accesLevel,
            self.locks,
        )
