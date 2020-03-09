from django.urls import path
from nums import views

urlpatterns = [
    path('', views.num_list),
    path('<str:phone_str>', views.num_detail),
]
