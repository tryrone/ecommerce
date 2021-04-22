#import <React/RCTBridgeModule.h>
#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNVGSCollect, RCTViewManager)
  RCT_EXTERN_METHOD(
    initVGSCollect: (NSString)vaultId
    environment: (NSString)environment
    accessToken: (NSString)accessToken
  );

  RCT_EXTERN_METHOD(
    submitCardData: (NSDictionary *)extraCardData
    callback: (RCTResponseSenderBlock)callback
  );
@end

@interface RCT_EXTERN_MODULE(RNVGSCardNumberField, RCTViewManager)
@end

@interface RCT_EXTERN_MODULE(RNVGSCVCField, RCTViewManager)
@end

@interface RCT_EXTERN_MODULE(RNVGSExpDateField, RCTViewManager)
@end
