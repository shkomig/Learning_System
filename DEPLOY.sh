#!/bin/bash

# Math Learning System - Quick Deploy Script
# ==========================================

echo "🚀 Starting deployment..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Must run from project root directory"
    exit 1
fi

echo "${BLUE}📦 Step 1: Building Frontend${NC}"
cd frontend
npm install
npm run build

if [ $? -eq 0 ]; then
    echo "${GREEN}✅ Frontend built successfully${NC}"
else
    echo "❌ Frontend build failed"
    exit 1
fi

cd ..

echo ""
echo "${BLUE}📦 Step 2: Building Backend${NC}"
cd backend
npm install
npx prisma generate
npm run build

if [ $? -eq 0 ]; then
    echo "${GREEN}✅ Backend built successfully${NC}"
else
    echo "❌ Backend build failed"
    exit 1
fi

cd ..

echo ""
echo "${GREEN}🎉 Build completed successfully!${NC}"
echo ""
echo "${YELLOW}Next steps:${NC}"
echo "1. Configure production environment variables"
echo "2. Deploy frontend/dist to your hosting"
echo "3. Deploy backend to your server"
echo "4. Run database migrations: cd backend && npx prisma migrate deploy"
echo "5. Seed production data: cd backend && npm run prisma:seed"
echo ""
echo "For detailed instructions, see DEPLOYMENT_READY.md"


