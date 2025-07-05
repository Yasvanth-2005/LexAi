from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .models import Company, JobPost, Applicant, Post, Comment
import json
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required

# Create your views here.

# --- Assignment 1: Job Portal APIs ---
@csrf_exempt
@require_http_methods(["POST", "GET"])
def create_company(request):
    if request.method == "GET":
        companies = Company.objects.all()
        data = [
            {"id": c.id, "name": c.name, "location": c.location, "description": c.description}
            for c in companies
        ]
        return JsonResponse(data, safe=False)
    try:
        data = json.loads(request.body)
        company = Company.objects.create(
            name=data["name"],
            location=data["location"],
            description=data["description"]
        )
        return JsonResponse({"id": company.id, "message": "Company created"}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def post_job(request):
    try:
        data = json.loads(request.body)
        company = Company.objects.filter(id=data["company_id"]).first()
        if not company:
            return JsonResponse({"error": "Company not found"}, status=404)
        job = JobPost.objects.create(
            company=company,
            title=data["title"],
            description=data["description"],
            salary=data["salary"],
            location=data["location"]
        )
        return JsonResponse({"id": job.id, "message": "Job posted"}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@require_http_methods(["GET"])
def jobs(request):
    jobs = JobPost.objects.select_related('company').all()
    job_list = [
        {
            "id": job.id,
            "title": job.title,
            "description": job.description,
            "salary": job.salary,
            "location": job.location,
            "company": job.company.name,
            "created_at": job.created_at
        } for job in jobs
    ]
    return JsonResponse(job_list, safe=False)

@csrf_exempt
@require_http_methods(["POST"])
def apply(request):
    try:
        data = json.loads(request.body)
        job = JobPost.objects.filter(id=data["job_id"]).first()
        if not job:
            return JsonResponse({"error": "Job not found"}, status=404)
        applicant = Applicant.objects.create(
            name=data["name"],
            email=data["email"],
            resume_link=data["resume_link"],
            job=job
        )
        return JsonResponse({"id": applicant.id, "message": "Application submitted"}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@require_http_methods(["GET"])
def applicants(request, job_id):
    job = JobPost.objects.filter(id=job_id).first()
    if not job:
        return JsonResponse({"error": "Job not found"}, status=404)
    applicants = Applicant.objects.filter(job=job)
    data = [
        {
            "id": a.id,
            "name": a.name,
            "email": a.email,
            "resume_link": a.resume_link,
            "applied_at": a.applied_at
        } for a in applicants
    ]
    return JsonResponse(data, safe=False)

# --- Assignment 2: Blog + Comment System APIs ---
@csrf_exempt
@require_http_methods(["POST"])
def register(request):
    try:
        data = json.loads(request.body)
        if User.objects.filter(username=data["username"]).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)
        user = User.objects.create_user(
            username=data["username"],
            email=data["email"],
            password=data["password"]
        )
        return JsonResponse({"id": user.id, "message": "User registered"}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def user_login(request):
    try:
        data = json.loads(request.body)
        user = authenticate(username=data["username"], password=data["password"])
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Login successful"})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
@login_required
@require_http_methods(["POST"])
def create_post(request):
    try:
        data = json.loads(request.body)
        post = Post.objects.create(
            author=request.user,
            title=data["title"],
            content=data["content"]
        )
        return JsonResponse({"id": post.id, "message": "Post created"}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@require_http_methods(["GET"])
def posts(request):
    posts = Post.objects.select_related('author').all().order_by('-created_at')
    data = [
        {
            "id": p.id,
            "title": p.title,
            "author": p.author.username,
            "created_at": p.created_at
        } for p in posts
    ]
    return JsonResponse(data, safe=False)

@require_http_methods(["GET"])
def post_detail(request, id):
    post = Post.objects.filter(id=id).first()
    if not post:
        return JsonResponse({"error": "Post not found"}, status=404)
    comments = Comment.objects.filter(post=post).select_related('user')
    comment_list = [
        {
            "id": c.id,
            "user": c.user.username,
            "text": c.text,
            "created_at": c.created_at
        } for c in comments
    ]
    data = {
        "id": post.id,
        "title": post.title,
        "content": post.content,
        "author": post.author.username,
        "created_at": post.created_at,
        "comments": comment_list
    }
    return JsonResponse(data)

@csrf_exempt
@login_required
@require_http_methods(["POST"])
def add_comment(request, id):
    try:
        data = json.loads(request.body)
        post = Post.objects.filter(id=id).first()
        if not post:
            return JsonResponse({"error": "Post not found"}, status=404)
        comment = Comment.objects.create(
            post=post,
            user=request.user,
            text=data["text"]
        )
        return JsonResponse({"id": comment.id, "message": "Comment added"}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
