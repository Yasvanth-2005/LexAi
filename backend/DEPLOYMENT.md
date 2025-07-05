# Deploying Django Backend to Render

## Prerequisites

- A Render account (sign up at https://render.com)
- Your Django project ready for deployment

## Step 1: Prepare Your Repository

Make sure your backend folder contains:

- `requirements.txt` ✅
- `build.sh` ✅
- `manage.py` ✅
- `backend/settings.py` (updated for production) ✅

## Step 2: Deploy to Render

### 1. Create a New Web Service

1. Go to your Render dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository containing your Django project

### 2. Configure the Service

- **Name**: `lex-ai-backend` (or your preferred name)
- **Environment**: `Python 3`
- **Build Command**: `./build.sh`
- **Start Command**: `gunicorn backend.wsgi:application`

### 3. Set Environment Variables

Add these environment variables in Render:

```
SECRET_KEY=your-secure-secret-key-here
DEBUG=False
FRONTEND_URL=https://your-frontend-domain.com
```

### 4. Add PostgreSQL Database

1. Go to "New +" → "PostgreSQL"
2. Create a new PostgreSQL database
3. Copy the "External Database URL"
4. Add it as `DATABASE_URL` environment variable in your web service

## Step 3: Update Frontend

Once deployed, update your frontend API calls to use the new Render URL:

```javascript
// Replace all instances of:
fetch("http://localhost:8000/api/...");

// With:
fetch("https://your-backend-name.onrender.com/api/...");
```

## Step 4: Test Your Deployment

1. Visit your Render service URL
2. Test your API endpoints
3. Check that CORS is working with your frontend

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that `build.sh` is executable
2. **Database connection**: Ensure `DATABASE_URL` is set correctly
3. **CORS errors**: Add your frontend domain to `FRONTEND_URL`
4. **Static files**: Make sure `whitenoise` is in `MIDDLEWARE`

### Useful Commands:

```bash
# Check logs in Render dashboard
# Or use Render CLI if available

# Local testing with production settings
python manage.py runserver --settings=backend.settings
```

## Environment Variables Reference

| Variable       | Description                       | Required |
| -------------- | --------------------------------- | -------- |
| `SECRET_KEY`   | Django secret key                 | Yes      |
| `DEBUG`        | Debug mode (False for production) | Yes      |
| `DATABASE_URL` | PostgreSQL connection string      | Yes      |
| `FRONTEND_URL` | Your frontend domain for CORS     | Yes      |
