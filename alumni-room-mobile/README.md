# Alumni Room Mobile App

A React Native mobile application for the Alumni Room platform, allowing alumni to find and book accommodations from fellow alumni.

## Features

- **Home Screen**: Browse featured rooms, search functionality, and user testimonials
- **Search & Filters**: Advanced search with location, price range, and amenity filters
- **Room Details**: Detailed room information with image galleries, amenities, and reviews
- **Favorites**: Save and manage favorite rooms
- **User Authentication**: Secure login and registration
- **Profile Management**: User profile with booking history and settings
- **Booking System**: Easy room booking with confirmation
- **Reviews**: Read and write reviews for rooms
- **Responsive Design**: Optimized for both iOS and Android

## Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and toolchain
- **TypeScript**: Type-safe JavaScript
- **Redux Toolkit**: State management
- **RTK Query**: Data fetching and caching
- **Expo Router**: File-based routing
- **React Native Reanimated**: Smooth animations
- **Expo Vector Icons**: Icon library
- **React Native Safe Area Context**: Safe area handling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alumni-room-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

### Development with Expo Go

1. Install Expo Go on your mobile device
2. Scan the QR code from the terminal
3. The app will load on your device

## Project Structure

```
alumni-room-mobile/
├── app/                          # App routes (Expo Router)
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx            # Home screen
│   │   ├── search.tsx           # Search screen
│   │   ├── favorites.tsx        # Favorites screen
│   │   └── profile.tsx          # Profile screen
│   ├── auth/                    # Authentication screens
│   │   └── login.tsx            # Login screen
│   ├── room/                    # Room details
│   │   └── [id].tsx             # Dynamic room details
│   └── _layout.tsx              # Root layout
├── src/                         # Source code
│   ├── components/              # Reusable components
│   ├── store/                   # Redux store
│   │   ├── baseApi.ts           # API configuration
│   │   ├── AuthContext.tsx      # Authentication context
│   │   └── slices/              # Redux slices
│   ├── hooks/                   # Custom hooks
│   ├── utils/                   # Utility functions
│   └── constants/               # App constants
├── assets/                      # Static assets
└── package.json
```

## API Configuration

The app connects to a backend API. Update the base URL in `src/store/baseApi.ts`:

```typescript
const baseQuery = fetchBaseQuery({
  baseUrl: 'YOUR_API_BASE_URL', // Replace with your API URL
  prepareHeaders: async (headers) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
```

## State Management

The app uses Redux Toolkit for state management with the following slices:

- **Auth Slice**: User authentication state
- **Rooms Slice**: Room favorites and search filters
- **API Slice**: Data fetching and caching with RTK Query

## Authentication

User authentication is handled through:
- Secure token storage using Expo SecureStore
- JWT token-based authentication
- Protected routes with authentication checks
- Auto-login on app restart

## Navigation

The app uses Expo Router for navigation:
- **Tab Navigation**: Bottom tabs for main screens
- **Stack Navigation**: For detailed screens
- **Modal Navigation**: For overlays and forms

## Styling

- Consistent design system with predefined colors and spacing
- Responsive layouts that work on different screen sizes
- Modern UI components with shadows and rounded corners
- Dark mode support (can be extended)

## Key Components

### Home Screen
- Featured room carousel
- Search functionality
- User testimonials
- Quick access to features

### Search Screen
- Advanced filters (price, location, amenities)
- Real-time search results
- Favorite toggle functionality
- Sort options

### Room Details
- Image gallery
- Host information
- Amenities list
- Reviews section
- Booking functionality

### Profile Screen
- User information
- Authentication state management
- Navigation to other features
- Logout functionality

## Building for Production

### iOS

1. Configure app signing in Xcode
2. Build the app:
```bash
expo build:ios
```

### Android

1. Generate a signed APK:
```bash
expo build:android
```

## Environment Variables

Create a `.env` file in the root directory:

```env
API_BASE_URL=your_api_base_url
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.