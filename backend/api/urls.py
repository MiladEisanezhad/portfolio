from django.urls import path
from .views import ProjectListView, ContactView

urlpatterns = [
    path('projects/', ProjectListView.as_view(), name='projects'),
    path('contact/', ContactView.as_view(), name='contact'),
]