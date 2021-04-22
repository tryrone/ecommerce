package com.duniapay.africa.RNVGSCollect;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

import com.verygoodsecurity.vgscollect.view.InputFieldView;

import com.duniapay.africa.RNVGSCollectFields.OnCreateViewInstanceListener;

public class RNVGSCollectPackage implements ReactPackage, OnCreateViewInstanceListener {
  private RNVGSCollectModule module;

  public OnCreateViewInstanceListener getListener() {
    return this;
  }

  public RNVGSCollectModule getRNVGSCollectModule() {
    return module;
  }

  @Override
  public void onCreateViewInstance(InputFieldView inputFieldView) {
    module.bindView(inputFieldView);
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    module = new RNVGSCollectModule(reactContext);

    List<NativeModule> modules = new ArrayList<>();

    modules.add(module);

    return modules;
  }
}
