from rest_framework import serializers
from .models import Project, ContactMessage, ProjectImage, CategoryImage, NewsletterSubscriber, ProjectSpec


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['email']


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'order', 'image_type', 'pair_key', 'section']  # added section


class ProjectSpecSerializer(serializers.ModelSerializer):  # new
    class Meta:
        model = ProjectSpec
        fields = ['label', 'value', 'order']


class ProjectSerializer(serializers.ModelSerializer):
    gallery = ProjectImageSerializer(many=True, read_only=True)
    specs = ProjectSpecSerializer(many=True, read_only=True)  # new

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'location', 'role', 'status',
            'year', 'summary', 'cover_image', 'featured', 'order',
            'gallery', 'specs',  # added specs
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'message']


class CategoryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryImage
        fields = ['category', 'image']