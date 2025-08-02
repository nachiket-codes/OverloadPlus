#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting deployment..."

# Step 1: Activate virtual environment
source ~/OverloadPlus/OP/backend/venv/bin/activate

# Step 2: Navigate to app directory
cd ~/OverloadPlus/OP/backend/app

# Step 3: Load environment variables
export $(grep -v '^#' .env | xargs)

# Step 4: Install/update dependencies
pip install -r ../requirements.txt

# Step 5: Run Alembic migrations
alembic upgrade head

# Step 6: Stop old Uvicorn process (if running)
pkill -f "uvicorn app.main:app" || echo "No existing Uvicorn process found."

# Step 7: Start FastAPI app with Uvicorn (in background)
nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 > uvicorn.log 2>&1 &

echo "✅ Deployment complete!"
