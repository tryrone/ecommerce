import VGSCollectSDK

extension UIColor {
  static let inputBackground = UIColor.white
  static let inputBorder = UIColor(red: 155 / 255, green: 155 / 255, blue: 155 / 255, alpha: 0.6)
  static let inputCorrect = UIColor(red: 74 / 255, green: 200 / 255, blue: 102 / 255, alpha: 1)
  static let inputFocused = UIColor(red: 80 / 255, green: 103 / 255, blue: 235 / 255, alpha: 1)
  static let inputError = UIColor(red: 1, green: 63 / 255, blue: 63 / 255, alpha: 1)
  static let placeholder = UIColor(red: 155 / 255, green: 155 / 255, blue: 155 / 255, alpha: 1)
}

@objc(RNVGSCardNumberField)
class RNVGSCardNumberField: RCTViewManager {

  static let fieldName = "cardNumber"

  @objc override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func view() -> UIView! {
    /// Set configuration and field type
    let config = VGSConfiguration(collector: RNVGSCollect.collector!, fieldName: Self.fieldName)
    config.type = .cardNumber

    let cardTextfield = VGSCardTextField()
    cardTextfield.delegate = self

    // styles for text field
    cardTextfield.padding = .init(top: 8, left: 8, bottom: 8, right: 8)
    cardTextfield.backgroundColor = .inputBackground
    cardTextfield.borderColor = .inputBorder
    cardTextfield.cornerRadius = 10
    cardTextfield.font = UIFont(name: "Roboto-Regular", size: 16)
    cardTextfield.attributedPlaceholder = NSAttributedString(
      string: "1234 5678 9101 1121",
      attributes: [
        NSAttributedString.Key.foregroundColor : UIColor.placeholder,
        NSAttributedString.Key.font : UIFont(name: "Roboto-Regular", size: 16)!
      ]
    )

    cardTextfield.configuration = config
    return cardTextfield
  }
}

@objc(RNVGSCVCField)
class RNVGSCVCField: RCTViewManager {

  static let fieldName = "cardCVC"

  @objc override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func view() -> UIView! {
    /// Set configuration and field type
    let config = VGSConfiguration(collector: RNVGSCollect.collector!, fieldName: Self.fieldName)
    config.type = .cvc

    let cardTextfield = VGSTextField()
    cardTextfield.delegate = self

    // styles for text field
    cardTextfield.padding = .init(top: 8, left: 8, bottom: 8, right: 8)
    cardTextfield.backgroundColor = .inputBackground
    cardTextfield.borderColor = .inputBorder
    cardTextfield.cornerRadius = 10
    cardTextfield.font = UIFont(name: "Roboto-Regular", size: 16)
    cardTextfield.attributedPlaceholder = NSAttributedString(
      string: "123",
      attributes: [
        NSAttributedString.Key.foregroundColor : UIColor.placeholder,
        NSAttributedString.Key.font : UIFont(name: "Roboto-Regular", size: 16)!
      ]
    )

    cardTextfield.configuration = config
    return cardTextfield
  }
}

@objc(RNVGSExpDateField)
class RNVGSExpDateField: RCTViewManager {

  static let fieldName = "cardExpirationDate"

  @objc override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func view() -> UIView! {
    /// Set configuration and field type
    let config = VGSConfiguration(collector: RNVGSCollect.collector!, fieldName: Self.fieldName)
    config.type = .expDate

    let cardTextfield = VGSTextField()
    cardTextfield.delegate = self

    // styles for text field
    cardTextfield.padding = .init(top: 8, left: 8, bottom: 8, right: 8)
    cardTextfield.backgroundColor = .inputBackground
    cardTextfield.borderColor = .inputBorder
    cardTextfield.cornerRadius = 10
    cardTextfield.font = UIFont(name: "Roboto-Regular", size: 16)
    cardTextfield.attributedPlaceholder = NSAttributedString(
      string: "MM/YY",
      attributes: [
        NSAttributedString.Key.foregroundColor : UIColor.placeholder,
        NSAttributedString.Key.font : UIFont(name: "Roboto-Regular", size: 16)!
      ]
    )

    cardTextfield.configuration = config
    return cardTextfield
  }
}

extension RNVGSCardNumberField: VGSTextFieldDelegate {
  func vgsTextFieldDidChange(_ textField: VGSTextField) {
    /// update textfield color on validation state changes
    textField.borderColor = textField.state.isValid ? .inputCorrect : .inputError
  }
}

extension RNVGSCVCField: VGSTextFieldDelegate {
  func vgsTextFieldDidChange(_ textField: VGSTextField) {
    /// update textfield color on validation state changes
    textField.borderColor = textField.state.isValid ? .inputCorrect : .inputError
  }
}

extension RNVGSExpDateField: VGSTextFieldDelegate {
  func vgsTextFieldDidChange(_ textField: VGSTextField) {
    /// update textfield color on validation state changes
    textField.borderColor = textField.state.isValid ? .inputCorrect : .inputError
  }
}
