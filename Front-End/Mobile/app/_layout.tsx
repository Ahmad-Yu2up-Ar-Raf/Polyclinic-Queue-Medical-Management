// File: app/_layout.tsx
import '@/global.css';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useFonts } from 'expo-font';
import Provider from '@/components/provider/provider';
import { Figtree_300Light } from '@expo-google-fonts/figtree';
import { Figtree_400Regular } from '@expo-google-fonts/figtree/400Regular';
import { Figtree_500Medium } from '@expo-google-fonts/figtree/500Medium';
import { Figtree_600SemiBold } from '@expo-google-fonts/figtree/600SemiBold';
import { Figtree_700Bold } from '@expo-google-fonts/figtree/700Bold';
import { Figtree_800ExtraBold } from '@expo-google-fonts/figtree/800ExtraBold';
import { Figtree_900Black } from '@expo-google-fonts/figtree/900Black';
import { useAuthStore } from '@/store/auth-store';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // <-- Mematikan spam warning strict mode
});
export default function RootLayout() {
  return (
    <Provider>
      <AppBootstrap />
      <PortalHost />
    </Provider>
  );
}

function AppBootstrap() {
  // 1. Ambil isAuthenticated dan _hasHydrated (sebagai pengganti isLoaded)
  const { isAuthenticated, _hasHydrated } = useAuthStore();

  const [fontsLoaded, fontError] = useFonts({
    Figtree_300Light,
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
    Figtree_800ExtraBold,
    Figtree_900Black,
  });

  React.useEffect(() => {
    // 2. Tahan SplashScreen sampai font AND Zustand store selesai dimuat penuh
    if ((_hasHydrated && fontsLoaded) || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, _hasHydrated]);

  // 3. Render kosong selama proses loading di latar belakang berjalan
  if (!_hasHydrated || !fontsLoaded || fontError) {
    return null;
  }

  // 4. Struktur pembagian halaman berdasarkan status login
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 🛑 GRUP PENGUNJUNG: Akses halaman jika BELUM login */}
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)/welcome" options={SIGN_IN_SCREEN_OPTIONS} />
        <Stack.Screen name="(auth)/login" options={SIGN_IN_SCREEN_OPTIONS} />
        <Stack.Screen name="(auth)/register" options={SIGN_UP_SCREEN_OPTIONS} />
      </Stack.Protected>

      {/* 🔐 GRUP PASIEN: Akses halaman utama jika SUDAH login */}
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="daftar" options={{ headerShown: false }} />
        <Stack.Screen name="dokter" options={{ headerShown: false }} />
        <Stack.Screen name="monitor" options={{ headerShown: false }} />
        {/* Halaman poliklinik dkk kamu bisa taruh di bawah sini bro */}
      </Stack.Protected>
    </Stack>
  );
}

const SIGN_IN_SCREEN_OPTIONS = {
  headerShown: false,
  title: 'Sign in',
};

const SIGN_UP_SCREEN_OPTIONS = {
  presentation: 'modal',
  title: '',
  headerTransparent: true,
  gestureEnabled: false,
} as const;

const DEFAULT_AUTH_SCREEN_OPTIONS = {
  title: '',
  headerShadowVisible: false,
  headerTransparent: true,
};
