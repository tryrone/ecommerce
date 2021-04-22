package com.duniapay.africa;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.robinpowered.react.Intercom.IntercomPackage;
import io.intercom.android.sdk.Intercom;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import com.duniapay.africa.RNVGSCollect.RNVGSCollectPackage;
import com.duniapay.africa.RNVGSCollectFields.RNVGSCVCField.RNVGSCVCFieldPackage;
import com.duniapay.africa.RNVGSCollectFields.RNVGSCardNumberField.RNVGSCardNumberFieldPackage;
import com.duniapay.africa.RNVGSCollectFields.RNVGSExpDateField.RNVGSExpDateFieldPackage;
import com.duniapay.africa.RNVGSCollectFields.OnCreateViewInstanceListener;
import com.duniapay.africa.RNVGSShow.RNVGSShowPackage;
import com.duniapay.africa.RNVGSShow.RNVGSShowView.RNVGSShowViewPackage;
import com.duniapay.africa.RNVGSShow.RNVGSShowLabelView.RNVGSShowLabelViewPackage;

import com.airbnb.android.react.lottie.LottiePackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          RNVGSCollectPackage vgsCollect = new RNVGSCollectPackage();
          OnCreateViewInstanceListener vgsListener = vgsCollect.getListener();
          RNVGSCardNumberFieldPackage vgsCardNumber = new RNVGSCardNumberFieldPackage(vgsListener);
          RNVGSCVCFieldPackage vgsCvc = new RNVGSCVCFieldPackage(vgsListener);
          RNVGSExpDateFieldPackage vgsExpDate = new RNVGSExpDateFieldPackage(vgsListener);

          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
            new SplashScreenReactPackage();
            new ReactNativeContacts();
            new IntercomPackage();
            new ReactNativeFingerprintScannerPackage();
            packages.add(new LottiePackage());
            packages.add(new RNVGSShowPackage());
            packages.add(new RNVGSShowViewPackage());
            packages.add(new RNVGSShowLabelViewPackage());
            packages.add(vgsCollect);
            packages.add(vgsCardNumber);
            packages.add(vgsCvc);
            packages.add(vgsExpDate);
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Intercom.initialize(this, "android_sdk-674441a4847717c3bd193cca9116aa6431b5973e", "daxphcq7");
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.duniapay.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
