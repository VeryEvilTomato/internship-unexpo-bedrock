import {INPUT} from '@constants';

// Checkups/Sanitization on login data and user information strings.

export function inputValidation(field) {
  const errors = [];
  let checkups = [];

  switch (field.type) {
    case INPUT.USERNAME:
      checkups = [
        {
          pattern: '^.{7,15}$',
          message: 'Debe contener entre 7 a 15 caracteres',
        },
        {
          pattern: '^[a-z0-9_-]{1,}$',
          message:
            'Únicamente puede contener caracteres alfanuméricos, guión y guión bajo',
        },
      ];
      checkups.forEach(checkup => {
        if (!field.string.match(new RegExp(checkup.pattern))) {
          errors.push({type: 'username', message: checkup.message});
        }
      });
      break;

    case INPUT.PASSWORD:
      checkups = [
        {
          pattern: '^.{10,20}',
          message: 'Debe contener entre 10 a 20 caracteres',
        },
        {
          pattern: '^(?=.*?[A-Za-z]).{0,}$',
          message: 'Por lo menos una letra',
        },
        {
          pattern: '^(?=.*?[0-9]).{0,}$',
          message: 'Por lo menos un número',
        },
        /*
        {
          pattern: '^(?=.*?[.#?!@$ %^&*-]).{0,}$',
          message: 'Por lo menos un caracter especial',
        },
        */
      ];
      checkups.forEach(checkup => {
        if (!field.string.match(new RegExp(checkup.pattern))) {
          errors.push({type: 'password', message: checkup.message});
        }
      });
      break;

    case INPUT.NUMBER:
      break;
    case INPUT.FIRST_NAME:
      checkups = [
        {
          pattern: '^.{2,}$',
          message: 'Por favor escriba su nombre',
        },
      ];
      checkups.forEach(checkup => {
        if (!field.string.match(new RegExp(checkup.pattern))) {
          errors.push({type: 'first_name', message: checkup.message});
        }
      });
      break;
    case INPUT.LAST_NAME:
      checkups = [
        {
          pattern: '^.{2,}$',
          message: 'Por favor escriba su apellido',
        },
      ];
      checkups.forEach(checkup => {
        if (!field.string.match(new RegExp(checkup.pattern))) {
          errors.push({type: 'last_name', message: checkup.message});
        }
      });
      break;
    default:
      break;
  }
  return errors;
}
