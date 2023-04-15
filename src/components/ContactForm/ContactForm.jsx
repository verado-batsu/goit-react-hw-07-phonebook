import { Formik, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { FormStyled } from 'components/ContactForm/ContactForm.styled';
import { schema } from './schema';
import { addContact } from 'redux/contactsOperations';
import { selectContacts } from 'redux/selectors';

export function ContactForm() {
    const dispatch = useDispatch();

    const contacts = useSelector(selectContacts);

    const initialValues = {
        name: '',
        phone: '',
    };

    const handleSubmit = (values, { resetForm }) => {
        let isNameRepeat = false;
        contacts.map(contact => {
            if (contact.name.toLowerCase() === values.name.toLowerCase()) {
                Notify.failure(`${contact.name} is already in contacts.`);
                isNameRepeat = true;
            }
            return null;
        });

        if (isNameRepeat) {
            return;
        } else {
            dispatch(addContact(values));
            resetForm();
            return;
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={schema}
        >
            <FormStyled autoComplete="on">
                <label>
                    <p>Name</p>
                    <Field type="text" name="name" />
                    <ErrorMessage component="div" name="name" />
                </label>
                <label>
                    <p>Number</p>
                    <Field type="tel" name="phone" />
                    <ErrorMessage component="div" name="phone" />
                </label>
                <button type="submit">Add contact</button>
            </FormStyled>
        </Formik>
    );
}
