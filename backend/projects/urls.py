from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.ProfileDetail.as_view(), name='profile_detail'),
    path('projects/', views.ProjectList.as_view(), name='project_list'),
    path('contact/', views.ContactCreate.as_view(), name='contact_create'),
]