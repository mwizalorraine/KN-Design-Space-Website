from rest_framework import generics
from django.core.mail import send_mail
from django.conf import settings
from .models import Project, ContactMessage
from .serializers import ProjectSerializer, ContactMessageSerializer
from .models import CategoryImage
from .serializers import CategoryImageSerializer
from .models import NewsletterSubscriber
from .serializers import NewsletterSerializer

class NewsletterSignupView(generics.CreateAPIView):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSerializer

class CategoryImageListView(generics.ListAPIView):
    queryset = CategoryImage.objects.all()
    serializer_class = CategoryImageSerializer

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        send_mail(
            subject=f"New enquiry from {instance.name}",
            message=f"From: {instance.name} ({instance.email})\nPhone: {instance.phone or 'n/a'}\n\n{instance.message}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],
            fail_silently=True,
        )
class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'