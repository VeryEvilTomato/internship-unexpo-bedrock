from django.contrib import admin
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


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
