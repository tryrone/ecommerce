@objc(RNVGSShow)
class RNVGSShow: NSObject {
  static var vaultId: String = ""
  static var environment: String = ""
  static var accessToken: String = ""

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc
  func initVGSShow(_ vaultId: String, environment: String, accessToken: String) {
    RNVGSShow.vaultId = vaultId
    RNVGSShow.environment = environment
    RNVGSShow.accessToken = accessToken
  }
}
