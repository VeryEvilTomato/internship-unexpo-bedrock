from django.contrib import admin
from userManagement.models import UserManagement

# Register your models here.


class AdminUserManagement(admin.ModelAdmin):

    list_display = ("nombre", "apellido", "telefono",
                    "nivelAcceso", "bloqueo")
    search_fields = ("nombre", "apellido", "telefono")

    list_filter = ("nombre", "apellido", "telefono","nivelAcceso", "bloqueo")


admin.site.register(UserManagement, AdminUserManagement)
