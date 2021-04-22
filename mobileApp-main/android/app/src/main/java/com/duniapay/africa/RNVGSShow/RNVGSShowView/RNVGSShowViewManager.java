package com.duniapay.africa.RNVGSShow.RNVGSShowView;

import androidx.annotation.Nullable;

import com.duniapay.africa.RNVGSShow.RNVGSShowModule;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.verygoodsecurity.vgsshow.VGSShow;

import org.jetbrains.annotations.NotNull;

import java.util.Map;
import java.util.Objects;

public class RNVGSShowViewManager extends SimpleViewManager<RNVGSShowView> {
  public static final int REVEAL_FROM_MANAGER_COMMAND = 12;

  @Override
  public String getName() {
    return "RNVGSShowView";
  }

  @Nullable
  @Override
  public Map<String, Integer> getCommandsMap() {
    return MapBuilder.of(
      "revealFromManager",
      REVEAL_FROM_MANAGER_COMMAND
    );
  }

  @Override
  public void receiveCommand(@NotNull final RNVGSShowView root, int commandId, @Nullable ReadableArray args) {
    switch (commandId) {
      case REVEAL_FROM_MANAGER_COMMAND:
        root.reveal(args.getString(0));
        break;
    }
  }

  @NotNull
  @Override
  protected RNVGSShowView createViewInstance(@NotNull ThemedReactContext reactContext) {
    RNVGSShowView view = new RNVGSShowView(reactContext);
    view.show = new VGSShow(Objects.requireNonNull(reactContext.getCurrentActivity()), RNVGSShowModule.vaultId, RNVGSShowModule.environment);
    return view;
  }
}
