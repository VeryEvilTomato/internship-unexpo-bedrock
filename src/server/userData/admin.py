from django.contrib import admin
from userData.models import UserData

# Register your models here.

"""
    class to show extra fields in admin interface for user data, such as:
        list_display
        search_fields
        list_filter
"""


class AdminUserData(admin.ModelAdmin):

    list_display = ("name", "lastName", "accesLevel", "locks")
    search_fields = ("name", "lastName")
    list_filter = ("name", "lastName", "accesLevel", "locks")


admin.site.register(UserData, AdminUserData)
