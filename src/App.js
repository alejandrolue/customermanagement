import React from "react"
import './App.css';
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "./pages/homePage/homePage";
import CustomerForm from "./components/CustomerForm/customerForm";
import CustomerPage from "./pages/customerPage/customerPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/customer" element={<CustomerPage/>}/>
            </Routes>
        </Router>
        
    );
}

export default App;
