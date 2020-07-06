from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from userData.models import UserData
from nums.models import Number

# Register your models here.

"""
    Making a Custon User class
"""

class UserInline(admin.StackedInline):
    # Define an inline admin descriptor for UserData model
    model = UserData
    can_delete = False
    verbose_name_plural = 'Users'
    


class NumsInline(admin.StackedInline):
    # Define an inline admin descriptor for Nums model
    model = Number
    can_delete = False
    verbose_name_plural = 'Nums'


class UserAdmin(BaseUserAdmin):
    # Define a new UserAdmin
    inlines = (UserInline, NumsInline)
    def get_fieldsets(self, request, obj= None):
        return [
            (None, {'fields': ('username', 'password')}),
            (None, {'fields': ('is_active', 'is_staff')}),
            (None, {'fields': ('first_name', 'last_name', 'email')}),
        ]

admin.site.site_header = 'Interfaz de Administración'
# Re-register UserAdmin
admin.site.unregister(User)
admin.site.unregister(Group)
admin.site.register(User, UserAdmin)
