# Lumina - React Native Architecture Social Media App

A beautiful React Native social media app for architects and design enthusiasts to share, discover, and connect through architectural content.

## 🏗️ Features

### Core Functionality
- **Social Feed**: Browse posts from the architecture community
- **Post Types**: Support for text, image, and quote posts
- **Interactions**: Like, comment, share, and bookmark posts
- **Categories**: Explore content by architectural categories
- **User Profiles**: Complete user profiles with stats and posts grid
- **Activity Feed**: Real-time notifications and activity tracking
- **Create Posts**: Rich post creation with multiple content types

### Design & UX
- **Dark/Light Theme**: Seamless theme switching with persistent preferences
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Responsive Design**: Optimized for various screen sizes
- **Native Feel**: Platform-specific interactions and gestures

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Navigation**: React Navigation with tab and stack navigators
- **State Management**: Context API for theme management
- **AsyncStorage**: Persistent theme preferences
- **Mock Data**: Comprehensive mock data for demonstration

## 📱 Screens

### Main Screens
1. **Home Screen**: Main feed with hero section and posts
2. **Explore Screen**: Categories grid and trending content
3. **Create Screen**: Post creation with type selection
4. **Activity Screen**: Notifications and user activity
5. **Profile Screen**: User profile with stats and posts

### Detail Screens
1. **Post Detail Screen**: Full post view with comments
2. **Category Feed Screen**: Filtered posts by category

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
- **Expo Vector Icons** - Icon library
- **AsyncStorage** - Local data persistence

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LuminaApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📁 Project Structure

```
LuminaApp/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── Post.tsx        # Post component
│   ├── screens/            # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── ExploreScreen.tsx
│   │   ├── CreateScreen.tsx
│   │   ├── ActivityScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── PostDetailScreen.tsx
│   │   └── CategoryFeedScreen.tsx
│   ├── context/            # React Context providers
│   │   └── ThemeContext.tsx
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   └── data/               # Mock data and constants
│       └── mockData.ts
├── App.tsx                 # Main app component
├── package.json
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: #6366f1 (Indigo)
- **Gold**: #fbbf24 (Accent)
- **Success**: #10b981 (Green)
- **Error**: #ef4444 (Red)
- **Warning**: #f59e0b (Amber)

### Typography
- **Headings**: Bold, 18-32px
- **Body**: Regular, 14-16px
- **Captions**: Regular, 12-14px

### Spacing
- **Small**: 8px
- **Medium**: 16px
- **Large**: 24px
- **Extra Large**: 32px

## 🔧 Configuration

### Theme Configuration
The app uses a theme context that manages:
- Light/dark mode switching
- Color schemes
- Persistent theme preferences

### Navigation Configuration
- Bottom tab navigation for main screens
- Stack navigation for detail screens
- Custom tab bar styling

## 📊 Mock Data

The app includes comprehensive mock data:
- **Posts**: 6 sample posts with different content types
- **Categories**: 6 architectural categories
- **Users**: Sample user profiles and avatars
- **Comments**: Sample comments for posts
- **Activities**: Sample notification data

## 🚀 Deployment

### Building for Production

1. **Configure app.json**
   ```json
   {
     "expo": {
       "name": "Lumina",
       "slug": "lumina-app",
       "version": "1.0.0",
       "platforms": ["ios", "android"]
     }
   }
   ```

2. **Build the app**
   ```bash
   expo build:ios
   expo build:android
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Unsplash** for beautiful architectural photography
- **Expo** for the amazing development platform
- **React Native** community for excellent documentation

---

Built with ❤️ for the architecture community 