#!/bin/bash

# Event Networking App - Deployment Script
# This script automates the deployment process

echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Check if node is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

print_success "Node.js is installed"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "npm is installed"

# Install dependencies
print_info "Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Run tests (if available)
print_info "Running tests..."
npm test -- --passWithNoTests

if [ $? -eq 0 ]; then
    print_success "Tests passed"
else
    print_warning "Tests failed or not configured"
fi

# Build the application
print_info "Building application for production..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Check build size
BUILD_SIZE=$(du -sh build | cut -f1)
print_info "Build size: $BUILD_SIZE"

# Create deployment info file
cat > build/deployment-info.json << EOF
{
  "deploymentDate": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "version": "1.0.0",
  "buildSize": "$BUILD_SIZE",
  "environment": "production",
  "gitCommit": "$(git rev-parse --short HEAD 2>/dev/null || echo 'N/A')"
}
EOF

print_success "Deployment info created"

# Ask for deployment target
echo ""
print_info "Select deployment target:"
echo "1) GitHub Pages"
echo "2) Netlify"
echo "3) Vercel"
echo "4) Local test (serve build folder)"
echo "5) Skip deployment"
read -p "Enter choice (1-5): " choice

case $choice in
    1)
        print_info "Deploying to GitHub Pages..."
        npm run deploy
        if [ $? -eq 0 ]; then
            print_success "Deployed to GitHub Pages successfully"
        else
            print_error "GitHub Pages deployment failed"
        fi
        ;;
    2)
        print_info "For Netlify deployment:"
        print_info "1. Install Netlify CLI: npm install -g netlify-cli"
        print_info "2. Run: netlify deploy --prod --dir=build"
        ;;
    3)
        print_info "For Vercel deployment:"
        print_info "1. Install Vercel CLI: npm install -g vercel"
        print_info "2. Run: vercel --prod"
        ;;
    4)
        print_info "Starting local server..."
        npx serve -s build -p 5000
        ;;
    5)
        print_info "Skipping deployment"
        ;;
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

echo ""
print_success "Deployment process completed!"
print_info "Build folder is ready at: ./build"
print_info "You can deploy the build folder to any static hosting service"

# Create deployment checklist
cat > DEPLOYMENT_CHECKLIST.txt << EOF
📋 Pre-Deployment Checklist

✅ Dependencies installed
✅ Build completed successfully
✅ Build size: $BUILD_SIZE
✅ Deployment info created

🔧 Next Steps:
1. Test the build locally: npx serve -s build
2. Configure environment variables on hosting platform
3. Set up custom domain (if needed)
4. Configure SSL certificate
5. Set up analytics tracking
6. Configure error monitoring
7. Set up CI/CD pipeline (optional)

📝 Important URLs:
- Development: http://localhost:3000/campus-connect
- Production: [Your production URL]

🔗 Hosting Options:
- GitHub Pages: https://pages.github.com/
- Netlify: https://www.netlify.com/
- Vercel: https://vercel.com/
- AWS S3: https://aws.amazon.com/s3/
- Firebase Hosting: https://firebase.google.com/docs/hosting

EOF

print_success "Deployment checklist created: DEPLOYMENT_CHECKLIST.txt"

exit 0
