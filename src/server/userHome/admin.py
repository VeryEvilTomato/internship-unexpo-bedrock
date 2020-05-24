from django.contrib import admin
from userHome.models import UserHome

# Register your models here.

"""
    class to show extra fields in admin interface for user home data, such as:
        list_display
        search_fields
        list_filter
"""


class AdminUserHome(admin.ModelAdmin):

    list_display = ("residenceName", "streetBlockNumber", "homeNumber")
    search_fields = ("residenceName", "homeNumber")
    list_filter = ("residenceName", "homeNumber")


admin.site.register(UserHome, AdminUserHome)
