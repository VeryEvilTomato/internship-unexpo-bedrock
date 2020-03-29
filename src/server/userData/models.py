from django.db import models
from django.contrib.auth.models import User
from userHome.models import UserHome

# Create your models here.

"""
    Extending the existing User model for storing information of registered users.
"""


class UserData(models.Model):

    # Access Levels for users

    ADMIN_LEVEL = "NA"
    NORMAL_LEVEL = "NU"
    LIMIT_LEVEL = "NL"

    ACCES_LEVEL = [
        (ADMIN_LEVEL, "Administrador"),
        (NORMAL_LEVEL, "Normal"),
        (LIMIT_LEVEL, "Limitado"),
    ]
    """
    store information related to User, 
    using a OneToOneField to a model 
    containing the fields for additional information
    """
    user = models.OneToOneField(
        User,
        null=True,
        on_delete=models.CASCADE,
        related_name="usersdata",
    )
    # model that can choice access level
    accesLevel = models.CharField(
        max_length=3,
        choices=ACCES_LEVEL,
        default=NORMAL_LEVEL,
        verbose_name="Nivel de acceso",
    )
    # model that can select if the user is lock or not
    locks = models.BooleanField(
        null=False, default=False, verbose_name="Bloqueado")
    # foreign key for relationship between home model and user model
    home = models.ForeignKey(
        UserHome,
        related_name="usersdata",
        null=True,
        blank=False,
        on_delete=models.CASCADE,
    )
    # converts data to a string

    def __str__(self):
        return "Nivel= %s | Bloqueado= %s | Casa= %s" % (
            self.accesLevel,
            self.locks,
            self.home,
        )
