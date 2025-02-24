import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the Event type according to your structure
export interface Event {
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventPrice: number;
  eventLocation: string;
  eventDescription: string;
  eventOrganizer: string;
  eventType: string;
  eventImage: string;
}

export interface CounterState {
  price: number;
  items: number;
  events: Event[];
}

const initialState: CounterState = {
  price: 0,
  items: 0,
  events: [],
};

export const cartSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    incrementPriceByAmount: (state, action: PayloadAction<number>) => {
      state.price += action.payload;
    },
    decrementPriceByAmount: (state, action: PayloadAction<number>) => {
      state.price -= action.payload;
    },
    incrementCartItems: (state) => {
      state.items += 1;
    },
    decrementCartItems: (state) => {
      state.items -= 1;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(
        (event) => event.eventName !== action.payload
      );
    },
    updateEvent: (
      state,
      action: PayloadAction<{ eventName: string; updatedEvent: Partial<Event> }>
    ) => {
      const index = state.events.findIndex(
        (event) => event.eventName === action.payload.eventName
      );
      if (index !== -1) {
        state.events[index] = {
          ...state.events[index],
          ...action.payload.updatedEvent,
        };
      }
    },
  },
});

export const {
  incrementPriceByAmount,
  decrementPriceByAmount,
  incrementCartItems,
  decrementCartItems,
  addEvent,
  removeEvent,
  updateEvent,
} = cartSlice.actions;

export default cartSlice.reducer;
