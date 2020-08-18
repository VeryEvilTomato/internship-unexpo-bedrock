from django.db import models
from nums.models import Number
from django.utils.translation import gettext_lazy as _


# Database model for a gate opening log
class Log(models.Model):
    """
        Modelo para almacenar el Registro de apertura del portón
    """

    error = models.PositiveIntegerField(
        verbose_name='Codigo de Error',
        default=0,
    )
    
    class Access_method(models.TextChoices):
        WEB = '0', _('WEB')
        GSM = '1', _('GSM')
    method = models.CharField(
        verbose_name='Metodo de acceso',
        choices= Access_method.choices,
        default= Access_method.WEB,
        max_length=1,
    )
    """
        Metodo de acceso al servidor:
        0: WEB
        1: GSM
    """
    number= models.ForeignKey(
        Number,
        related_name="logs",
        on_delete=models.CASCADE,
    )
    """
        Relacion que permite que a un
        numero de telefono se le puedan asignar
        multiples registros de Logs
    """
    opening_date = models.DateField(
        verbose_name='Registro de fecha',
        auto_now_add=True,
    )
    
    opening_time = models.TimeField(
        verbose_name='Registro de Hora',
        auto_now_add=True,
    )

    def __str__(self):
        return "Metodo= %s | Numero= %s | Fecha= %s | Hora= %s" % (
            self.method,
            self.number,
            self.opening_date,
            self.opening_time,
        )
