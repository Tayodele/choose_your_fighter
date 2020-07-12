from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('user/', views.getBallot, name='getBallot'),
    path('addr/', views.find_Address, name='find_Address'),
    path('geo/', views.find_LongLat, name='find_LongLat'),
]