from django.db import models

# Create your models here.


class UserManagement(models.Model):
    nombre = models.CharField(max_length=20)
    apellido = models.CharField(max_length=20)
    telefono = models.IntegerField()
    numero_manzana = models.IntegerField()
    numero_casa = models.IntegerField()
    bloqueo = models.BooleanField(null=True)

    def __str__(self):
        return 'Nombre: %s | Apellido= %s | Telefono= %s | Manzana= %s | Casa= %s | Bloqueo= %s' % (self.nombre, self.apellido, self.telefono, self.numero_manzana, self.numero_casa, self.bloqueo)
