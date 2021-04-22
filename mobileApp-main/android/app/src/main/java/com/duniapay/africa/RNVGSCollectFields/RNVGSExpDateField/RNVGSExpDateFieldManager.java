package com.duniapay.africa.RNVGSCollectFields.RNVGSExpDateField;

import android.util.TypedValue;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ThemedReactContext;

import com.verygoodsecurity.vgscollect.widget.VGSEditText;
import com.verygoodsecurity.vgscollect.widget.VGSTextInputLayout;
import com.verygoodsecurity.vgscollect.view.card.FieldType;

import com.duniapay.africa.RNVGSCollectFields.OnCreateViewInstanceListener;

public class RNVGSExpDateFieldManager extends ViewGroupManager<VGSTextInputLayout> {
  public static final String FIELD_NAME = "cardExpirationDate";
  private VGSEditText editText;
  private VGSTextInputLayout vgsTextInputLayout;

  private OnCreateViewInstanceListener listener;

  RNVGSExpDateFieldManager(OnCreateViewInstanceListener listener) {
    super();
    this.listener = listener;
  }

  @Override
  public String getName() {
    return "RNVGSExpDateField";
  }

  @Override
  protected VGSTextInputLayout createViewInstance(ThemedReactContext reactContext) {
    vgsTextInputLayout = new VGSTextInputLayout(reactContext);

    editText = new VGSEditText(reactContext);
    editText.setIsRequired(true);
    editText.setFieldName(FIELD_NAME);
    editText.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 12);
    editText.setFieldType(FieldType.CARD_EXPIRATION_DATE);

    vgsTextInputLayout.addView(editText);

    listener.onCreateViewInstance(editText);

    return vgsTextInputLayout;
  }
}
