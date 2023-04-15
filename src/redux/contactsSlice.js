import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOperations";

const contactsInitialState = {
	items: [],
	isLoading: false,
    error: null
}

const handlePending = state => {
	return {
		...state,
		isLoading: true
	}
};

const handleRejected = (state, action) => {
	return {
		...state,
		isLoading: false,
		error: action.payload,
	}
};

const handleFulfilled = (state, action) => {
	return {
		...state,
		items: [...action.payload],
		isLoading: false,
		error: null,
	}
}

const contactsSlice = createSlice({
	name: 'contacts',
	initialState: contactsInitialState,
	extraReducers: {
		[fetchContacts.pending]: handlePending,
		[addContact.pending]: handlePending,
		[deleteContact.pending]: handlePending,
		[fetchContacts.rejected]: handleRejected,
		[addContact.rejected]: handleRejected,
		[deleteContact.rejected]: handleRejected,
		[fetchContacts.fulfilled]: handleFulfilled,
		[addContact.fulfilled]: handleFulfilled,
		[deleteContact.fulfilled]: handleFulfilled,
	}
})

export const contactsReducer = contactsSlice.reducer;
