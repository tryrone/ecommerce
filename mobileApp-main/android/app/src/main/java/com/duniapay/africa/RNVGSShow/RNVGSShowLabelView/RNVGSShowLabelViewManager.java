package com.duniapay.africa.RNVGSShow.RNVGSShowLabelView;

import android.graphics.Color;
import android.util.TypedValue;
import android.view.View;
import android.widget.LinearLayout;

import com.duniapay.africa.RNVGSShow.RNVGSShowView.RNVGSShowView;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import com.verygoodsecurity.vgsshow.widget.VGSTextView;

import org.jetbrains.annotations.NotNull;

import kotlin.text.Regex;

public class RNVGSShowLabelViewManager extends SimpleViewManager<LinearLayout> {
  private ThemedReactContext reactContext;

  private LinearLayout viewLayout;
  private VGSTextView vgsView;

  @ReactProp(name = "vgsShowViewNodeHandle")
  public void setVgsShowViewNodeHandle(@NotNull View view, Integer nodeHandle) {
    RNVGSShowView component = this.reactContext.getCurrentActivity().findViewById(nodeHandle);
    if (component == null) return;
    component.show.subscribe(this.vgsView);
  }

  @ReactProp(name = "contentPath")
  public void setContentPath(View view, String contentPath) {
    this.vgsView.setContentPath(contentPath);
  }

  @Override
  public String getName() {
    return "RNVGSShowLabelView";
  }

  @NotNull
  @Override
  protected LinearLayout createViewInstance(@NotNull ThemedReactContext reactContext) {
    this.reactContext = reactContext;

    viewLayout = new LinearLayout(reactContext);

    vgsView = new VGSTextView(reactContext);
    vgsView.setTextSize(TypedValue.COMPLEX_UNIT_PX, 18);
    vgsView.setTextColor(Color.BLACK);
    vgsView.setHint("**** **** **** ****");

    Regex cardNumberPattern = new Regex("(\\d{4})(\\d{4})(\\d{4})(\\d{4})");
    String cardNumberReplacement = "**** $4";
    vgsView.addTransformationRegex(cardNumberPattern, cardNumberReplacement);

    viewLayout.addView(vgsView);

    return viewLayout;
  }
}
