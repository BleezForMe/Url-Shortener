import { createSlice } from '@reduxjs/toolkit';
import { shortenUrl, getShortenedUrl } from '../api/api';

const initialState = {
    url: null,
    error: null,
};

const urlSlice = createSlice({
    name: 'url',
    initialState,
    reducers: {
        setUrl(state, action) {
            state.url = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setUrl, setError } = urlSlice.actions;

export const shortenUrlAsync = (url) => async (dispatch) => {
    try {
        const data = await shortenUrl(url);
        dispatch(setUrl(data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const getShortenedUrlAsync = (id) => async (dispatch) => {
    try {
        const data = await getShortenedUrl(id);
        dispatch(setUrl(data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export default urlSlice.reducer;
