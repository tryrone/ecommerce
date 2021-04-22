package com.duniapay.africa.RNVGSCollectFields.RNVGSExpDateField;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.Collections;
import java.util.List;
import java.util.Arrays;

import com.duniapay.africa.RNVGSCollectFields.OnCreateViewInstanceListener;

public class RNVGSExpDateFieldPackage implements ReactPackage {
  private OnCreateViewInstanceListener listener;
  private RNVGSExpDateFieldManager calManager;

  public RNVGSExpDateFieldPackage(OnCreateViewInstanceListener listener) {
    this.listener = listener;
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    if (calManager == null) {
      calManager = new RNVGSExpDateFieldManager(listener);
    }
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    if (calManager == null) {
      calManager = new RNVGSExpDateFieldManager(listener);
    }
    return Arrays.<ViewManager>asList(
      calManager
    );
  }
}
