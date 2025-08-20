import MapboxGL from '@rnmapbox/maps';
import Constants from 'expo-constants';

// Read public token from Expo extra or EXPO_PUBLIC_ env var
const tokenFromExtra = (Constants?.expoConfig as any)?.extra?.mapboxPublicToken as string | undefined;
const tokenFromEnv = process.env.EXPO_PUBLIC_MAPBOX_TOKEN as string | undefined;
const accessToken = tokenFromExtra || tokenFromEnv;

if (!accessToken) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Mapbox] Public token not set. Set expo.extra.mapboxPublicToken in app.json or EXPO_PUBLIC_MAPBOX_TOKEN in your env.'
  );
} else {
  MapboxGL.setAccessToken(accessToken);
}

// Optional: reduce noise
try {
  MapboxGL.setTelemetryEnabled(false);
} catch {}

export default MapboxGL;
