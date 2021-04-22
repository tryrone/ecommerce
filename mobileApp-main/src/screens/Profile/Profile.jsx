import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Switch,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS } from 'react-native-permissions';
import Intercom from 'react-native-intercom';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import Text from 'components/Text';
import Badge from 'components/Badge';
import MainHeader from 'components/MainHeader';

import PersonalInfoIcon from 'assets/icons/personalInfo.svg';
import ActiveNotificationsIcon from 'assets/icons/activeNotifications.svg';
import HideBalanceIcon from 'assets/icons/hideBalance.svg';
import TouchIdIcon from 'assets/icons/touchId.svg';
import VerifyIdentityIcon from 'assets/icons/verifyIdentity.svg';
import ResetPasswordIcon from 'assets/icons/resetPassword.svg';
import AboutIcon from 'assets/icons/about.svg';
import HelpIcon from 'assets/icons/help.svg';
import RightArrow from 'assets/icons/rightArrow.svg';
import EditIcon from 'assets/icons/edit.svg';
import LogOutIcon from 'assets/icons/logOut.svg';

import * as storage from 'helpers/storage';
import * as userSelectors from 'resources/user/user.selectors';
import * as userActions from 'resources/user/user.actions';

import {
  getInitials,
  getVerificationBadgeColor,
  isVerificationNeeded,
} from 'helpers/utils.helper';
import { checkPermissions } from 'helpers/permissions.helper';
import amplitudeInstance from 'helpers/amplitude.helper';
import { ANALYTICS_EVENTS } from 'helpers/constants';

import colors from 'themes/colors';

import styles from './Profile.styles';

