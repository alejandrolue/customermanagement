import React, {useState} from "react"
import {auth} from "../../../config/firebase";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginHandler = () => {
        auth.signInWithEmailAndPassword(email, password).then(r => console.log(r.user.isAuthenticated()))
    }
    return (
        <div className="loginHandler-container">
            <input onChange={(e) => setEmail(e.target.value)}/>
            <input onChange={(e) => setPassword(e.target.value)}/>
        </div>
    )
}