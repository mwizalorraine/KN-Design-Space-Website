from django.urls import path
from . import views
from .api_views import ProjectListView, ProjectDetailView, ContactMessageCreateView, CategoryImageListView, NewsletterSignupView, NewsListView, EventListView

urlpatterns = [
    path('api/projects/', ProjectListView.as_view(), name='project-list'),
    path('api/projects/<slug:slug>/', ProjectDetailView.as_view(), name='project-detail'),
    path('api/category-images/', CategoryImageListView.as_view(), name='category-images'),
    path('api/contact/', ContactMessageCreateView.as_view(), name='contact-create'),
    path('api/newsletter/', NewsletterSignupView.as_view(), name='newsletter-signup'),
    path('api/news/', NewsListView.as_view(), name='news-list'),
    path('api/events/', EventListView.as_view(), name='event-list'),
]