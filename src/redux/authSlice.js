import { createSlice } from '@reduxjs/toolkit';

const initialState={
    currentUser: null,
    loading: false,
    isAutenticated: false,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser(state, action) {
            state.isAutenticated = action.payload.isAuthenticated; // true si hay un usuario actual
            state.token = action.payload.token; // token de autenticación
            state.loading = false; // Cambia el estado de carga a falso
        },
        logoutUser(state) {
            state.currentUser = null; // Reinicia el usuario actual
            state.isAutenticated = false; // Cambia el estado de autenticación a falso
            state.token = null; // Reinicia el token
            state.loading = false; // Cambia el estado de carga a falso
            localStorage.removeItem('token'); // Elimina el token del almacenamiento local
        }
    }
})

export const { setLoading, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;