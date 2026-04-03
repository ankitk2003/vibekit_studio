# VibeKit Studio 🎨

**Generate a theme, build a mini-site, publish it.** A full-stack web app for creating beautiful, personalized pages with no coding required.

## 🚀 Features

- 🎯 **6+ Design Themes**: Choose from Minimal, Neo-Brutal, Dark Neon, Pastel Soft, Luxury Serif, Retro Pixel, and Editorial
- 📝 **Page Builder**: Live preview with responsive device toggles (Mobile, Tablet, Desktop)
- 🎨 **CSS Variables**: Theme system with design tokens for consistent styling
- 📱 **Fully Responsive**: Mobile-first design that works beautifully at 320px, 768px, and 1280px+
- 🔐 **Secure Auth**: Email/password authentication with bcrypt hashing and JWT httpOnly cookies
- 🌐 **Public Publishing**: Share your pages with unique URLs like `/p/:slug`
- 📊 **View Tracking**: Track how many times your page has been viewed
- 💌 **Contact Forms**: Built-in contact form integration with database persistence

## 🛠️ Tech Stack

**Frontend:**
- React 19.2.4
- React Router 7.13.2
- Tailwind CSS 3.4.19
- Zustand (State Management)
- Vite

**Backend:**
- Netlify Functions (Serverless)
- Node.js
- PostgreSQL (Supabase)
- Drizzle ORM
- bcryptjs & JWT

## 📋 Prerequisites

- Node.js 16+ and npm
- Git
- Netlify account (for deployment)
- PostgreSQL database (Supabase free tier works great)

## 🚀 Local Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd vibekit_studio
```

### 2. Set Up Environment Variables

**Server** (create `server/.env`):
```
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Client** (no `.env` needed - uses relative URLs)

### 3. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Set Up Database

```bash
cd server

# Run Drizzle migrations
npx drizzle-kit push:pg

# (Optional) Seed database with test data
npm run seed
```

### 5.  Run Development Servers

**Terminal 1 - Backend (Netlify Functions)**:
```bash
cd server
npm run dev  # Runs: npx netlify dev
```

**Terminal 2 - Frontend (Vite)**:
```bash
cd client
npm run dev  # Runs on http://localhost:5173
```

## 📚 API Endpoints

### Authentication
- `POST /.netlify/functions/auth/signup` - Create account
- `POST /.netlify/functions/auth/login` - Login
- `POST /.netlify/functions/auth/logout` - Logout
- `GET /.netlify/functions/auth/verify` - Verify auth from httpOnly cookie

### Pages (Authenticated)
- `GET /.netlify/functions/pages/list` - Get user's pages
- `POST /.netlify/functions/pages/create` - Create new page
- `GET /.netlify/functions/pages/detail?id=...` - Get page details
- `PUT /.netlify/functions/pages/detail?id=...` - Update page
- `DELETE /.netlify/functions/pages/detail?id=...` - Delete page
- `POST /.netlify/functions/pages/publish?id=...` - Toggle publish status
- `POST /.netlify/functions/pages/duplicate?id=...` - Duplicate page

### Public Pages
- `GET /.netlify/functions/public/page?slug=...` - View published page
- `POST /.netlify/functions/public/track-view?slug=...` - Track page view
- `POST /.netlify/functions/public/contact?slug=...` - Submit contact form

## 📁 Project Structure

```
vibekit_studio/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── PageBuilder.jsx      # Main editor
│   │   │   ├── PageSections.jsx     # Hero, Features, Gallery, Contact
│   │   │   ├── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx       # /app - page list & create
│   │   │   ├── PublishedPage.jsx   # /p/:slug - public view
│   │   ├── store/
│   │   │   └── authStore.js        # Zustand auth store
│   │   ├── themes/
│   │   │   └── themeConfig.js      # 6+ themes with CSS variables
│   │   └── App.jsx
│   └── package.json
│
├── server/                          # Node backend & Netlify Functions
│   ├── netlify/
│   │   └── functions/
│   │       ├── auth/               # Authentication endpoints
│   │       ├── pages/              # Page CRUD endpoints
│   │       └── public/             # Public page endpoints
│   ├── db/
│   │   ├── index.js               # Database connection
│   │   ├── schema.js              # Drizzle schema (users, pages, contactSubmissions)
│   │   └── utils/
│   │       ├── jwt.js             # Token generation & verification
│   │       └── password.js        # bcrypt utilities
│   ├── netlify.toml               # Netlify configuration
│   ├── drizzle.config.ts          # Drizzle kit config
│   └── package.json
│
└── README.md
```

## 🎨 Theme System

Each theme defines:
- **Colors**: background, surface, text, accent, borders
- **Typography**: font families, weights
- **Spacing**: xs, sm, md, lg, xl, xxl
- **Radius**: sm, md, lg, full
- **Button Styles**: solid, outline, with shadows or glows

Themes are stored as CSS variables: `--vk-bg`, `--vk-accent`, etc.

