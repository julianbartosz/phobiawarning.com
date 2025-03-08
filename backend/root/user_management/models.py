from datetime import timezone
import datetime
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

from django.core.validators import MinLengthValidator
from django.db.models import UniqueConstraint, CheckConstraint, Q


class UserManager(BaseUserManager):
    def get_by_natural_key(self, email):
        return self.get(**{self.model.USERNAME_FIELD: email})

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)

class Roles(models.TextChoices):
    AD = "Admin"
    US = "User"
    MO = "Moderator"

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(_('username'), unique=True, max_length=50, default='default_username')
    role = models.CharField(_('role'), max_length=9, choices=Roles.choices, default=Roles.US)
    zip_code = models.CharField(_('zip code'), blank=True, null=True, max_length=5, validators=[MinLengthValidator(5)])
    created_at = models.DateTimeField(default=datetime.datetime.now, verbose_name='created at')
    is_deleted = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        app_label = 'user_management'
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return f"{self.email} id:{self.id}"

    @classmethod
    def get_by_natural_key(cls, username):
        return cls.objects.get(**{cls.USERNAME_FIELD: username})
    
    def get_full_name(self):
        full_name = f'{self.first_name} {self.last_name}'.strip()
        return full_name or self.email

    def get_short_name(self):
        return self.first_name

    @property
    def is_staff(self):
        return self.is_superuser

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser


class Forums(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    title = models.CharField(_('title'), max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        verbose_name = _('forum')
        verbose_name_plural = _('forums')

    def __str__(self):
        return f"Forum ID:{self.id}"


class Replies(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    forum_id = models.ForeignKey(Forums, on_delete=models.CASCADE)
    parent_id = models.ForeignKey("self", blank=True, null=True, on_delete=models.DO_NOTHING)
    # Note: if parent_id is null, its parent is the initial forum post indicated by forum_id
    body = models.TextField(_('body'))
    created_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        verbose_name = _('reply')
        verbose_name_plural = _('replies')

    def __str__(self):
        return f"Reply ID:{self.id}"

    
class Likes(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    reply_id = models.ForeignKey(Replies, on_delete=models.CASCADE)
    ld_value = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    ld_value = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('like')
        verbose_name_plural = _('likes')
        constraints = [
            UniqueConstraint(
                fields=['user_id', 'reply_id'],
                name='unq_vote'
            )
        ]

    def __str__(self):
        return f"Like ID:{self.id}"