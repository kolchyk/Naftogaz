package com.watermeterocr

import android.app.Application
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    
    // Инициализировать ML Kit для раннего обнаружения проблем
    try {
      val recognizer = TextRecognition.getClient(TextRecognizerOptions.Builder().build())
      Log.d("WaterMeterOCR", "✓ ML Kit Text Recognition initialized successfully")
      recognizer.close()
    } catch (e: Exception) {
      Log.e("WaterMeterOCR", "⚠ Failed to initialize ML Kit Text Recognition", e)
      // Не выбрасываем исключение, так как может быть проблема с Google Play Services
      // Ошибка будет показана пользователю при попытке использования
    }
    
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      try {
        load()
      } catch (e: Throwable) {
        // Handle the case where the native library is not available
        // For example, log the error or show a user-friendly message
        Log.e("WaterMeterOCR", "Failed to load New Architecture", e)
        e.printStackTrace()
      }
    }
  }
}
