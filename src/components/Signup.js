import { Header } from "./Header"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const navigate = useNavigate();
    const [signupResponse, setSignupResponse] = useState("");
    const handleSignUp = () => {
        var email = document.getElementById("floatingInput").value
        var password = document.getElementById("floatingPassword").value
        console.log(email, password)

        axios.post("http://localhost:8080/api/v1/signup", {"email": email, "password": password})
            .then(res => {
                console.log(res);
                console.log(res.data);
                setSignupResponse(res)
        })
    };
    return <main class="form-signin w-100 m-auto">
        <div class="text-center">
        <h1 id="h1" class="h3 mb-3 fw-normal">Sign Up</h1>
    
        <div class="form-floating">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="floatingInput" placeholder="promo code"/>
          <label for="floatingInput">Promo Code</label>
        </div>
        
        <button type="button" class="w-100 btn btn-lg btn-dark" onClick={handleSignUp}>Sign Up</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
        </div>
    </main>
    
}