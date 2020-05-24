from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User

# Create your models here.

"""
    Extending the existing User model for storing information of registered users.
"""


class UserData(models.Model):

    class AccessLevel(models.TextChoices):

        ADMIN_LEVEL = 'AL', _('Administrador')
        NORMAL_LEVEL = 'NL', _('Normal')
        LIMITED_LEVEL = 'LL', _('Limitado')

    # Field that allows choosing level of access
    accessLevel = models.CharField(
        max_length=3,
        choices=AccessLevel.choices,
        default=AccessLevel.NORMAL_LEVEL,
        verbose_name="Nivel de acceso",
    )
    """
    Store information related to User,
    using a OneToOneField to a model
    containing the fields for additional information
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="usersdata",
    )
    # Field that allows selecting if the user is blocked or not
    locks = models.BooleanField(
        verbose_name="Bloqueado"
    )

    # Foreign key for a relationship between the home model and user model
    # home = models.ForeignKey(
    #     UserHome,
    #
    #
    #     related_name="usersdata",
    #     on_delete=models.CASCADE,
    # )

    # Home data
    residenceName = models.CharField(
        max_length=30,
        verbose_name="Nombre de residencia"
    )
    streetBlockNumber = models.CharField(
        max_length=10,
        verbose_name="Numero de manzana"
    )
    homeNumber = models.CharField(
        max_length=4,
        verbose_name="Numero de casa"
    )

    # Cars data
    enrollment = models.CharField(
        max_length=8,
        unique=True,
        verbose_name="Matrícula"
    )
    brandModel = models.CharField(
        max_length=35,
        verbose_name="Marca y modelo del carro"
    )
    color = models.CharField(
        max_length=15,
        verbose_name="Color del carro"
    )

    # converts data to a string
    def __str__(self):
        return "Nivel= %s | Bloqueado= %s | Residencia= %s | Manzana= %s | Casa= %s | Matricula= %s | Marca y Modelo= %s | Color= %s" % (
            self.accessLevel,
            self.locks,
            self.residenceName,
            self.streetBlockNumber,
            self.homeNumber,
            self.enrollment,
            self.brandModel,
            self.color,
        )
