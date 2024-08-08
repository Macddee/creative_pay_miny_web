import { createSlice } from "@reduxjs/toolkit";

const getEvents = localStorage.getItem("events");



const initialState = {
    events: getEvents ? JSON.parse(getEvents) : [{
        "id": 1,
        "eventName": "Event 1",
        "location": "Location 1",
        "date": "2022-01-01",
        "description": "This is a description for Event 1."
    },
    {
        "id": 2,
        "eventName": "Event 2",
        "location": "Location 2",
        "date": "2022-02-02",
        "description": "This is a description for Event 2."
    },
    {
        "id": 3,
        "eventName": "Event 3",
        "location": "Location 3",
        "date": "2022-03-03",
        "description": "This is a description for Event 3."
    }],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
        addEvent: (state, action) => {

            const newEvent = action.payload

            if (state.events.length !== 0) {
                const existingEvent = state.events.find((event) => event.id === newEvent.id);
                if (!existingEvent) {

                    const maxId = state.events.reduce((max, event) => (event.id > max ? event.id : max), state.events[0].id);

                    newEvent.id = maxId + 1;
                    state.events.push(newEvent);
                    state.isSuccess = true;
                }
            } else {
                newEvent.id = 1;
                state.events.push(newEvent);
                state.isSuccess = true;
            }





        },
        editEvent: (state, action) => {
            const { id, eventName, date, time, location, description } = action.payload;
            const existingEvent = state.events.find((event) => event.id === id);
            if (existingEvent) {
                existingEvent.eventName = eventName;
                existingEvent.date = date;
                existingEvent.time = time;
                existingEvent.location = location;
                existingEvent.description = description;
            }
            state.isSuccess = true;
        },
        deleteEvent: (state, action) => {
            state.events = state.events.filter((event) => event.id !== action.payload);
        }
    },
});


export const { reset, addEvent, editEvent, deleteEvent } = eventSlice.actions;
export default eventSlice.reducer;
