import { ContactListEl } from 'components/ContactList/ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';

export function ContactList() {
    const dispatch = useDispatch();

    const contacts = useSelector(getContacts);
    const filter = useSelector(getFilter);

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(normalizedFilter);
    });

    function handleDeleteClick(e) {
        dispatch(deleteContact(e.target.id));
    }

    return (
        <ContactListEl>
            {filteredContacts.map(({ id, name, number }) => {
                return (
                    <li key={id}>
                        <span>
                            {name}: {number}
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
        </ContactListEl>
    );
}
