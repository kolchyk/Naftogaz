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
   * Returns the instance of the [ReactActivityDelegate]. We use a minimal delegate
   * that avoids loading New Architecture components when they're disabled.
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    Log.d("MainActivity", "Creating ReactActivityDelegate (NewArch disabled)")
    return DefaultReactActivityDelegate(this, mainComponentName, false)
  }
}
