import { UPDATE_USER } from "../actionTypes";
import DefaultPreference from 'react-native-default-preference';

const initialState = {
    user: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case UPDATE_USER: {

            if (action.payload) {
                DefaultPreference.set('user', JSON.stringify(action.payload))
            }
            else {
                DefaultPreference.set('user', "")
            }

            var user

            if (action.payload) {
                user = action.payload
            }

            return {
                ...state,
                user: user
            };
        }
        default:
            return state;
    }
}
