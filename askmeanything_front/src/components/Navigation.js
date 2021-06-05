import React from "react";

import "../css/Navigation.css";

function Navigation () {

    const username = "Leonidas";
    const signedIn = true;

    if (!signedIn) {
        return (
            <nav>
                <ul>
                    <li><a className={"active"} href={"/"}>Home</a></li>
                    <li className={"pos_right"}><a href={"/"}>Sign In</a></li>
                    <li className={"pos_right"}><a href={"/"}>Sign Up</a></li>
                </ul>
            </nav>
        )
    }
    else {
        return (
            <nav>
                <ul>
                    <li><a className={"active"} href={"/"}>Home</a></li>
                    <li className={"pos_right"}><a href={"/"}>Sign Out</a></li>
                    <li className={"pos_right usr_welcome"}>Welcome, {`${username}`}</li>
                </ul>
            </nav>
        )
    }
}

export default Navigation;