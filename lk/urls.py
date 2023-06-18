from django.urls import path
from .views import *
from app import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', index, name="index"),
    path('/calc', calc, name="calc"),
    path('/auth', auth, name="auth")
    
]