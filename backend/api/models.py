from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(help_text="توضیح کوتاه برای کارت پروژه")
    long_description = models.TextField(blank=True, null=True, help_text="توضیحات کامل برای صفحه جزئیات")
    image_url = models.ImageField(upload_to='projects/', help_text="عکس اصلی (Thumbnail)")
    tags = models.JSONField(default=list)
    link = models.URLField(blank=True, help_text="لینک دمو یا سایت")
    github_url = models.URLField(blank=True, null=True)
    video_url = models.URLField(blank=True, null=True, help_text="لینک یوتیوب یا آپارات")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

# مدل جدید برای عکس‌های بیشتر
class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='extra_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/gallery/')

    def __str__(self):
        return f"Image for {self.project.title}"

class ContactMessage(models.Model):
    # بدون تغییر باقی بماند
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
