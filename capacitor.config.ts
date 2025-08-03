import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.esnapp.insightflow',
  appName: 'e-snapp InsightFlow',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
