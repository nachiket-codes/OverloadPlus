#!/bin/bash

echo "==> Starting deployment script..."

# Step 1: Navigate to app directory
echo "==> Navigating to app directory..."
cd app || { echo "❌ Failed to change directory to app"; exit 1; }

# Step 2: Activate virtual environment
echo "==> Activating virtual environment..."
source ../venv/bin/activate || { echo "❌ Failed to activate virtual environment"; exit 1; }

# Step 3: Install dependencies
echo "==> Installing Python dependencies..."
pip install -r ../requirements.txt || { echo "❌ Failed to install dependencies"; exit 1; }

# Step 4: Run Alembic migrations
echo "==> Running Alembic migrations..."
alembic upgrade head || { echo "❌ Alembic migration failed"; exit 1; }

# Step 5: Kill existing Uvicorn processes
echo "==> Killing existing uvicorn processes (if any)..."
pkill -f "uvicorn" && echo "✅ Killed existing uvicorn processes" || echo "⚠️ No uvicorn process found"

# Step 6: Start Uvicorn
echo "==> Starting Uvicorn server..."
nohup uvicorn main:app --host 0.0.0.0 --port 8000 > uvicorn.log 2>&1 &

# Final message
if [ $? -eq 0 ]; then
  echo "✅ Uvicorn started successfully!"
else
  echo "❌ Failed to start Uvicorn"
  exit 1
fi

echo "==> Deployment script finished."
