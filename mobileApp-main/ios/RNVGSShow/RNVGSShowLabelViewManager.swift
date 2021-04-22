import VGSShowSDK

@objc(RNVGSShowLabelView)
class RNVGSShowLabelView: UIView {
  var ownViewManager: RNVGSShowLabelViewManager? = nil
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  @objc var vgsShowViewNodeHandle: NSNumber? = nil {
    didSet {
      let component = self.ownViewManager?.bridge.uiManager.view(forReactTag: self.vgsShowViewNodeHandle) as! RNVGSShowView
      component.show.subscribe(self.vgsLabel)
    }
  }

  @objc var contentPath: String? = nil {
    didSet {
      self.vgsLabel.contentPath = contentPath
    }
  }
  

  override init(frame: CGRect) {
    super.init(frame: frame)
    
    let stackView = UIStackView.init(arrangedSubviews: [vgsLabel])
    stackView.axis = .vertical
    stackView.translatesAutoresizingMaskIntoConstraints = false
    self.addSubview(vgsLabel)
  }

  lazy var vgsLabel: VGSLabel = {
    let vgsLabel = VGSLabel()
    
    let labelColor = UIColor.black
    let labelFont = UIFont(name: "Roboto-Medium", size: 18)
    
    vgsLabel.textColor = labelColor
    vgsLabel.contentPath = "cardNumber"
    vgsLabel.font = labelFont
    vgsLabel.borderWidth = 0
    vgsLabel.placeholder = "**** **** **** ****"
    vgsLabel.placeholderStyle.color = labelColor
    vgsLabel.placeholderStyle.font = labelFont
    
    let cardNumberPattern = "(\\d{4})(\\d{4})(\\d{4})(\\d{4})"
    let template = "**** $4"
    let regex = try! NSRegularExpression(pattern: cardNumberPattern, options: [])
    vgsLabel.addTransformationRegex(regex, template: template)
    
    return vgsLabel
  }()
}

@objc(RNVGSShowLabelViewManager)
class RNVGSShowLabelViewManager: RCTViewManager {
  @objc override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc override func view() -> UIView! {
    let label = RNVGSShowLabelView()
    label.ownViewManager = self;
    return label
  }
}
