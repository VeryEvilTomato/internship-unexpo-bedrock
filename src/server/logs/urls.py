from django.urls import path
from logs import views

urlpatterns = [
    path('test/', views.test),
    path('logs/', views.log_list),
]
