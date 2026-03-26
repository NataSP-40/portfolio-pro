from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.ProfileDetail.as_view(), name='profile_detail'),
    path('projects/', views.ProjectList.as_view(), name='project_list'),
    path('resume/', views.ResumeRetrieve.as_view(), name='resume_retrieve'),
    
    # Contact endpoints (two-model approach)
    path('contact-info/', views.ContactInfoRetrieve.as_view(), name='contact_info'),  # GET admin info
    path('messages/', views.MessageCreate.as_view(), name='message_create'),           # POST user message
    path('messages/list/', views.MessageList.as_view(), name='message_list'),          # GET all messages (admin)
]