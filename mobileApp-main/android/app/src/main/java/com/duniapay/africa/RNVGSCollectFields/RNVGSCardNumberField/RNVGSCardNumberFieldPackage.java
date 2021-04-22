package com.duniapay.africa.RNVGSCollectFields.RNVGSCardNumberField;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.Collections;
import java.util.List;
import java.util.Arrays;

import com.duniapay.africa.RNVGSCollectFields.OnCreateViewInstanceListener;

public class RNVGSCardNumberFieldPackage implements ReactPackage {
  private OnCreateViewInstanceListener listener;
  private RNVGSCardNumberFieldManager calManager;

  public RNVGSCardNumberFieldPackage(OnCreateViewInstanceListener listener) {
    this.listener = listener;
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    if (calManager == null) {
      calManager = new RNVGSCardNumberFieldManager(listener);
    }
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    if (calManager == null) {
      calManager = new RNVGSCardNumberFieldManager(listener);
    }
    return Arrays.<ViewManager>asList(
      calManager
    );
  }
}
