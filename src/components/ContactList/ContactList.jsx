import { ContactListEl } from 'components/ContactList/ContactList.styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { deleteContact, fetchContacts } from 'redux/contactsOperations';
import {
    selectContacts,
    selectError,
    selectFilter,
    selectIsLoading,
} from 'redux/selectors';
import { Oval } from 'react-loader-spinner';

export function ContactList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const contacts = useSelector(selectContacts);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const filter = useSelector(selectFilter);

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(normalizedFilter);
    });

    function handleDeleteClick(e) {
        dispatch(deleteContact(e.target.id));
    }

    return (
        <ContactListEl>
            {filteredContacts.length > 0 &&
                filteredContacts.map(({ id, name, phone }) => {
                    return (
                        <li key={id}>
                            <span>
                                {name}: {phone}
                            </span>
                            <button
                                id={id}
                                type="button"
                                onClick={handleDeleteClick}
                            >
                                Delete
                            </button>
                        </li>
                    );
                })}
            {isLoading && (
                <Oval
                    height={40}
                    width={40}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            )}
            {error && Notify.failure(error)}
        </ContactListEl>
    );
}
