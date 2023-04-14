import * as yup from 'yup';

import { isValidName, isValidPhone } from './addMethodContactFormYup';

const nameRegex = "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
const invalidNameMessage =
    "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";

yup.addMethod(yup.string, 'isValidName', isValidName);

yup.addMethod(yup.string, 'isValidPhone', isValidPhone);

const phoneRegex =
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const invalidPhoneMessage =
    'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +';

export const schema = yup.object({
    name: yup.string().isValidName(nameRegex, invalidNameMessage).required(),
    number: yup
        .string()
        .isValidPhone(phoneRegex, invalidPhoneMessage)
        .min(7)
        .max(12)
        .required(),
});