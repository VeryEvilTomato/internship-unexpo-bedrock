from django.db import models

# Create your models here.


class UserHome(models.Model):
    nombreResidencia = models.CharField(max_length=20, null=True, blank=True)
    numeroManzana = models.CharField(max_length=10)
    numeroCasa = models.CharField(max_length=10)

    def __str__(self):
        return 'Residencia= %s | Manzana= %s | Casa= %s' % (self.nombreResidencia, self.numeroManzana, self.numeroCasa)
