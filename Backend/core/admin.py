from django.contrib import admin
from .models import Project, ContactMessage, ProjectImage, CategoryImage, NewsletterSubscriber, ProjectSpec


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at')
    readonly_fields = ('subscribed_at',)


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 3
    fields = ('image', 'image_type', 'pair_key', 'section', 'caption', 'order')


class ProjectSpecInline(admin.TabularInline):  # new
    model = ProjectSpec
    extra = 4
    fields = ('label', 'value', 'order')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'location', 'status', 'order')
    list_filter = ('category', 'status')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order',)
    inlines = [ProjectSpecInline, ProjectImageInline]  # specs inline added


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    readonly_fields = ('created_at',)


@admin.register(CategoryImage)
class CategoryImageAdmin(admin.ModelAdmin):
    list_display = ('category',)