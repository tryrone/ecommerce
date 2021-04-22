export const getSelectedPhoneNumber = ({
  wallet: { selectedPhoneNumberId, phoneNumbers },
}) => {
  return phoneNumbers.find(({ _id }) => _id === selectedPhoneNumberId);
};

export const getPhoneNumbers = ({ wallet: { phoneNumbers } }) => {
  return phoneNumbers;
};
