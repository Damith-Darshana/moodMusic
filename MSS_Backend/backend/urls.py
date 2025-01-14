from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('signup', views.signup, name='signup'),
    path('logout', views.logout, name='logout'),
    path('music/<str:pk>/', views.music, name='music'),
    path('profile/<str:pk>/', views.profile, name='profile'),
    path('search', views.search, name='search'),
    path('pll/<str:pk>/', views.playlist, name='playlist'),
    path('playlistname', views.allplaylistrender, name='allplaylistrender'),
    path('trending', views.trending, name='trending'),
    path('page2', views.page2, name='page2'),
    path('discover', views.discover, name='discover'),
    path('recommend/', views.recommend, name='recommend'),
    # path('favourite', views.discover, name='discover'),

]