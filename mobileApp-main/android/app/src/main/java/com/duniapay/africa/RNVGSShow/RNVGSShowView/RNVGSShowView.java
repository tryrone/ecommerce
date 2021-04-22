package com.duniapay.africa.RNVGSShow.RNVGSShowView;

import android.content.Context;
import android.view.View;

import com.verygoodsecurity.vgsshow.VGSShow;
import com.verygoodsecurity.vgsshow.core.network.client.VGSHttpMethod;
import com.verygoodsecurity.vgsshow.core.network.model.VGSRequest;

import com.duniapay.africa.RNVGSShow.RNVGSShowModule;

import java.util.HashMap;

public class RNVGSShowView extends View {
  public VGSShow show = null;

  public RNVGSShowView(Context context) {
    super(context);
  }

  public void reveal(String cardId) {
    HashMap<String, String> customHeader = new HashMap<>();
    customHeader.put("Authorization", String.format("Bearer %s", RNVGSShowModule.accessToken));

    String requestPath = String.format("/users/current/debitCards/%s", cardId);

    VGSRequest request = new VGSRequest.Builder(requestPath, VGSHttpMethod.GET)
      .headers(customHeader)
      .build();

    show.requestAsync(request);
  }
}
