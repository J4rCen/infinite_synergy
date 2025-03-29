import { configureStore } from "@reduxjs/toolkit";
import userSlicesReducer from './slices/usersSlices'

const store = configureStore({
    reducer: {
        users: userSlicesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store