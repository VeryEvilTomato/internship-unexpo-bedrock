import {INPUT} from '@constants';

// Checkups/Sanitization on login data and user information strings.

export function inputValidation(form) {
  let errors = [];

  form.forEach(field => {
    let pattern = '^$';
    let errorMsgs = {};
    console.log(field);
    switch (field.type) {
      case INPUT.USER:
        pattern = '^[a-z0-9_-]{7,15}$';
        errorMsgs = {
          type: INPUT.USER,
          errors: [
            'Debe contener entre 7 a 15 caracteres',
            'No debe empezar con guión o guión bajo',
            'No debe contener más de dos guión o guión bajo seguidos',
          ],
        };
        break;
      case INPUT.PASSWORD:
        pattern = '^(?=.*?[A-Za-z0-9])(?=.*?[.#?!@$ %^&*-]).{10,30}$';
        errorMsgs = {
          type: INPUT.PASSWORD,
          errors: [
            'Debe contener entre 10 a 30 caracteres',
            'Por lo menos una letra',
            'Por lo menos un número',
            'Por lo menos un caracter especial',
          ],
        };
        break;
      case INPUT.NUMBER:
        break;
      default:
        break;
    }
    errors = field.string.match(new RegExp(pattern))
      ? errors
      : [...errors, errorMsgs];
  });

  return errors;
}
