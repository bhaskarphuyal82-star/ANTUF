# Vercel Deployment Guide

## Prerequisites
- GitHub account with repository access
- Vercel account (https://vercel.com)
- Environment variables configured in `.env.local`

## Step 1: Push Latest Changes to GitHub
```bash
git add -A
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 2: Connect to Vercel

### Option A: Using Vercel CLI (Recommended)
```bash
vercel login
cd /Users/aasish/Project/antuf
vercel link
```

### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Click "Import"

## Step 3: Configure Environment Variables

On Vercel Dashboard:
1. Go to your project
2. Settings → Environment Variables
3. Add all required variables:

### Required Variables:
```
DB_URL=mongodb://mongo:dwgsKvMSlfRFpdWFTVCkjhElACYSECDl@shuttle.proxy.rlwy.net:47163
NEXTAUTH_SECRET=ff39b85c4ec7d2a97c240ba4e9a1db27630e9f3ce02731e5e4622d6bcf9c74e7
NEXTAUTH_URL=https://your-domain.vercel.app
GOOGLE_CLIENT_ID=349121129295-44pcbd13jl3qfcf1lqakn5jjckmtri9r.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GITHUB_CLIENT_ID=Ov23liHhOrNTMMlMppZW
GITHUB_CLIENT_SECRET=ecfbc0376fd624e53a227e522cc3095f258173b6
CLOUDINARY_CLOUD_NAME=dfu758f7t
CLOUDINARY_API_KEY=716736663386284
CLOUDINARY_API_SECRET=Tp89Vv77JsiXImfpRvifX1y1pKQ
STRIPE_SECRET_KEY=sk_test_51SE8BUI842Eoe4ZfcoDAWqlAdrDac9ch09GrWrbv18vzY1cR14z3oP7SO6bUTMurTHxecZCEZxghKFOtxaCVEqbq00iMeP941O
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51RYghWI1GT4gvU5DAuYW7o5SuuVIonB1Mhb48jTw48wDlVOUjDVvjGmgWGxseXvfrbRiRW9THFKeQCay3WsxyYpk007H6JvwWi
NEXT_PUBLIC_JUDGE0_API_KEY=bed7cbad0emsh3064b3ad56470aap1b3ea1jsn58e572615934
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LfcX_QrAAAAAONk16hPK676Wga-N9tHlFSf-D5F
```

## Step 4: Deploy

### Using CLI:
```bash
vercel deploy --prod
```

### Using Dashboard:
- Deployments happen automatically when you push to `main` branch
- Check "Deployments" tab to see build progress

## Step 5: Update Domain Settings

1. Update `.env.local` NEXTAUTH_URL to your Vercel domain:
   ```
   NEXTAUTH_URL=https://your-project.vercel.app
   ```

2. Update Vercel environment variables with the new URL

3. Add custom domain (if applicable) in Vercel Settings

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure database connection is accessible from Vercel

### Sliders Not Loading
- Verify `/api/sliders` endpoint is working
- Check database connection in build logs
- Ensure MONGODB_URI is configured

### NextAuth Issues
- Update NEXTAUTH_URL to match deployment domain
- Verify OAuth credentials are correct
- Check callback URLs in OAuth provider settings

## Monitoring

After deployment:
1. Visit your Vercel deployment URL
2. Check browser console for errors
3. Review Vercel logs for backend issues
4. Monitor database connections

## Rollback

If deployment has issues:
```bash
vercel rollback
```

## Need Help?

- Vercel Docs: https://vercel.com/docs
- GitHub Issues: Check repository for known issues
- Vercel Support: https://vercel.com/support
