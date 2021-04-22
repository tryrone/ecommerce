package com.duniapay.africa.RNVGSShow;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNVGSShowModule extends ReactContextBaseJavaModule {
  public static String vaultId;
  public static String accessToken;
  public static String environment;

  @ReactMethod
  public void initVGSShow(String vaultId, String environment, String accessToken) {
    RNVGSShowModule.vaultId = vaultId;
    RNVGSShowModule.accessToken = accessToken;
    RNVGSShowModule.environment = environment;
  }

  @Override
  public String getName() {
    return "RNVGSShow";
  }
}
