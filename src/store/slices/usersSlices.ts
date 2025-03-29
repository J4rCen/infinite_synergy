import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userData from './../../../MOCK_DATA.json'

export interface IUserSlices {
    id: number,
    first_name: string,
    last_name: string,
    age: number,
    email: string
}

const initialState: IUserSlices[] = userData

const userSlices = createSlice(
    {
        name: 'users',
        initialState,
        reducers: {
            dataChanges: (state, actins: PayloadAction<{id: number | undefined, data: IUserSlices}>) => {
                const {id, data} = actins.payload
                const userIndex = state.findIndex(user => user.id === id)

                if (userIndex !== -1) {
                    state[userIndex] = { ...state[userIndex], ...data };
                }
            }
        }
    }
)

export const {dataChanges} = userSlices.actions
export default userSlices.reducer