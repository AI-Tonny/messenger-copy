import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfile {
    name: string;
    username: string;
    avatar?: string;
}

interface AuthState {
    user: UserProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProfile>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;

export const registerUserThunk = (user: UserProfile) => async (dispatch: any) => {
    try {
        await AsyncStorage.setItem('@user_session', JSON.stringify(user));
        dispatch(setUser(user));
    } catch (e) {
        console.error('Помилка збереження сесії:', e);
    }
};

export const checkAuthThunk = () => async (dispatch: any) => {
    try {
        const session = await AsyncStorage.getItem('@user_session');
        if (session) {
            dispatch(setUser(JSON.parse(session)));
        } else {
            dispatch(clearUser());
        }
    } catch (e) {
        dispatch(clearUser());
    }
};

export const logoutUserThunk = () => async (dispatch: any) => {
    try {
        await AsyncStorage.removeItem('@user_session');
        dispatch(clearUser());
    } catch (e) {
        console.error('Помилка видалення сесії:', e);
    }
};

// Робимо подвійний експорт: дефолтний та іменований, щоб уникнути undefined у store
const authReducer = authSlice.reducer;
export { authReducer };
export default authSlice.reducer;