function Profile({ navigation }) {
  const dispatch = useDispatch();

  const isHiddenBalance = useSelector(userSelectors.getIsBalanceHidden);

  const [isTouchId, setIsTouchId] = useState(false);
  const [isResetOnlyPinCode, setResetOnlyPinCode] = useState(false);

  const userData = useSelector(userSelectors.getUserData);
  const [isBalanceHidden, setBalanceHidden] = useState(isHiddenBalance);
  const [isAvatarLoading, setAvatarLoading] = useState(false);

  const isRegistrationViaSocialNetworks = useMemo(() => {
    return Boolean(
      Object.values(userData.oauth).find((element) => {
        return element;
      }),
    );
  }, [userData.oauth]);

  useEffect(() => {
    const init = async () => {
      dispatch(userActions.getCurrentUser());
      const stateTouchId = await storage.getTouchID();

      setResetOnlyPinCode(isRegistrationViaSocialNetworks);
      setIsTouchId(Boolean(stateTouchId));
    };
    init();
  }, [setIsTouchId, setResetOnlyPinCode]);

  const onToggleNotifications = useCallback((value) => {
    dispatch(userActions.setShowPushNotifications(value));
  }, []);

  const handleLogOut = useCallback(async () => {
    await dispatch(userActions.removePushNotificationsToken());
    Intercom.logout();
    dispatch(userActions.logOut());
  }, []);

  const onToggleHideBalance = useCallback(async (value) => {
    await dispatch(userActions.hideBalance(value));
    setBalanceHidden(value);
  }, []);

  const onToggleTouchId = useCallback(async (isBiometricAuth) => {
    if (isBiometricAuth) {
      try {
        await FingerprintScanner.isSensorAvailable();
        storage.setTouchID('true');
        setIsTouchId(true);
      } catch (error) {
        storage.removeTouchID();
        setIsTouchId(false);
        Alert.alert('Check your phone settings', `${error.message}`);
      }
    } else {
      storage.removeTouchID();
      setIsTouchId(false);
    }
  }, []);

  const onIntercomConnect = useCallback(() => {
    Intercom.registerIdentifiedUser({ userId: userData._id });
    Intercom.updateUser({
      email: userData.email,
      user_id: userData._id,
      name: userData.username,
      phone: userData.phoneNumber,
    });
    Intercom.displayMessageComposer();
  }, []);

  const onEditProfilePicture = useCallback(async () => {
    const permissionsGranted = await checkPermissions(
      PERMISSIONS.IOS.PHOTO_LIBRARY,
    );
    if (permissionsGranted) {
      const options = {
        mediaType: 'photo',
      };
      launchImageLibrary(options, async (response) => {
        if (!response.didCancel) {
          const file = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };
          const formData = new FormData();
          formData.append('file', file);
          setAvatarLoading(true);
          await dispatch(userActions.setAvatar(formData));
          setAvatarLoading(false);
          amplitudeInstance.logEvent(ANALYTICS_EVENTS.UPDATE_PROFILE_PICTURE);
        }
      });
    }
  }, []);

  const isUserUnverified = useMemo(() => {
    return isVerificationNeeded(userData.verificationStatus);
  }, [userData.verificationStatus]);

  const listItems = useMemo(
    () => [
      {
        id: 1,
        icon: PersonalInfoIcon,
        title: 'Personal Information',
        onPress: () => navigation.navigate('PersonalInformation'),
        rightElement: <RightArrow fill={colors.profileArrowIcon} />,
      },
      {
        id: 2,
        icon: ActiveNotificationsIcon,
        title: 'Active Notifications',
        rightElement: (
          <Switch
            value={userData.pushNotifications.show}
            onValueChange={onToggleNotifications}
          />
        ),
      },
      {
        id: 3,
        icon: HideBalanceIcon,
        title: 'Hide my Balance',
        rightElement: (
          <Switch value={isBalanceHidden} onValueChange={onToggleHideBalance} />
        ),
      },
      {
        id: 4,
        icon: TouchIdIcon,
        title: 'Log in with Touch ID',
        rightElement: (
          <Switch value={isTouchId} onValueChange={onToggleTouchId} />
        ),
      },
      {
        id: 5,
        icon: VerifyIdentityIcon,
        title: 'Verify my Identity',
        onPress: () =>
          isUserUnverified && navigation.navigate('VerifyIdentity'),
        rightElement: (
          <View style={styles.verificationOption}>
            <Badge
              title={userData.verificationStatus}
              color={getVerificationBadgeColor(userData.verificationStatus)}
            />
            {isUserUnverified && <RightArrow fill={colors.profileArrowIcon} />}
          </View>
        ),
      },
      {
        id: 6,
        icon: ResetPasswordIcon,
        title: isResetOnlyPinCode ? 'Reset PIN code' : 'Reset Password',
        onPress: () => {
          navigation.navigate(
            isResetOnlyPinCode ? 'PinCodeReset' : 'CreateNewPassword',
          );
        },
        rightElement: <RightArrow fill={colors.profileArrowIcon} />,
      },
      {
        id: 7,
        icon: AboutIcon,
        title: 'About DuniaPay',
        onPress: () => Linking.openURL('https://medium.com/@duniapay'),
        rightElement: <RightArrow fill={colors.profileArrowIcon} />,
      },
      {
        id: 8,
        icon: HelpIcon,
        title: 'Help Centre',
        onPress: onIntercomConnect,
        rightElement: <RightArrow fill={colors.profileArrowIcon} />,
      },
    ],
    [
      isResetOnlyPinCode,
      isBalanceHidden,
      isTouchId,
      userData.verificationStatus,
      userData.pushNotifications.show,
    ],
  );

  return (
    <>
      <MainHeader
        title="My Profile"
        rightCornerText="Log out"
        rightIconStyle={styles.rightIconStyle}
        rightIcon={LogOutIcon}
        handleRightIconClick={handleLogOut}
      />
      <ScrollView style={styles.screen}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            {isAvatarLoading && (
              <ActivityIndicator
                size="small"
                color={colors.theme}
                style={styles.avatarLoader}
              />
            )}
            {userData.avatar?.url ? (
              <Image
                source={{ uri: userData.avatar?.url }}
                style={styles.avatar}
                onLoadStart={() => setAvatarLoading(true)}
                onLoadEnd={() => setAvatarLoading(false)}
              />
            ) : (
              <Text style={styles.initials}>
                {getInitials(userData.username)}
              </Text>
            )}
            <View style={styles.editProfileContainer}>
              <TouchableOpacity
                style={styles.editProfile}
                activeOpacity={0.7}
                onPress={onEditProfilePicture}
              >
                <EditIcon />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.fullName}>
            {isUserUnverified
              ? userData.username
              : `${userData.firstName} ${userData.lastName}`}
          </Text>
          <Text style={styles.username}>@{userData.username}</Text>
        </View>
        {listItems.map(
          ({ id, title, icon: Icon, rightElement, onPress = () => {} }) => (
            <TouchableOpacity
              key={id}
              style={styles.listItem}
              onPress={onPress}
              activeOpacity={1}
            >
              <View style={styles.listItemInfo}>
                <Icon />
                <Text style={styles.listItemTitle}>{title}</Text>
              </View>
              {rightElement}
            </TouchableOpacity>
          ),
        )}
      </ScrollView>
    </>
  );
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
