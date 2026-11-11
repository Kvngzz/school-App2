// App.jsx

import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import "./Auth.css";

function App() {

    const [page, setPage] = useState("login");
    const [student, setStudent] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        phone: "",
        course: "",
        password: ""
    });

    // CHECK LOGIN STATUS
    useEffect(() => {

        fetch("/dashboard")
            .then(response => {

                if (!response.ok) {
                    throw new Error("Not logged in");
                }

                return response.json();

            })
            .then(data => {

                setStudent(data);
                setPage("dashboard");

            })
            .catch(() => {

                setPage("login");

            })
            .finally(() => {

                setLoading(false);

            });

    }, []);


    // HANDLE FORM INPUT
    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }


    // REGISTRATION
    async function register(e) {

        e.preventDefault();
        setMessage("");

        try {

            const response = await fetch("/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(form)

            });

            const data = await response.json();

            if (response.ok) {

                setForm({
                    fullname: "",
                    email: "",
                    phone: "",
                    course: "",
                    password: ""
                });

                setMessage("Registration successful! Please login.");
                setPage("login");

            } else {

                setMessage(data.message);

            }

        } catch (error) {

            setMessage("Unable to connect to server.");

        }

    }


    // LOGIN
    async function login(e) {

        e.preventDefault();
        setMessage("");

        try {

            const response = await fetch("/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: form.email,
                    password: form.password
                })

            });

            const data = await response.json();

            if (response.ok) {

                const dashboardResponse = await fetch("/dashboard");

                if (!dashboardResponse.ok) {
                    throw new Error("Unable to load dashboard");
                }

                const studentData = await dashboardResponse.json();

                setStudent(studentData);
                setPage("dashboard");
                setMessage("");

            } else {

                setMessage(data.message);

            }

        } catch (error) {

            setMessage("Unable to connect to server.");

        }

    }


    // LOGOUT
    async function logout() {

        try {

            const response = await fetch("/logout", {
                method: "POST"
            });

            if (!response.ok) {
                throw new Error("Logout failed");
            }

            setStudent(null);

            setForm({
                fullname: "",
                email: "",
                phone: "",
                course: "",
                password: ""
            });

            setPage("login");
            setMessage("You have logged out successfully.");

        } catch (error) {

            setMessage("Unable to logout. Please try again.");

        }

    }


    // LOADING SCREEN
    if (loading) {

        return (
            <div className="loading-screen">
                Loading Student Portal...
            </div>
        );

    }


    // DASHBOARD
    if (page === "dashboard" && student) {

        return (
            <Dashboard
                student={student}
                onLogout={logout}
            />
        );

    }


    // REGISTRATION PAGE
    if (page === "register") {

        return (

            <Register
                form={form}
                handleChange={handleChange}
                register={register}
                message={message}
                setPage={setPage}
                setMessage={setMessage}
            />

        );

    }


    // LOGIN PAGE
    return (

        <Login
            form={form}
            handleChange={handleChange}
            login={login}
            message={message}
            setPage={setPage}
            setMessage={setMessage}
        />

    );

}

export default App;