from django.urls import path
from logs import views

urlpatterns = [
    path('date/<str:date_str>', views.log_detail),
    path('<str:phone_str>', views.log_submit),
    path('', views.log_list),
    path('test/', views.test),
]
