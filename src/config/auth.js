import React, {useState} from "react";
import {auth} from "./firebase";

export default function Auth() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const test = () => {
        auth.signInWithEmailAndPassword(email, password).then(r => r.user)
    }
    return (
        <div>
            <div className="login-container">
                <input onChange={(e) => setEmail(e.target.value)}/>
                <input onChange={(e) => setPassword(e.target.value)}/>
            </div>
        </div>
    )
}