from django.db import models
from userHome.models import UserHome
# Create your models here.


class UserManagement(models.Model):
    NIVEL_ADMIN = 'NA'
    NIVEL_NORMAL = 'NU'
    NIVEL_LIMITADO = 'NL'

    NIVELES_DE_ACCESO = [
        (NIVEL_ADMIN, 'Administrador'),
        (NIVEL_NORMAL, 'Normal'),
        (NIVEL_LIMITADO, 'Limitado'),
    ]
    nombre = models.CharField(max_length=20)
    apellido = models.CharField(max_length=20)
    telefono = models.IntegerField()
    casa = models.ForeignKey(UserHome, null=True,
                             blank=False, on_delete=models.CASCADE)
    nivelAcceso = models.CharField(
        max_length=3, choices=NIVELES_DE_ACCESO, default=NIVEL_NORMAL)
    bloqueo = models.BooleanField(null=False, default=False)

    def __str__(self):
        return 'Nombre: %s | Apellido= %s | Telefono= %s | Nivel= %s | Bloqueo= %s' % (self.nombre, self.apellido, self.telefono, self.nivelAcceso, self.bloqueo)
