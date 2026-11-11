// Login.jsx

import React from "react";

function Login({
    form,
    handleChange,
    login,
    message,
    setPage,
    setMessage
}) {

    return (

        <>

            <div className="navbar">
                <h2>MyStudent Portal</h2>
            </div>

            <div className="container">

                <h2>Student Login</h2>

                <p className="subtitle">
                    Welcome back! Login to continue
                </p>

                <form onSubmit={login}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <div className="message">
                        {message}
                    </div>

                    <button className="submit-btn" type="submit">
                        Login
                    </button>

                </form>

                <p className="link">

                    Don't have an account?{" "}

                    <span onClick={() => {

                        setPage("register");
                        setMessage("");

                    }}>
                        Sign Up
                    </span>

                </p>

            </div>

        </>

    );

}

export default Login;