from django.urls import path
from . import views
from .api_views import ProjectListView, ProjectDetailView, ContactMessageCreateView, CategoryImageListView, NewsletterSignupView

urlpatterns = [
    path('api/projects/', ProjectListView.as_view(), name='project-list'),
    path('api/projects/<slug:slug>/', ProjectDetailView.as_view(), name='project-detail'),
    path('api/category-images/', CategoryImageListView.as_view(), name='category-images'),
    path('api/contact/', ContactMessageCreateView.as_view(), name='contact-create'),
    path('api/newsletter/', NewsletterSignupView.as_view(), name='newsletter-signup'),
]