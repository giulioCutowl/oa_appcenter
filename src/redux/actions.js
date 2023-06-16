import { UPDATE_USER } from "./actionTypes";

export const updateUser = (data) => ({
    type: UPDATE_USER,
    payload: data
});