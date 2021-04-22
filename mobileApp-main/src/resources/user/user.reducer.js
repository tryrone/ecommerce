import {
  USER_AUTHENTICATED,
  USER_CURRENT,
  USER_SIGNED_UP,
  USER_LOGGED_OUT,
  HIDE_ONBOARDING,
  SET_PIN_CODE,
  HIDE_BALANCE,
  SET_AVATAR_URL,
  USER_SIGNED_IN,
  USER_UPDATED,
  SET_PUSH_NOTIFICATIONS_TOKEN,
  REMOVE_PUSH_NOTIFICATIONS_TOKEN,
  SET_SHOW_PUSH_NOTIFICATIONS,
  SET_AVAILABLE_BALANCE,
  SET_PIN_ENTER_ATTEMPTS,
} from './user.constants';

const initialState = {
  userData: {
    birthDate: '',
    pushNotifications: {
      tokens: [],
      show: true,
    },
    avatar: {},
  },
  authenticated: false,
  isOnboardingHidden: false,
  isBalanceHidden: false,
  pinCode: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case USER_UPDATED:
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };
    case USER_CURRENT:
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.userData,
        },
      };
    case USER_SIGNED_UP: {
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };
    }
    case USER_SIGNED_IN: {
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };
    }
    case USER_LOGGED_OUT:
      return {
        ...state,
        authenticated: false,
      };
    case HIDE_ONBOARDING:
      return {
        ...state,
        isOnboardingHidden: action.payload.isOnboardingHidden,
      };
    case SET_PIN_CODE:
      return {
        ...state,
        pinCode: action.payload.pinCode,
      };
    case SET_PIN_ENTER_ATTEMPTS:
      return {
        ...state,
        pinCodeAttempts: action.payload.pinCodeAttempts,
      };
    case HIDE_BALANCE:
      return {
        ...state,
        isBalanceHidden: action.isHidden,
      };
    case SET_AVATAR_URL:
      return {
        ...state,
        userData: {
          ...state.userData,
          avatar: {
            ...state.userData.avatar,
            url: action.avatarUrl,
          },
        },
      };
    case SET_PUSH_NOTIFICATIONS_TOKEN:
      return {
        ...state,
        userData: {
          ...state.userData,
          pushNotifications: {
            ...state.userData.pushNotifications,
            tokens: [...state.userData.pushNotifications.tokens, action.token],
          },
        },
      };
    case REMOVE_PUSH_NOTIFICATIONS_TOKEN:
      return {
        ...state,
        userData: {
          ...state.userData,
          pushNotifications: {
            ...state.userData.pushNotifications,
            tokens: state.userData.pushNotifications.tokens.filter(
              (token) => token !== action.token,
            ),
          },
        },
      };
    case SET_SHOW_PUSH_NOTIFICATIONS:
      return {
        ...state,
        userData: {
          ...state.userData,
          pushNotifications: {
            ...state.userData.pushNotifications,
            show: action.show,
          },
        },
      };
    case SET_AVAILABLE_BALANCE:
      return {
        ...state,
        userData: {
          ...state.userData,
          availableBalance: action.availableBalance,
        },
      };
    default:
      return state;
  }
};
