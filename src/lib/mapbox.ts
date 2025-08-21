import MapboxGL from '@rnmapbox/maps';
import Constants from 'expo-constants';

// Read public token from Expo extra or EXPO_PUBLIC_ env var
const tokenFromExtra = (Constants?.expoConfig as any)?.extra?.mapboxPublicToken as string | undefined;
const tokenFromEnv = process.env.EXPO_PUBLIC_MAPBOX_TOKEN as string | undefined;
const accessToken = tokenFromExtra || tokenFromEnv;

// Initialize Mapbox with proper error handling
if (!accessToken || accessToken.includes('REPLACE_WITH')) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Mapbox] Public token not set or placeholder detected. Please set a valid Mapbox token in app.json or EXPO_PUBLIC_MAPBOX_TOKEN in your env.'
  );
  // Set a dummy token to prevent crashes during development
  MapboxGL.setAccessToken('pk.dummy_token_for_development');
} else {
  MapboxGL.setAccessToken(accessToken);
}

// Configure Mapbox settings
try {
  MapboxGL.setTelemetryEnabled(false);
  MapboxGL.setConnected(true);
} catch (error) {
  console.warn('[Mapbox] Configuration warning:', error);
}

export default MapboxGL;
