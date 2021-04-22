package com.duniapay.africa.RNVGSCollect;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import android.content.Intent;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import com.verygoodsecurity.vgscollect.core.VGSCollect;
import com.verygoodsecurity.vgscollect.core.HTTPMethod;
import com.verygoodsecurity.vgscollect.core.VgsCollectResponseListener;
import com.verygoodsecurity.vgscollect.core.model.network.VGSRequest;
import com.verygoodsecurity.vgscollect.core.model.network.VGSResponse;
import com.verygoodsecurity.vgscollect.core.model.state.FieldState;
import com.verygoodsecurity.vgscollect.view.InputFieldView;

public class RNVGSCollectModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;
  private VGSCollect collect;
  private String token;
  private Callback onResponseCallback;

  RNVGSCollectModule(ReactApplicationContext c) {
    super(c);
    reactContext = c;
  }

  @ReactMethod
  public void initVGSCollect(String vaultId, String environment, String accessToken) {
    collect = new VGSCollect(reactContext.getCurrentActivity(), vaultId, environment);
    token = accessToken;

    collect.addOnResponseListeners(new VgsCollectResponseListener() {
      @Override
      public void onResponse(VGSResponse response) {
        sendResponse(response);
      }
    });
  }

  @Override
  public String getName() {
    return "RNVGSCollect";
  }

  @ReactMethod
  public void submitCardData(ReadableMap extraCardData, Callback callback) {
    onResponseCallback = callback;

    List<FieldState> states = collect.getAllStates();
    String cardBrand = new String();
    for (int i = 0; i < states.size(); i++) {
      FieldState state = states.get(i);
      if (state instanceof FieldState.CardNumberState) {
        cardBrand = ((FieldState.CardNumberState) state).getCardBrand();
      }
    }

    collect.resetCustomData();

    String cardHolder = extraCardData.getString("cardHolder");
    HashMap data = new HashMap<String, String>();
    data.put("cardHolder", cardHolder);
    data.put("cardBrand", cardBrand);

    collect.setCustomData(data);

    HashMap customHeader = new HashMap<String, String>();
    customHeader.put("Authorization", String.format("Bearer %s", token));

    VGSRequest request = new VGSRequest.VGSRequestBuilder()
      .setCustomHeader(customHeader)
      .setMethod(HTTPMethod.POST)
      .setPath("/users/current/debitCards")
      .build();

    collect.asyncSubmit(request);
  }

  public void bindView(InputFieldView inputFieldView) {
    collect.bindView(inputFieldView);
  }

  private void sendResponse(VGSResponse response) {
    if(response instanceof VGSResponse.SuccessResponse) {
      int successCode = ((VGSResponse.SuccessResponse)response).getSuccessCode();
      String rawResponse = ((VGSResponse.SuccessResponse)response).getRawResponse();
      Map<String, Object> mapResponse = ((VGSResponse.SuccessResponse)response).getResponse();
      WritableMap successResponse = Arguments.createMap();
      onResponseCallback.invoke(successResponse);
    } else {
      int errorCode = ((VGSResponse.ErrorResponse)response).getErrorCode();
      String localizeMessage = ((VGSResponse.ErrorResponse)response).getLocalizeMessage();
      WritableMap errorResponse = Arguments.createMap();
      errorResponse.putInt("errorCode", errorCode);
      errorResponse.putString("errorMessage", localizeMessage);
      onResponseCallback.invoke(errorResponse);
    }
  }
}