### Available Themes
1. **Minimal** - Clean, minimalist aesthetic
2. **Neo-Brutal** - Bold, brutalist design with thick borders
3. **Dark Neon** - Cyberpunk vibes with neon accents
4. **Pastel Soft** - Soft colors with rounded corners
5. **Luxury Serif** - Elegant, sophisticated serif design
6. **Retro Pixel** - Pixel art inspired retro theme
7. **Editorial** - Magazine-style layout

## 📱 Responsiveness

All components are mobile-first and tested at:
- **Mobile**: 320px-480px
- **Tablet**: 768px-1024px
- **Desktop**: 1280px+

The page builder includes device preview toggles to test layouts.

## 🔐 Security

- ✅ Passwords hashed with bcryptjs (salt 10)
- ✅ JWT tokens stored in httpOnly cookies (not accessible to JavaScript)
- ✅ CORS headers configured for cross-origin requests
- ✅ Database credentials in environment variables (.env not committed)
- ✅ Server-side ownership validation on all authenticated endpoints
- ✅ Input validation on all endpoints

## 📝 Database Schema

### Users
- `id` (UUID, PK)
- `email` (text, unique)
- `name` (text, optional)
- `passwordHash` (text)
- `createdAt` (timestamp)

### Pages
- `id` (UUID, PK)
- `userId` (UUID, FK → users)
- `title` (text)
- `slug` (text, unique)
- `status` (enum: draft | published)
- `theme` (text)
- `content` (JSONB - sections array)
- `viewCount` (integer)
- `createdAt`, `updatedAt` (timestamps)

### ContactSubmissions
- `id` (UUID, PK)
- `pageId` (UUID, FK → pages)
- `name`, `email`, `message` (text)
- `submittedAt` (timestamp)

## 🚀 Deployment to Netlify

### 1. Connect Repository
```bash
netlify connect  # or use Netlify dashboard
```

### 2. Configure Build
```bash
# Set build command in Netlify dashboard
npm install && npm run build

# Build folder: dist
# Function folder: server/netlify/functions
```

### 3. Set Environment Variables
In Netlify dashboard → Site settings → Build & deploy → Environment:
```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### 4. Deploy
```bash
netlify deploy --prod
```

## 📸 How to Use

### For End Users
1. **Sign Up** - Create account with email/password
2. **Create Page** - Click "Create New Page" on dashboard
3. **Choose Theme** - Select from 6+ design themes
4. **Edit Content** - Edit sections: Hero, Features, Gallery, Contact
5. **Preview** - Toggle between mobile/tablet/desktop views
6. **Publish** - Make page public with shareable URL
7. **Share** - Share `/p/:slug` link with others

### API Usage Example (cURL)

**Create Page:**
```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/pages/create \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=your_token" \
  -d '{"title":"My Page","theme":"minimal"}'
```

**Get Published Page:**
```bash
curl https://your-site.netlify.app/.netlify/functions/public/page?slug=my-page
```

## 🛠️ Development Tips

### Add a New Theme
Edit `client/src/themes/themeConfig.js` and add to `THEMES` object:
```javascript
"my-theme": {
  name: "My Theme",
  colors: { /* ... */ },
  typography: { /* ... */ },
  // ...
}
```

### Add a New Page Section
1. Create component in `client/src/components/PageSections.jsx`
2. Add to switch statement in `PageBuilder.jsx`
3. Add to default content in `server/netlify/functions/pages/create.js`

### Debug Netlify Functions
```bash
cd server
netlify dev --debug
```

View logs in browser console when accessing localhost:8888

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
npm install  # Reinstall dependencies
rm -rf node_modules package-lock.json  # Clean install
npm install
```

### Database connection fails
- Check `DATABASE_URL` format: `postgresql://user:pass@host:port/db`
- Verify database is running
- Check network access (Supabase requires allowed IPs)

### Build fails
```bash
cd client
npm run build  # Test build locally first
```

### Functions not found (404)
- Check `netlify.toml` has correct `functions` path
- Verify file names match URL structure
- Check `netlify dev` is showing functions

## 📊 Tradeoffs & Future Improvements

### What We Prioritized ✅
1. **Core MVP functionality** - Focus on auth, page builder, publishing
2. **Design quality** - Polished UI with 6+ themes
3. **Mobile responsiveness** - First-class mobile experience
4. **Security** - Proper password hashing, JWT auth, httpOnly cookies
5. **Database persistence** - PostgreSQL with proper schema

### What We'd Improve Next 🔄
1. **Email notifications** - Send contact form submissions to user email
2. **Advanced editor features** - Drag-drop reordering, rich text, custom CSS
3. **Analytics dashboard** - Detailed view stats, traffic insights
4. **Image uploads** - Replace placeholder URLs with user uploads
5. **Team collaboration** - Share pages with collaborators
6. **SEO optimization** - Meta tags, sitemaps, OG preview
7. **Caching & performance** - CDN, service workers, aggressive caching
8. **Social auth** - Google/GitHub login as alternative to email
9. **Custom domains** - Allow users to use custom domains
10. **Page analytics** - Track visitor behavior, heatmaps, form submissions

## 📞 Support

For issues, questions, or feature requests, please open an issue on GitHub.

---

**Made with ♥ for creators who want to build without code.**
