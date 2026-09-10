from django.db import models


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('education', 'Education & Institutional'),
        ('health', 'Health & Foodservice'),
        ('housing', 'Community & Housing'),
        ('institutional', 'Institutional & Hospitality'),
        ('residential', 'Residential Design'),
        ('concept', 'Concept Studies'),
        ('interior', 'Interior Design'),
    ]
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    location = models.CharField(max_length=200, blank=True)
    role = models.CharField(max_length=150, blank=True)  
    status = models.CharField(max_length=100, blank=True)
    year = models.PositiveIntegerField(blank=True, null=True)
    summary = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to='projects/', blank=True, null=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
    
class CategoryImage(models.Model):
    category = models.CharField(max_length=20, choices=Project.CATEGORY_CHOICES, unique=True)
    image = models.ImageField(upload_to='categories/')

    def __str__(self):
        return self.get_category_display() 
    
class ProjectImage(models.Model):
    IMAGE_TYPE_CHOICES = [
        ('gallery', 'Gallery'),
        ('before', 'Before'),
        ('after', 'After'),
    ]
    project = models.ForeignKey(Project, related_name='gallery', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)
    image_type = models.CharField(max_length=10, choices=IMAGE_TYPE_CHOICES, default='gallery')
    pair_key = models.CharField(
        max_length=50, blank=True,
        help_text="Set the same value on a 'before' and 'after' image of the same view "
                   "(e.g. 'view-1') so the frontend can pair them into a toggle."
    )
 
    class Meta:
        ordering = ['order']
 
    def __str__(self):
        return f"{self.project.title} — image {self.order}"

    
class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.created_at:%Y-%m-%d}"

    
class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email


class ProjectSpec(models.Model):
    project = models.ForeignKey(Project, related_name='specs', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)      # e.g. "Materials"
    value = models.CharField(max_length=300)      # e.g. "Exposed brick, walnut-toned wood..."
    order = models.PositiveIntegerField(default=0)
 
    class Meta:
        ordering = ['order']
 
    def __str__(self):
        return f"{self.project.title} — {self.label}"

# Add this new model anywhere below Project:

class ProjectSpec(models.Model):
    project = models.ForeignKey(Project, related_name='specs', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)      # e.g. "Materials"
    value = models.CharField(max_length=300)      # e.g. "Exposed brick, walnut-toned wood..."
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.project.title} — {self.label}"


# Replace the existing ProjectImage model with this (adds image_type + pair_key,
# everything else — including the field name `gallery` on Project — is unchanged):

class ProjectImage(models.Model):
    IMAGE_TYPE_CHOICES = [
        ('gallery', 'Gallery'),
        ('before', 'Before'),
        ('after', 'After'),
    ]
    project = models.ForeignKey(Project, related_name='gallery', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)
    image_type = models.CharField(max_length=10, choices=IMAGE_TYPE_CHOICES, default='gallery')
    pair_key = models.CharField(
        max_length=50, blank=True,
        help_text="Set the same value on a 'before' and 'after' image of the same view "
                   "(e.g. 'view-1') so the frontend can pair them into a toggle."
    )
    section = models.CharField(
        max_length=100, blank=True,
        help_text="Optional named gallery, e.g. 'The Finished Space', 'Reception', "
                   "'Co-Working & Director's Office', 'As Built'. Leave blank for the "
                   "general intro gallery at the top of the page. Images sharing the "
                   "same section render together as one grouped gallery, in 'order'."
    )

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.project.title} — image {self.order}"
