# Production Deployment Guide for https://antuf.org

## Current Status
✅ Code is ready for production
✅ Build passes successfully (122 static pages)
✅ Sliders have fallback demo (always displays)
✅ All API routes configured
✅ Environment variables ready

## Deployment Options

### Option 1: Deploy to Vercel (Recommended - Easiest)

#### Step 1: Connect GitHub to Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select repository: **tutorialsmaterial200/ANTUF**
4. Click "Import"

#### Step 2: Configure Environment Variables
In Vercel Project Settings → Environment Variables, add:

```
DB_URL=mongodb://mongo:dwgsKvMSlfRFpdWFTVCkjhElACYSECDl@shuttle.proxy.rlwy.net:47163
NEXTAUTH_SECRET=ff39b85c4ec7d2a97c240ba4e9a1db27630e9f3ce02731e5e4622d6bcf9c74e7
NEXTAUTH_URL=https://antuf.org
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
RAZORPAY_CLIENT_ID=your_razorpay_id
RAZORPAY_CLIENT_SECRET=your_razorpay_secret
PAYPAL_CLIENT_ID=your_paypal_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
```

#### Step 3: Configure Custom Domain
1. In Vercel Project Settings → Domains
2. Add domain: `antuf.org`
3. Point your domain DNS to Vercel nameservers (if needed)
4. Or add CNAME record pointing to your Vercel domain

#### Step 4: Click Deploy
Vercel will automatically build and deploy your application!

---

### Option 2: Deploy Using Vercel CLI

```bash
# Login to Vercel
vercel login

# Navigate to project directory
cd /Users/aasish/Project/antuf

# Deploy to production
vercel deploy --prod

# Or with custom domain
vercel deploy --prod --scope your-scope
```

---

### Option 3: Manual Deployment to Your Server

If hosting on your own server:

```bash
# Build the application
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start "npm start" --name "antuf"
pm2 save
pm2 startup
```

---

## Post-Deployment Checklist

After deployment, verify:

- [ ] Website loads at https://antuf.org
- [ ] Sliders display correctly (demo or real data)
- [ ] Login/authentication works
- [ ] Database connections are working
- [ ] API endpoints respond correctly
- [ ] Images load from Cloudinary
- [ ] SSL certificate is valid
- [ ] Mobile responsiveness works
- [ ] Payment gateways function properly
- [ ] Analytics/tracking working

---

## Monitoring & Maintenance

### Monitor Application
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub Repository: https://github.com/tutorialsmaterial200/ANTUF
- Database Status: Check MongoDB connection

### Update Sliders in Production
1. Go to admin dashboard: https://antuf.org/dashboard/admin/slider/create
2. Add new sliders with images
3. They'll automatically appear on homepage

### Troubleshooting

#### Sliders Not Showing
- Check database connection
- Verify `/api/sliders` endpoint responds
- Demo slider will show if API fails

#### Build Fails
- Check environment variables in Vercel
- Review build logs in Vercel dashboard
- Ensure all required env vars are set

#### Domain Issues
- Wait 24-48 hours for DNS propagation
- Clear browser cache
- Check domain DNS settings

---

## Auto-Deployment Setup

Configure auto-deployment on every git push:

1. Vercel automatically deploys on push to `main` branch
2. To disable: Project Settings → Git → Deployments
3. To rollback: Deployments tab → Select previous version

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| DB_URL | Yes | MongoDB connection string |
| NEXTAUTH_SECRET | Yes | Secret for NextAuth encryption |
| NEXTAUTH_URL | Yes | Production domain URL |
| GOOGLE_CLIENT_ID | Yes | Google OAuth credentials |
| GOOGLE_CLIENT_SECRET | Yes | Google OAuth credentials |
| STRIPE_SECRET_KEY | Yes | Stripe payment key |
| CLOUDINARY_CLOUD_NAME | Yes | Cloudinary media upload |
| RAZORPAY_CLIENT_ID | No | Indian payment gateway |
| PAYPAL_CLIENT_ID | No | PayPal integration |

---

## Performance Metrics (Production)

- **Build Time**: ~14 seconds
- **Pages Generated**: 122 static
- **Bundle Size**: ~104 KB (First Load)
- **Middleware**: 61.5 KB
- **SEO**: Optimized with Next.js

---

## Support & Help

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: https://github.com/tutorialsmaterial200/ANTUF/issues
- **Email**: Check project documentation

---

**Last Updated**: November 11, 2025
**Status**: Ready for Production ✅
