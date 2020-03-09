from django.contrib import admin
from userManagement.models import UserManagement

# Register your models here.


class AdminUserManagement(admin.ModelAdmin):

    list_display = ("nombre", "apellido", "telefono",
                    "numero_manzana", "numero_casa", "bloqueo")
    search_fields = ("nombre", "apellido", "telefono")

    list_filter = ("nombre", "apellido", "telefono", "bloqueo")


admin.site.register(UserManagement, AdminUserManagement)
