import VGSShowSDK

@objc(RNVGSShowView)
public class RNVGSShowView: UIView {
  let show = VGSShow(id: RNVGSShow.vaultId, environment: RNVGSShow.environment)

  @objc func reveal(cardId: NSString) {
    self.show.customHeaders = [
      "Authorization": "Bearer \(RNVGSShow.accessToken)"
    ]
    self.show.request(path: "/users/current/debitCards/\(cardId)", method: VGSHTTPMethod.get) { (requestResult) in
      switch requestResult {
      case .success(let code):
        print("vgsshow success, code: \(code)")
      case .failure(let code, let error):
        print("vgsshow failed, code: \(code), error: \(error)")
      }
    }
  }
}

@objc(RNVGSShowViewManager)
class RNVGSShowViewManager: RCTViewManager {

  @objc override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc func revealFromManager(_ node: NSNumber, cardId: NSString) {
    DispatchQueue.main.async {
      let component = self.bridge.uiManager.view(forReactTag: node) as! RNVGSShowView
      component.reveal(cardId: cardId)
    }
  }

  override func view() -> UIView! {
    return RNVGSShowView()
  }
}
