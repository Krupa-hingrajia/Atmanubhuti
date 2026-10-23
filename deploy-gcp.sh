#!/usr/bin/env bash
# ==============================================================================
# Atmanubhuti Vedic Platform - Google Cloud Run Deployment Script
# ==============================================================================

set -e

# Configuration
REGION="asia-southeast1" # Singapore (supports Custom Domain Mappings)
SERVICE_NAME="atmanubhuti-web"

echo "🪔 ======================================================"
echo "   ATMANUBHUTI - Google Cloud Run Deployment Setup"
echo "=========================================================="

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud SDK (gcloud) is not installed."
    echo "👉 Please install it from: https://cloud.google.com/sdk/docs/install"
    echo "   Or on macOS via Homebrew: brew install --cask google-cloud-sdk"
    exit 1
fi

# Get GCP Project ID
PROJECT_ID=$(gcloud config get-value project 2> /dev/null)
if [ -z "$PROJECT_ID" ]; then
    echo "⚠️ No default GCP project found."
    read -p "Enter your Google Cloud Project ID: " PROJECT_ID
    gcloud config set project "$PROJECT_ID"
fi

echo "✅ Active GCP Project: $PROJECT_ID"
echo "✅ Deployment Region: $REGION (Mumbai)"

# Enable required Google Cloud APIs
echo "📦 Enabling required Google Cloud APIs (Cloud Run, Cloud Build, Artifact Registry)..."
gcloud services enable \
    run.googleapis.com \
    cloudbuild.googleapis.com \
    artifactregistry.googleapis.com \
    firestore.googleapis.com

# Build container using Google Cloud Build (no local Docker required!)
echo "🔨 Building container image directly on Google Cloud Build..."
IMAGE_TAG="gcr.io/$PROJECT_ID/$SERVICE_NAME:latest"

gcloud builds submit --tag "$IMAGE_TAG"

# Deploy to Google Cloud Run
echo "🚀 Deploying to Google Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
    --image "$IMAGE_TAG" \
    --platform managed \
    --region "$REGION" \
    --allow-unauthenticated \
    --set-env-vars NODE_ENV=production,AUTH_SECRET=atmanubhuti_sacred_secret_key_89218931289 \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10

# Fetch Service URL
SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" --platform managed --region "$REGION" --format 'value(status.url)')

echo ""
echo "🎉 DEPLOYMENT SUCCESSFUL!"
echo "🌐 Live Cloud Run URL: $SERVICE_URL"
echo ""
echo "=========================================================="
echo "👉 NEXT STEP: Custom Domain Mapping (GoDaddy / Hostinger)"
echo "Run: gcloud beta run domain-mappings create --service $SERVICE_NAME --domain YOUR_DOMAIN.com --region $REGION"
echo "=========================================================="
