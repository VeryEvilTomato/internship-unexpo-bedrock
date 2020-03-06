from django.urls import path
from logs import views

urlpatterns = [
    path('', views.log_list),
    path('date/<str:date_str>', views.log_detail),
    path('test/', views.test),
]
