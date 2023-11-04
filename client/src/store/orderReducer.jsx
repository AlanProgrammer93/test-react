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
        removeOrder(state, action) {
            console.log(action.payload);
            state.orders = state.orders.filter(o =>
                o._id !== action.payload
            );
        },
    },
});

export const { addOrders, removeOrder } = orderSlice.actions;

export default orderSlice.reducer;