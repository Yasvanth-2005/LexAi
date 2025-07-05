"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # Assignment 1: Job Portal
    path('api/create-company/', views.create_company),
    path('api/post-job/', views.post_job),
    path('api/jobs/', views.jobs),
    path('api/apply/', views.apply),
    path('api/applicants/<int:job_id>/', views.applicants),
    # Assignment 2: Blog + Comment System
    path('api/register/', views.register),
    path('api/login/', views.user_login),
    path('api/create-post/', views.create_post),
    path('api/posts/', views.posts),
    path('api/post/<int:id>/', views.post_detail),
    path('api/post/<int:id>/comment/', views.add_comment),
]
