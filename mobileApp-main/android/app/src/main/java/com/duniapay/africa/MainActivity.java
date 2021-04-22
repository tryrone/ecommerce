package com.duniapay.africa;

import java.util.List;
import android.os.Bundle;
import android.content.Intent;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactInstanceManager;
import org.devio.rn.splashscreen.SplashScreen;

import com.duniapay.africa.RNVGSCollect.RNVGSCollectModule;
import com.duniapay.africa.RNVGSCollect.RNVGSCollectPackage;

public class MainActivity extends ReactActivity {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "duniapay";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
  }
}
