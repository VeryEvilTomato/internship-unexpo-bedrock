from django.contrib import admin
from userHome.models import UserHome

# Register your models here.


class AdminUserHome(admin.ModelAdmin):

    list_display = ("nombreResidencia", "numeroManzana", "numeroCasa")
    search_fields = ("numeroManzana", "numeroCasa")
    list_filter = ("numeroManzana", "numeroCasa")


admin.site.register(UserHome, AdminUserHome)
