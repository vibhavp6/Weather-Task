# Weather-Based Activity Suggester

A React.js application that fetches weather data for a user-specified location and suggests creative activities based on the current weather conditions.

## Features

- **Dark Theme UI**: Beautiful dark-themed interface with animated weather backgrounds
- **Location Search**: Enter any city name to get current weather data
- **Geolocation**: Automatically detects user's location (with permission)
- **Weather Display**: Shows temperature, weather condition, humidity, and wind speed
- **Activity Suggestions**: Provides creative activity ideas based on current weather
- **Favorites**: Save your favorite locations for quick access
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Share Feature**: Share weather information and activity suggestions
- **Like/Dislike Activities**: Rate suggested activities to improve recommendations
- **Animations**: Beautiful animations throughout the interface

## Technologies Used

- **React.js**: Frontend library for building the user interface
- **Next.js**: React framework for server-side rendering and API routes
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for React
- **shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **OpenWeatherMap API**: For fetching weather data
- **Lucide React**: For beautiful, consistent icons
- **localStorage**: For saving favorite locations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (already included in the code)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/weather-activity-suggester.git
   cd weather-activity-suggester
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment to Vercel

### Steps to Deploy on Vercel

1. **Create a Vercel Account**:
   - Go to [vercel.com](https://vercel.com) and sign up for an account if you don't have one.
   - You can sign up using GitHub, GitLab, or Bitbucket.

2. **Push Your Code to GitHub**:
   - Create a new repository on GitHub.
   - Push your code to the repository:
     \`\`\`bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/yourusername/weather-activity-suggester.git
     git push -u origin main
     \`\`\`

3. **Import Your Repository to Vercel**:
   - Log in to your Vercel account.
   - Click on "Add New..." and select "Project".
   - Import your GitHub repository.
   - Vercel will automatically detect that it's a Next.js project.

4. **Configure the Project**:
   - Keep the default settings as Vercel automatically detects Next.js configurations.
   - Click "Deploy".

5. **Wait for Deployment**:
   - Vercel will build and deploy your application.
   - Once completed, you'll receive a URL for your deployed application.

6. **Custom Domain (Optional)**:
   - In your Vercel dashboard, go to your project settings.
   - Navigate to "Domains" and add your custom domain if you have one.

### VS Code Setup with Dark Theme

1. **Install VS Code Extensions**:
   - Install "One Dark Pro" theme for a dark background
   - Install "Tailwind CSS IntelliSense" for better Tailwind support
   - Install "ES7+ React/Redux/React-Native snippets" for React snippets

2. **Configure VS Code Settings**:
   - Open settings (Ctrl+,)
   - Search for "theme" and select "One Dark Pro" or any dark theme
   - Enable "Auto Save" for better development experience

3. **Set Up Project in VS Code**:
   - Open the project folder in VS Code
   - Open integrated terminal (Ctrl+`)
   - Run `npm install` to install dependencies
   - Run `npm run dev` to start the development server

## Project Structure

\`\`\`
weather-activity-suggester/
├── app/                # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── activity-suggestions.tsx
│   ├── animated-title.tsx
│   ├── error-display.tsx
│   ├── favorite-locations.tsx
│   ├── loading-spinner.tsx
│   ├── search.tsx
│   ├── theme-provider.tsx
│   ├── ui/             # UI components from shadcn/ui
│   ├── weather-background.tsx
│   └── weather-display.tsx
├── hooks/              # Custom React hooks
│   └── use-geolocation.tsx
├── public/             # Static assets
└── README.md           # Project documentation
\`\`\`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
