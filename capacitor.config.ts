import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.rvunlprep.juniorassistant',
  appName: 'RVUNL Junior Assistant Exam Prep',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: false
  }
}

export default config
