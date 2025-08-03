#!/bin/bash

echo "🚀 Building e-snapp for Vercel deployment..."

# Install dependencies
npm install

# Build the application
npm run build

# Copy assets to build directory
mkdir -p dist/public/assets
cp -r attached_assets/* dist/public/assets/ 2>/dev/null || true

# Ensure all files are in place
ls -la dist/
ls -la dist/public/

echo "✅ Build completed successfully!"