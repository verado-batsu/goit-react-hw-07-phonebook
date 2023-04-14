import { Formik, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';

import { FormStyled } from 'components/ContactForm/ContactForm.styled';
import { addContact } from 'redux/contactsSlice';
import { schema } from './schema';

export function ContactForm() {
    const dispatch = useDispatch();

    const initialValues = {
        name: '',
        number: '',
    };

    const handleSubmit = (values, { resetForm }) => {
        dispatch(addContact(values));
        resetForm();
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
                    <Field type="tel" name="number" />
                    <ErrorMessage component="div" name="number" />
                </label>
                <button type="submit">Add contact</button>
            </FormStyled>
        </Formik>
    );
}
