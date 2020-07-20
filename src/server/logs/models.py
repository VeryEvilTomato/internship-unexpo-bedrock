from django.db import models
from nums.models import Number

# Database model for a gate opening log
class Log(models.Model):
    """
        Modelo para almacenar el Registro de apertura del portón
    """

    # error = models.IntegerField(
    #     verbose_name='Codigo de Error',
    #     max_length=1,
    # )
    """
        Si ocurre un Error en la comunicacion:
        este campo no lo entiendo, actualmente para atender errores
        se utilizan los codigos de estado de respuesta HTTP:
        - (100-199). Respuestas informativas
        - (200-299). Respuestas satisfactorias
        - (300-399). Redirecciones
        - (400-499). Errores del cliente
        - (500-599). Errores del Servidor
            -> en los errores de servidor encaja perfectamente
               el error de "El ESP32 no responde", ya que el 
               modulo ESP forma parte de la estructura del servidor.
    """
    method = models.IntegerField(verbose_name='Metodo de acceso', null=True)
    """
        Metodo de acceso al servidor:
        0: Web
        1: Local
        2: Gsm
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