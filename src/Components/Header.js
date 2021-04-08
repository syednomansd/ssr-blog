import React from 'react'
import {  Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="wrapper">
                <div className="header">
                    <div className="logo">
                        <Link to="/">
                            <img src="/images/logo.png" alt="" />
                        </Link>
                    </div>

                    <div className="clear"></div>
                </div>
            </div>
        </header>
    )
}

export default Header