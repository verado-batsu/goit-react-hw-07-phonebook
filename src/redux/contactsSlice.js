import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from 'nanoid';

const contactsInitialState = [
	// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
	// { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
	// { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
	// { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
]

const contactsSlice = createSlice({
	name: 'contacts',
	initialState: contactsInitialState,
	reducers: {
		addContact: {
			reducer(state, action) {
				let isNameRepeat = false;
				state.map(contact => {
					if (contact.name.toLowerCase() === action.payload.name.toLowerCase()) {
						alert(`${contact.name} is already in contacts.`);
						isNameRepeat = true;
					}
					return null;
				});
				
				if (isNameRepeat) {
					return [...state];
				} else {
					return [...state, action.payload];
				}
			},
			prepare(contact) {
				return {
					payload: {
						...contact,
						id: nanoid(),
					}
				}
			}
		},
		deleteContact(state, action) {
			return [
				...state.filter(contact => contact.id !== action.payload)
			]	
		},
	}
})

export const contactsReducer = contactsSlice.reducer;

export const { addContact, deleteContact } = contactsSlice.actions;
