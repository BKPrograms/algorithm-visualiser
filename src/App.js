import './App.css';
import SortingVisualiser from "./components/SortingVisualiser";
import PathFindingVisualiser from "./components/PathFinding";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Navbar from "./components/navbar.component";
import React from ".";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <br/>
            <Routes>

                <Route path="/" exact element={<SortingVisualiser/>}/>
                <Route path="/path" exact element={<PathFindingVisualiser/>}/>


            </Routes>
        </BrowserRouter>
    );
}

export default App;
