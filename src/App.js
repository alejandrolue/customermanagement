import React from "react"
import './App.css';
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "./pages/homePage/homePage";
import CustomerPage from "./pages/customerPage/customerPage";
import ClientViewPage from "./pages/clientViewPage/clientViewPage";
import FinanceViewPage from "./pages/financeViewPage/financeViewPage";
import TestingPlayground from "./pages/testingPlayground/testingPlayground";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/customer" element={<CustomerPage/>}/>
                <Route path="/client" element={<ClientViewPage/>}/>
                <Route path="/finance" element={<FinanceViewPage/>}/>
                <Route path="/playground" element={<TestingPlayground/>}/>
            </Routes>
        </Router>
        
    );
}

export default App;
