import { createSlice } from "@reduxjs/toolkit";

const contactsInitialState = {
	items: [],
	isLoading: false,
    error: null
}

const contactsSlice = createSlice({
	name: 'contacts',
	initialState: contactsInitialState,
	reducers: {
		fetchingInProgress(state) {
			// state.isLoading = true;
			return {
				...state,
				isLoading: true
			}
		},
		fetchingSuccess(state, action) {
			// state.isLoading = false;
			// state.error = null;
			// state.items = action.payload;
			return {
				...state,
				items: [...action.payload],
				isLoading: false,
				error: null,
			}
		},
		fetchingError(state, action) {
			// state.isLoading = false;
			// state.error = action.payload;
			return {
				...state,
				isLoading: false,
				error: action.payload,
			}
		},
		
	}
})

export const contactsReducer = contactsSlice.reducer;

export const { fetchingInProgress, fetchingSuccess, fetchingError } = contactsSlice.actions;
