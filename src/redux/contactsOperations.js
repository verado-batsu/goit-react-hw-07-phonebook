import axios from "axios";
import { fetchingInProgress, fetchingSuccess, fetchingError } from "./contactsSlice";

axios.defaults.baseURL = 'https://6439d32ebd3623f1b9a891fd.mockapi.io/phonebook';

export const fetchContacts = () => async dispatch => {
	try {
		dispatch(fetchingInProgress());
		const response = await axios.get('/contacts');
		const contacts = response.data;
		dispatch(fetchingSuccess(contacts));
	} catch (error) {
		dispatch(fetchingError(error.message));
	}
}

export const addContact = (contact) => async dispatch => {
	try {
		dispatch(fetchingInProgress());
		await axios.post('/contacts', contact);
		dispatch(fetchContacts());
	} catch (error) {
		dispatch(fetchingError(error.message));
	}
}

export const deleteContact = (id) => async dispatch => {
	try {
		dispatch(fetchingInProgress());
		await axios.delete(`/contacts/${id}`);
		dispatch(fetchContacts());
	} catch (error) {
		dispatch(fetchingError(error.message));
	}
}


// addContact: {
// 			reducer(state, action) {
// 				let isNameRepeat = false;
// 				state.items.map(contact => {
// 					if (contact.name.toLowerCase() === action.payload.name.toLowerCase()) {
// 						alert(`${contact.name} is already in contacts.`);
// 						isNameRepeat = true;
// 					}
// 					return null;
// 				});
				
// 				if (isNameRepeat) {
// 					return {
// 						...state
// 					};
// 				} else {
// 					return {
// 						...state,
// 						items: [...state.items, action.payload]
// 					};
// 				}
// 			},
// 			prepare(contact) {
// 				return {
// 					payload: {
// 						...contact,
// 						id: nanoid(),
// 					}
// 				}
// 			}
// 		},
// deleteContact(state, action) {
// 			return {
// 				...state,
// 				items: [ ...state.filter(contact => contact.id !== action.payload)]
// 			}	
// 		},