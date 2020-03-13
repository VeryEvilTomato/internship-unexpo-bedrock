from django.contrib import admin
from logs.models import Log

# Register your models here.


class AdminLogs(admin.ModelAdmin):
    list_display = ("number", "opened")
    list_filter = ("opened",)
    date_hierarchy = "opened"


admin.site.register(Log, AdminLogs)
