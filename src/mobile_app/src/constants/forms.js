/*
 * Each time a form is initialized or
 * reset, the state is filled with these
 * constants
 */

export const FORM_INIT = {
  CREDENTIALS: {
    username: '',
    password: '',
  },
  USER: {
    first_name: '',
    last_name: '',
    nums: [],
    usersdata: null,
  },
  USER_DATA: {
    accessLevel: 'NL',
    locks: false,
    residenceName: '',
    streetBlockNumber: '',
    houseNumber: '',
    enrollment: '',
    brandModel: '',
    color: '',
  },
};

export const PROPS_CREDENTIALS = {
  USERNAME: {
    placeholder: 'Usuario',
    maxLength: 30,
    autoCorrect: false,
    leftIcon: {type: 'material', name: 'face'},
  },
  PASSWORD: {
    placeholder: 'Contraseña',
    maxLength: 30,
    autoCorrect: false,
    secureTextEntry: true,
    leftIcon: {type: 'material', name: 'lock'},
  },
};

export const PROPS_NEW_USER = {
  BASE: {
    maxLength: 20,
    autoCorrect: false,
    leftIcon: {type: 'material', name: 'face'},
  },
  NAME: {
    FIRST: {placeholder: 'Su nombre aquí'},
    LAST: {placeholder: 'Su apellido aquí'},
  },
  HOME: {
    NAME: {
      maxLength: 8,
      leftIcon: {type: 'material', name: 'location-city'},
    },
    BLOCK: {
      maxLength: 8,
      leftIcon: {type: 'material', name: 'domain'},
    },
    NUMBER: {
      maxLength: 8,
      leftIcon: {type: 'material', name: 'home'},
    },
  },
  CAR: {
    ENROLLMENT: {
      maxLength: 8,
      autoCorrect: false,
      leftIcon: {type: 'material', name: 'confirmation-number'},
    },
    BRAND: {
      maxLength: 20,
      leftIcon: {type: 'material', name: 'drive-eta'},
    },
    COLOR: {
      maxLength: 20,
      leftIcon: {type: 'material', name: 'palette'},
    },
  },
  PHONE_NUMBER: {
    maxLength: 11,
  },
};
