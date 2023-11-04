import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrders(state, action) {
            state.orders = action.payload;
        },
    },
});

export const { addOrders } = orderSlice.actions;

export default orderSlice.reducer;