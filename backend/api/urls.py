from django.urls import path
from .views import ProjectListView, ContactView, ProjectDetailView

urlpatterns = [
    path('projects/', ProjectListView.as_view(), name='projects'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'), # مسیر جدید
    path('contact/', ContactView.as_view(), name='contact'),
]

