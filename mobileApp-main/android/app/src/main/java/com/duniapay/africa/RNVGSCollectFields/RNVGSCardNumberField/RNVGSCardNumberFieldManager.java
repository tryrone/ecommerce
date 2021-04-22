package com.duniapay.africa.RNVGSCollectFields.RNVGSCardNumberField;

import android.view.Gravity;
import com.facebook.react.uimanager.ViewGroupManager;
import android.util.TypedValue;
import com.facebook.react.uimanager.ThemedReactContext;

import com.verygoodsecurity.vgscollect.widget.VGSCardNumberEditText;
import com.verygoodsecurity.vgscollect.widget.VGSTextInputLayout;

import com.duniapay.africa.RNVGSCollectFields.OnCreateViewInstanceListener;

public class RNVGSCardNumberFieldManager extends ViewGroupManager<VGSTextInputLayout> {
  public static final String FIELD_NAME = "cardNumber";
  private VGSCardNumberEditText editText;
  private VGSTextInputLayout vgsTextInputLayout;

  private OnCreateViewInstanceListener listener;

  RNVGSCardNumberFieldManager(OnCreateViewInstanceListener listener) {
    super();
    this.listener = listener;
  }

  @Override
  public String getName() {
    return "RNVGSCardNumberField";
  }

  @Override
  protected VGSTextInputLayout createViewInstance(ThemedReactContext reactContext) {
    vgsTextInputLayout = new VGSTextInputLayout(reactContext);

    editText = new VGSCardNumberEditText(reactContext);
    editText.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 12);
    editText.setIsRequired(true);
    editText.setCardBrandIconGravity(Gravity.END);
    editText.setFieldName(FIELD_NAME);

    vgsTextInputLayout.addView(editText);

    listener.onCreateViewInstance(editText);

    return vgsTextInputLayout;
  }
}
