import React from "react";

import "../css/Navigation.css";

function Navigation () {
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

export default Navigation;