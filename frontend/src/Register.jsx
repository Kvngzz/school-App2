import React from "react";

function Register({
    form,
    handleChange,
    register,
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

                <h2>Student Registration</h2>

                <p className="subtitle">
                    Create your student account
                </p>

                <form onSubmit={register}>

                    <input
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        value={form.fullname}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                    />

                    <select
                        name="course"
                        value={form.course}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Course
                        </option>

                        <option value="Fullstack Web Development">
                            Fullstack Web Development
                        </option>

                        <option value="Mobile App Development">
                            Mobile App Development
                        </option>

                        <option value="Java Programming">
                            Java Programming
                        </option>

                        <option value="Python Programming">
                            Python Programming
                        </option>

                    </select>

                    <input
                        type="password"
                        name="password"
                        placeholder="Create Password (minimum 8 characters)"
                        value={form.password}
                        onChange={handleChange}
                        minLength="8"
                        required
                    />

                    <div className="message">
                        {message}
                    </div>

                    <button className="submit-btn" type="submit">
                        Register Now
                    </button>

                </form>

                <p className="link">

                    Already have an account?{" "}

                    <span onClick={() => {

                        setPage("login");
                        setMessage("");

                    }}>
                        Login Here
                    </span>

                </p>

            </div>

        </>

    );

}

export default Register;