package com.watermeterocr

import android.app.Application
import android.util.Log
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import com.rnmlkit.textrecognition.TextRecognitionPackage
import com.mrousavy.camera.react.CameraPackage
import com.th3rdwave.safeareacontext.SafeAreaContextPackage
import com.swmansion.rnscreens.RNScreensPackage
import com.google.android.gms.common.ConnectionResult
import com.google.android.gms.common.GoogleApiAvailability

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            listOf(
              TextRecognitionPackage(),
              CameraPackage(),
              SafeAreaContextPackage(),
              RNScreensPackage()
            )

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }


  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    
    // Проверка доступности Google Play Services перед инициализацией ML Kit
    val googleApiAvailability = GoogleApiAvailability.getInstance()
    val resultCode = googleApiAvailability.isGooglePlayServicesAvailable(this)
    
    if (resultCode == ConnectionResult.SUCCESS) {
      Log.d("WaterMeterOCR", "✓ Google Play Services available")
      // ML Kit будет инициализирован лениво при первом использовании
    } else {
      Log.w("WaterMeterOCR", "⚠ Google Play Services not available: ${googleApiAvailability.getErrorString(resultCode)}")
      // Приложение будет работать без ML Kit функций
    }
    
    Log.d("WaterMeterOCR", "✓ MainApplication initialized successfully")
  }
}
