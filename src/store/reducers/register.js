import * as actionTypes from "../actions/actionTypes";

const initialState = {
    details: "",
    errors: "",
    message: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                details: action.details,
                message: action.message,
            };

        case actionTypes.REGISTER_FAILURE:
            return { ...state, errors: action.errors };

        default:
            return state;
    }
};

export default reducer;
