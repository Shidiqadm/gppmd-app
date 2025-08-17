# React Native Project Structure

This project follows **Atomic Design Pattern** and includes all the requested dependencies configured and ready to use.

## 📁 Project Structure

```
src/
├── components/           # UI Components (Atomic Design)
│   ├── atoms/           # Basic building blocks
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Text.tsx
│   │   ├── Icon.tsx
│   │   ├── Image.tsx
│   │   └── Spinner.tsx
│   ├── molecules/       # Combinations of atoms
│   │   └── FormField.tsx
│   ├── organisms/       # Complex components
│   │   └── (ready for your components)
│   └── templates/       # Page layouts
│       └── (ready for your templates)
├── store/               # State Management (Zustand)
│   └── useAppStore.ts   # Main app store with user, settings, loading states
├── services/            # API Services (React Query + Axios)
│   └── userService.ts   # Example user service with React Query hooks
├── lib/                 # Utilities
│   └── api.ts          # Axios configuration with interceptors
├── providers/           # Context Providers
│   └── ReactQueryProvider.tsx
└── screens/             # Screen Components
    └── ExampleScreen.tsx # Demo screen showing all dependencies
```

## 🚀 Configured Dependencies

### ✅ 1. React Native Navigation
- **Status**: Already installed and configured
- **Package**: `@react-navigation/native`, `@react-navigation/bottom-tabs`
- **Usage**: Expo Router is set up in `app/_layout.tsx`

### ✅ 2. Zustand (State Management)
- **Status**: Configured with persistence
- **Location**: `src/store/useAppStore.ts`
- **Features**:
  - User state management
  - App settings (theme, language, notifications)
  - Loading states
  - Persistent storage ready (AsyncStorage)

### ✅ 3. Atomic Design Pattern
- **Status**: Complete structure created
- **Components**: Atoms, Molecules, Organisms, Templates
- **Features**:
  - Reusable Button component with variants
  - Input component with validation
  - Typography system with Text component
  - Icon and Image components
  - Loading Spinner component

### ✅ 4. Axios (HTTP Client)
- **Status**: Configured with interceptors
- **Location**: `src/lib/api.ts`
- **Features**:
  - Request/Response interceptors
  - Error handling
  - Auth token management
  - Logging

### ✅ 5. React Query (Server State)
- **Status**: Configured with provider
- **Location**: `src/providers/ReactQueryProvider.tsx`
- **Features**:
  - Query client with optimized defaults
  - Example user service with hooks
  - Caching and background updates
  - Mutation handling

## 🎯 Usage Examples

### Using Zustand Store
```tsx
import { useAppStore, useUser } from '@/src/store/useAppStore';

const MyComponent = () => {
  const { setUser, logout } = useAppStore();
  const user = useUser();
  
  // Update user
  setUser({ name: 'John Doe', email: 'john@example.com' });
};
```

### Using React Query
```tsx
import { useCurrentUser, useLogin } from '@/src/services/userService';

const MyComponent = () => {
  const { data: user, isLoading } = useCurrentUser();
  const loginMutation = useLogin();
  
  const handleLogin = () => {
    loginMutation.mutate({ email, password });
  };
};
```

### Using Atomic Components
```tsx
import { Button, Input, Text } from '@/src/components/atoms';

const MyForm = () => (
  <View>
    <Text variant="h2">Login</Text>
    <Input label="Email" value={email} onChangeText={setEmail} />
    <Button title="Login" onPress={handleLogin} variant="primary" />
  </View>
);
```

## 🔧 Next Steps

1. **Navigation**: The navigation is already set up with Expo Router. You can add new screens in the `app/` directory.

2. **API Integration**: Update the `API_BASE_URL` in `src/lib/api.ts` with your actual API endpoint.

3. **Authentication**: The Zustand store and React Query are ready for auth implementation.

4. **Styling**: Consider adding a theme system or styled-components for consistent styling.

5. **Testing**: Add testing setup with Jest and React Native Testing Library.

## 📱 Demo Screen

Check out `src/screens/ExampleScreen.tsx` to see all dependencies working together:
- Zustand state management
- React Query data fetching
- Atomic design components
- Form handling with validation

The project is now ready for development! 🎉
