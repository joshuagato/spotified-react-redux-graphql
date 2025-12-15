import axios from "axios";
import * as actionTypes from "./actionTypes";
import { authStartLoading, authStopLoading } from "./auth";

const registerSuccess = (details, message) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        details: details,
        message,
    };
};
const registerFailure = (errors) => {
    return {
        type: actionTypes.REGISTER_FAILURE,
        errors: errors?.data?.errors[0]?.message,
        // errors: errors,
    };
};
export const registerUser = (userInput) => {
    return (dispatch) => {
        dispatch(authStartLoading());

        const graphqlQuery = {
            query: `
                mutation RegisterUser($firstname: String!, $lastname: String!, $email: String!, $password: String!) {
                    createUser(userInput: { firstname: $firstname, lastname: $lastname, email: $email, password: $password }) {
                        id firstname lastname email
                    }
                }
            `,
            variables: {
                firstname: userInput.firstname,
                lastname: userInput.lastname,
                email: userInput.email,
                password: userInput.password,
            },
        };

        axios
            .post(process.env.REACT_APP_GRAPHQL_URL, graphqlQuery)
            .then((response) => {
                const message =
                    "Registration Successful. Login to enjoy some good music.";
                dispatch(registerSuccess(response.data.data, message));
                dispatch(authStopLoading());
                // dispatch(registerSuccess(response.data.data.createUser));
                // A Redirect and/or success message has to be displayed to the user
            })
            .catch((error) => {
                // console.log(error.response.data.errors[0].message); //we can map through this array
                console.log("error", error.response);
                dispatch(registerFailure(error.response));
                dispatch(authStopLoading());
            });
    };
};
