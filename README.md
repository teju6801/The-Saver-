# 🐶 The Saver – Pet Adoption Platform

The Saver is a full-stack dog rescue and adoption platform where users can:

- Adopt dogs 🐕
- Report lost & found dogs 📍
- Donate via UPI 💰
- Read blogs 📝
- Admin manages everything 🔐

---

## 🚀 Tech Stack

```
Frontend: Next.js 16 + TypeScript + Tailwind CSS + React Hook Form + Zod
Backend: Firebase (Firestore + Auth + Storage)
Images: Cloudinary 
Maps: Leaflet + OpenStreetMap + React-Leaflet
Charts: Recharts
QR: QRCode.js
Email: Resend
```

---

## ✨ Features

- **Dog Adoption System**: Browse/filter/adopt with admin approval
- **Lost & Found**: Geolocation map reporting
- **Donation System**: UPI QR + admin tracking
- **Blog System**: Admin CRUD for content
- **Admin Dashboard**: Full management (dogs, requests, donations, blogs, lost-found)
- **Image Upload**: Cloudinary integration
- **Responsive Design**: Mobile-first Tailwind

---

## ⚙️ Installation - All Commands

### 1. Clone the Repository

```bash
git clone https://github.com/teju6801/The-Saver-.git
cd The-Saver-
```

### 2. Environment Setup (Required for Firebase + Cloudinary)

Copy example env:

```bash
cp .env.example .env.local
```

**Edit `.env.local` with your credentials:**

**Firebase** (Firebase Console → Project Settings → Your apps → Web SDK):
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAPXlNJeKkQ740hgHf3ucYtXb_rtmPzGNU  
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dog-chairty.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dog-chairty
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dog-chairty.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=867336568841
NEXT_PUBLIC_FIREBASE_APP_ID=1:867336568841:web:e2354ef46d38bb78ec78d8
```

**Cloudinary** (Dashboard → Account Details):
```
CLOUDINARY_CLOUD_NAME=dcaxtwrjb
CLOUDINARY_API_KEY=145952117923266  
CLOUDINARY_API_SECRET=m-fBF89WMeTjNrk3DKstM5TLoPw
```

### 3. Install Dependencies

```bash
npm install
# or npm ci (for clean install)
```

### 4. Run Development Server

```bash
npm run dev
```

**Open:** http://localhost:3000

**Other Scripts:**
```bash
npm run build    # Production build
npm start        # Production server
npm run lint     # Code linting
```

---

## 🤖 Quick BLACKBOXAI Setup Prompt

**Copy-paste this exact prompt to auto-setup everything:**

```
BLACKBOXAI, completely setup The Saver project:
1. cp .env.example .env.local 
2. Fill Firebase keys for project 'dog-chairty' (use config from lib/firebase.ts)
3. Add my Cloudinary: cloud_name=dcaxtwrjb, api_key=145952117923266, api_secret=m-fBF89WMeTjNrk3DKstM5TLoPw
4. npm ci
5. npm run dev
Confirm Firebase connects, Cloudinary uploads work, admin/maps/donations functional.
Keep dev server running.
```

---

## 📁 Project Structure

```
app/                 # Next.js 16 App Router (pages + API)
├── admin/           # Protected admin dashboard
├── adopt/           # Dog adoption pages
├── blog/            # Blog posts
├── donate/          # UPI donations
└── lost-found/      # Map-based lost dog reports

components/          # Reusable UI
lib/                 # Firebase, Cloudinary, utils
hooks/               # useDogs, useBlogPosts, etc.
types/               # TypeScript interfaces
public/              # Images, UPI QR code
```

---




2. **Manual Build:**
```bash
npm run build
npm start
```

---

## 🔐 Admin Access

- Route: `/admin`
- Login: Firebase Auth (email/password)
- Features: Manage dogs, adoption requests, donations, blogs, lost-found

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing`
5. Open Pull Request

---

## 📞 Support

- Issues: [GitHub Issues](https://github.com/teju6801/The-Saver-.git/issues)
- Demo: http://localhost:3000

⭐ **Star this repo if it helps!**
