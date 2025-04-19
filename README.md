# 🌤️ Weather-Based Activity Suggester

A modern React.js application that fetches live weather data and creatively suggests activities based on the current weather conditions — all wrapped in a beautiful dark-themed UI with rich animations.

---

## ✨ Features

- 🌙 **Dark Theme UI** — Sleek interface with animated weather backgrounds  
- 📍 **Location Search** — Get weather data by entering any city  
- 📡 **Geolocation Support** — Auto-detect user location (with permission)  
- 🌡️ **Weather Display** — Temperature, condition, humidity, wind speed  
- 🎯 **Activity Suggestions** — Creative activity ideas based on real-time weather  
- ⭐ **Favorites** — Save favorite locations with `localStorage`  
- 📱 **Responsive Design** — Works perfectly on desktop and mobile  
- 📤 **Share Feature** — Share weather and activity with friends  
- 👍 **Like/Dislike Activities** — Rate ideas to improve suggestions  
- 🌀 **Animations** — Beautiful transitions with Framer Motion  

---

## 🧰 Technologies Used

| Tech              | Purpose                           |
|------------------|-----------------------------------|
| **React.js**      | Frontend UI framework             |
| **Next.js**       | SSR and routing                   |
| **Tailwind CSS**  | Utility-first styling             |
| **Framer Motion** | Animations                        |
| **shadcn/ui**     | Beautiful, accessible UI elements |
| **Lucide React**  | Icon set                          |
| **OpenWeatherMap API** | Real-time weather data       |
| **localStorage**  | Save favorite cities              |

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v14+)
- npm or yarn
- OpenWeatherMap API key (already included in code)

### 📥 Installation

```bash
git clone https://github.com/yourusername/weather-activity-suggester.git
cd weather-activity-suggester

# Install dependencies
npm install
# or
yarn install

# Run locally
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🌐 Deployment to Vercel

### 1. Create a Vercel Account

- Go to [vercel.com](https://vercel.com) and sign up

### 2. Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/weather-activity-suggester.git
git push -u origin main
```

### 3. Import to Vercel

- In Vercel, click **"Add New" > "Project"**
- Import your GitHub repo
- Vercel auto-detects Next.js — no extra config needed
- Click **Deploy**

### 4. (Optional) Custom Domain

- In project settings > Domains > Add your custom domain

---

## 🧑‍💻 VS Code Setup (Optional but Recommended)

### 🔌 Recommended Extensions

- 🎨 **One Dark Pro** — Dark theme  
- 🧠 **Tailwind CSS IntelliSense** — Tailwind support  
- ⚛️ **ES7+ React Snippets** — React shortcut snippets  

### ⚙️ VS Code Settings (Optional)

```json
{
  "editor.formatOnSave": true,
  "files.autoSave": "onWindowChange",
  "workbench.colorTheme": "One Dark Pro"
}
```

---

## 🗂️ Project Structure

```
weather-activity-suggester/
├── app/                  # Next.js App Router
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── activity-suggestions.tsx
│   ├── animated-title.tsx
│   ├── error-display.tsx
│   ├── favorite-locations.tsx
│   ├── loading-spinner.tsx
│   ├── search.tsx
│   ├── theme-provider.tsx
│   ├── ui/
│   │   ├── weather-background.tsx
│   │   └── weather-display.tsx
├── hooks/                # Custom React hooks
│   └── use-geolocation.tsx
├── public/               # Static assets
└── README.md             # Project documentation
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/)
- [shadcn/ui](https://ui.shadcn.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---


