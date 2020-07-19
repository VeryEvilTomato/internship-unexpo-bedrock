from django.contrib import admin
from logs.models import Log

# Register your models here.


class AdminLogs(admin.ModelAdmin):
    list_display = ("number", "opening_date")
    list_filter = ("opening_date",)
    date_hierarchy = "opening_date"


admin.site.register(Log, AdminLogs)
