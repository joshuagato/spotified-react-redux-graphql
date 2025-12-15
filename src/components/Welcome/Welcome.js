import React, { Component } from "react";
import "./Welcome.scss";
import Login from "./Login/Login";
import Register from "./Register/Register";
import LoadingOverlay from "react-loading-overlay";

class Welcome extends Component {
    state = {
        registered: true,
        loading: false,
    };

    formSwitchHandler = () => {
        this.setState((prevState) => {
            return { registered: !prevState.registered };
        });
    };

    handleChildData = (loading) => {
        this.setState({ loading });
    };

    render() {
        let form = this.state.registered ? (
            <Login
                sendDataToParent={this.handleChildData}
                switchForm={this.formSwitchHandler}
            />
        ) : (
            <Register
                sendDataToParent={this.handleChildData}
                switchForm={this.formSwitchHandler}
            />
        );

        return (
            <LoadingOverlay
                active={this.state.loading}
                spinner
                text="Requesting..."
            >
                <div className="welcome">{form}</div>
            </LoadingOverlay>
        );
    }
}

export default Welcome;
