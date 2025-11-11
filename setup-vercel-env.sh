#!/bin/bash

# Vercel Production Environment Variables Setup Script
# This script helps you set environment variables for production on Vercel
# 
# USAGE:
# bash setup-vercel-env.sh
#
# NOTE: This script requires the Vercel CLI to be installed:
# npm install -g vercel

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║                 Vercel Production Environment Setup                         ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "   npm install -g vercel"
    exit 1
fi

echo "✓ Vercel CLI found"
echo ""

# Define production environment variables
echo "📝 Setting up production environment variables..."
echo ""

# Critical variables
VARS=(
    "DB_URL:mongodb://mongo:dwgsKvMSlfRFpdWFTVCkjhElACYSECDl@shuttle.proxy.rlwy.net:47163"
    "NEXTAUTH_SECRET:ff39b85c4ec7d2a97c240ba4e9a1db27630e9f3ce02731e5e4622d6bcf9c74e7"
    "NEXTAUTH_URL:https://antuf.org"
    "NEXTAUTH_URL_INTERNAL:https://antuf.org"
    "ADMIN_EMAIL:your-admin-email@example.com"
    "GOOGLE_CLIENT_ID:349121129295-44pcbd13jl3qfcf1lqakn5jjckmtri9r.apps.googleusercontent.com"
    "GOOGLE_CLIENT_SECRET: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"
    "GOOGLE_API_KEY:AIzaSyA9WDyVexsB7Ezcf4BW51reOHIU3H0n6fg"
    "GITHUB_CLIENT_ID:Ov23liHhOrNTMMlMppZW"
    "GITHUB_CLIENT_SECRET:ecfbc0376fd624e53a227e522cc3095f258173b6"
    "CLOUDINARY_CLOUD_NAME:dfu758f7t"
    "CLOUDINARY_API_KEY:716736663386284"
    "CLOUDINARY_API_SECRET:Tp89Vv77JsiXImfpRvifX1y1pKQ"
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:pk_test_51RYghWI1GT4gvU5DAuYW7o5SuuVIonB1Mhb48jTw48wDlVOUjDVvjGmgWGxseXvfrbRiRW9THFKeQCay3WsxyYpk007H6JvwWi"
    "STRIPE_SECRET_KEY:sk_test_51SE8BUI842Eoe4ZfcoDAWqlAdrDac9ch09GrWrbv18vzY1cR14z3oP7SO6bUTMurTHxecZCEZxghKFOtxaCVEqbq00iMeP941O"
    "STRIPE_WEBHOOK_SECRET:your_stripe_webhook_secret_here"
    "NEXT_PUBLIC_JUDGE0_API_KEY:bed7cbad0emsh3064b3ad56470aap1b3ea1jsn58e572615934"
    "NEXT_PUBLIC_RECAPTCHA_SITE_KEY:6LfcX_QrAAAAAONk16hPK676Wga-N9tHlFSf-D5F"
    "RECAPTCHA_SECRET_KEY:6LfcX_QrAAAAAF8oIdu10tJjMtE7_rYlM6Wn77-h"
    "NEXT_PUBLIC_STREAM_API_KEY:c9587tt8muyq"
    "STREAM_API_SECRET:yewhg673tgx7txb5quwj4jsprurxkaqqptttjzm3b5yfrf5mux6ts5yvhb28pjqa"
)

# Note: We need to use the manual approach since Vercel CLI's env set command has limitations
echo "NOTE: The Vercel CLI approach has limitations. We recommend using the Vercel Dashboard instead."
echo ""
echo "✅ Here's what to do:"
echo ""
echo "1. Go to: https://vercel.com/dashboard/antuf/settings/environment-variables"
echo ""
echo "2. For each of these variables, click 'Add New' and fill in:"
echo ""

# Display the variables
for i in "${!VARS[@]}"; do
    var="${VARS[$i]}"
    name="${var%:*}"
    value="${var#*:}"
    
    # Color code based on importance
    if [[ "$name" == "DB_URL" ]] || [[ "$name" == "NEXTAUTH_SECRET" ]] || [[ "$name" == "NEXTAUTH_URL" ]]; then
        echo "   🔴 CRITICAL: $name"
    else
        echo "   🟡 OPTIONAL: $name"
    fi
    echo "      Value: $value"
    echo ""
done

echo "3. Make sure to select 'Production' for Environment"
echo ""
echo "4. Click 'Add' or 'Save' after each variable"
echo ""
echo "5. Wait 3-5 minutes for automatic redeploy"
echo ""
echo "6. Verify at: https://antuf.org"
echo ""

# Alternative: Try to use Vercel CLI if available
echo "════════════════════════════════════════════════════════════════════════════════"
echo ""
echo "Alternative: If you have Vercel CLI and want to automate this..."
echo ""
echo "Run these commands (replace PROJECT_ID and TEAM_ID with your values):"
echo ""

for var in "${VARS[@]}"; do
    name="${var%:*}"
    value="${var#*:}"
    echo "vercel env add $name --production"
done

echo ""
echo "════════════════════════════════════════════════════════════════════════════════"
echo ""
echo "✨ Setup guide complete!"
echo ""
echo "📖 For more details, see:"
echo "   - README_SLIDER_FIX.md"
echo "   - ACTION_CHECKLIST.md"
echo "   - docs/SLIDER_PRODUCTION_SOLUTION.md"
echo ""
