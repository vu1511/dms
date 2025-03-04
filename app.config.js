module.exports = {
  expo: {
    name: 'satavan-dms',
    slug: 'satavan-dms',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/images/icon.png',
    scheme: 'SatavanDMS',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      image: './src/assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.satavan.dms',
      infoPlist: {
        NSPhotoLibraryUsageDescription:
          '$(PRODUCT_NAME) cần quyền truy cập thư viện ảnh của bạn để cập nhật ảnh đại diện'
      },
      config: {
        googleMapsApiKey: 'AIzaSyCZuyC1v2Yjl0CV2khWJ7V8vgUBJQFOEoE'
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      permissions: ['android.permission.ACCESS_FINE_LOCATION', 'android.permission.POST_NOTIFICATIONS'],
      package: 'com.satavan.dms',
      config: {
        googleMaps: {
          apiKey: 'AIzaSyCZuyC1v2Yjl0CV2khWJ7V8vgUBJQFOEoE'
        }
      }
    },
    web: {
      bundler: 'metro'
    },
    plugins: [
      [
        'onesignal-expo-plugin',
        {
          mode: 'development',
          devTeam: 'U6S6Q6Y7QF'
        }
      ],
      'expo-font',
      [
        'expo-camera',
        {
          cameraPermission: '$(PRODUCT_NAME) cần truy cập vào camera của bạn để quét mã hoặc cập nhật ảnh đại diện'
        }
      ],
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission:
            '$(PRODUCT_NAME) cần truy cập vị trí của bạn để thiết lập thông tin điểm bán.'
        }
      ],
      [
        'react-native-permissions',
        {
          iosPermissions: ['PhotoLibrary', 'Notifications', 'Camera']
        }
      ]
    ],
    experiments: {
      tsconfigPaths: true
    }
  }
}
