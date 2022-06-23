import React, { Component} from "react";
import {Link} from "react-router-dom";
import './navbar.css';
export default class Navbar extends Component {

    render() {

        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Algorithm Visualiser</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">

                        <li className="navbar-item">
                            <Link to="/" className = "nav-link">Sorting</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/path" className = "nav-link">Pathfinding</Link>
                        </li>

                    </ul>
                </div>

            </nav>
        );

    }
}

