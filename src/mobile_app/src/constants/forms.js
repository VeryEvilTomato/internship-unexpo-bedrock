/*
 * Each time a form is initialized or
 * reset, the state is filled with these
 * constants
*/

export const FORM_INIT = {
    CREDENTIALS: {
        username: ``,
        password: ``
    },
    NEW_USER: {
        first_name: ``,
        last_name: ``,
        residenceName: ``,
        streetBlockNumber: ``,
        houseNumber: ``,
        phoneNumber: ``,
    }
}

export const PROPS_CREDENTIALS = {
    USERNAME: {
        placeholder: `Usuario`,
        maxLength: 30,
        autoCorrect: false,
        leftIcon: { type: `material`, name: `face` },
    },
    PASSWORD: {
        placeholder: `Contraseña`,
        maxLength: 30,
        autoCorrect: false,
        secureTextEntry: true,
        leftIcon: { type: `material`, name: `lock` },
    },
}

export const PROPS_NEW_USER = {
    BASE: {
        maxLength: 30,
        autoCorrect: false,
        leftIcon: { type: `material`, name: `face` },
    },
}
