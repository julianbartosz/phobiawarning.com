# urls.py
from django.urls import path, include
from . import views
from django.contrib.auth.views import LogoutView
from core.views_api import plants_list

urlpatterns = [
    path('', views.home, name='home'),
    path('logout/', LogoutView.as_view(next_page='home'), name='logout'),
    path('search_select/', views.search_select, name='search_select'),
    path('api/movies/', movies_list, name='movies_list'),
]
