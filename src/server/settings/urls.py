"""settings URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework.urlpatterns import format_suffix_patterns
from django.contrib import admin
from django.contrib.auth.models import User
from django.urls import path, include
from rest_framework import routers
from userData.views import UserViewSet, UserDataViewSet
from nums.views import NumberViewSet
from logs.views import Log_list, Log_detail, Logs_by_date, Log_detail_by_date
from django.conf.urls import url
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'usersdata', UserDataViewSet)
router.register(r'nums', NumberViewSet)
#router.register(r'logs', LogViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/toke/refresh/', TokenRefreshView.as_view()),
    path('api/token/verify/', TokenVerifyView.as_view(), name="token_verify"),
    path('api-auth/', include('rest_framework.urls')),
    # path('api/log-date/<str:opened>/', ListLogsByDate.as_view(), name='opened'),
    # url('^api/log-date/(?P<opened>.+)/$', ListLogsByDate.as_view())
    path('api/logs/', Log_list.as_view()),
    path('api/logs/date/<str:opening_date>/', Logs_by_date.as_view()),
    path('api/logs/number/<int:number>/', Log_detail.as_view()),
    path('api/logs/number/<int:number>/date/<str:opening_date>/', Log_detail_by_date.as_view())
    
]

# urlpatterns = format_suffix_patterns(urlpatterns)