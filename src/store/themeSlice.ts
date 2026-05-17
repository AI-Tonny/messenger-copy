import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from './index';

interface ThemeState {
    darkMode: boolean;
}

const initialState: ThemeState = {
    darkMode: false,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDarkModeAction: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        },
    },
});

export const { setDarkModeAction } = themeSlice.actions;

export const toggleThemeThunk = (isDark: boolean) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setDarkModeAction(isDark));
        await AsyncStorage.setItem('settings_dark_mode', JSON.stringify(isDark));
    } catch (error) {
        console.error('Помилка збереження теми:', error);
    }
};

export const loadSavedThemeThunk = () => async (dispatch: AppDispatch) => {
    try {
        const savedDarkMode = await AsyncStorage.getItem('settings_dark_mode');
        if (savedDarkMode !== null) {
            dispatch(setDarkModeAction(JSON.parse(savedDarkMode)));
        }
    } catch (error) {
        console.error('Помилка завантаження теми:', error);
    }
};

export default themeSlice.reducer;