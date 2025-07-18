# Alumni Room Mobile App

A React Native mobile application for the Kanchenjunga Alumni House booking system, built with Expo.

## Features

- **Home Screen**: Hero section, features showcase, and reviews
- **Rooms Listing**: Browse available rooms with search and filtering
- **Room Details**: Detailed view with image gallery, amenities, and pricing
- **Authentication**: Login and registration system
- **Profile Management**: User profile and account settings
- **About Page**: Information about Kanchenjunga Alumni House

## Technology Stack

- **React Native** with **Expo**
- **TypeScript** for type safety
- **Expo Router** for navigation
- **Redux Toolkit** with **RTK Query** for state management
- **React Query** for server state management
- **AsyncStorage** for local data persistence
- **Expo Linear Gradient** for UI enhancements

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Expo CLI: `npm install -g @expo/cli`
- Expo Go app on your mobile device

### Installation

1. Navigate to the mobile app directory:

   ```bash
   cd alumni-room-mobile
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update package versions for compatibility:

   ```bash
   npx expo install --fix
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Scan the QR code with Expo Go app (Android) or Camera app (iOS)

## Project Structure

```
alumni-room-mobile/
├── app/                    # App screens with Expo Router
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── index.tsx      # Home screen
│   │   ├── rooms.tsx      # Rooms listing
│   │   ├── about.tsx      # About page
│   │   └── profile.tsx    # Profile screen
│   ├── auth.tsx           # Authentication modal
│   ├── room/[id].tsx      # Room details screen
│   └── _layout.tsx        # Root layout
├── store/                 # Redux store and API
│   ├── features/
│   │   └── rooms.ts       # Rooms API slice
│   ├── AuthContext.tsx    # Authentication context
│   ├── baseApi.ts         # Base API configuration
│   └── index.ts           # Store configuration
├── assets/                # Static assets
└── package.json
```

## Key Features Implementation

### Navigation

- Tab-based navigation for main screens
- Stack navigation for detailed views
- Modal presentation for authentication

### State Management

- Redux Toolkit for global state
- RTK Query for API calls and caching
- React Context for authentication state
- AsyncStorage for token persistence

### API Integration

- RESTful API integration with the backend
- Automatic token management
- Error handling and loading states
- Optimistic updates for better UX

### UI/UX

- Native mobile components
- Responsive design for different screen sizes
- Smooth animations and transitions
- Platform-specific styling

## Backend Integration

The app connects to the same backend API as the Next.js web application:

- **Base URL**: `http://localhost:5000`
- **Authentication**: Cookie-based sessions
- **Endpoints**: Rooms, bookings, reviews, user management

Make sure the backend server is running on `localhost:5000` for the mobile app to work properly.

## Development Commands

```bash
# Start development server
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator (macOS only)
npm run ios

# Run in web browser
npm run web

# Build for production
npm run build
```

## Platform Support

- **iOS**: Requires iOS 11.0 or later
- **Android**: Requires Android 5.0 (API level 21) or later
- **Web**: Modern browsers with ES6 support

## Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=http://localhost:5000
```

## Future Enhancements

- Push notifications for booking confirmations
- Offline support for viewing booked rooms
- In-app payments integration
- Photo upload for user profiles
- Dark mode support
- Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both iOS and Android
5. Submit a pull request

## License

This project is part of the Alumni Room booking system for JGEC.
