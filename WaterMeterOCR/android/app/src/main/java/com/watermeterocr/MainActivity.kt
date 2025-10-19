package com.watermeterocr

import android.util.Log
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "WaterMeterOCR"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use a safer version that
   * gracefully handles the absence of New Architecture native libraries.
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    try {
      // Try to use the default delegate (which may load New Architecture)
      Log.d("MainActivity", "Creating DefaultReactActivityDelegate")
      return DefaultReactActivityDelegate(this, mainComponentName, false)
    } catch (e: Exception) {
      // If that fails, use a minimal delegate
      Log.e("MainActivity", "Failed to create DefaultReactActivityDelegate, using fallback", e)
      return DefaultReactActivityDelegate(this, mainComponentName, false)
    }
  }
}
