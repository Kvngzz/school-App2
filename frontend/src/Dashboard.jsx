import React from "react";
import "./Dashboard.css";

function Dashboard({ student, onLogout }) {

    const studentID = "STU-" + String(student.id).padStart(4, "0");

    const registrationDate = student.created_at
        ? new Date(student.created_at).toLocaleDateString()
        : "Not available";

    const initial = student.fullname
        ? student.fullname.charAt(0).toUpperCase()
        : "S";

    return (

        <div className="student-dashboard">

            {/* SIDEBAR */}

            <aside className="sidebar">

                <div className="brand">
                    <div className="brand-logo">M</div>

                    <div>
                        <h2>MyStudent</h2>
                        <span>STUDENT PORTAL</span>
                    </div>
                </div>

                <div className="sidebar-profile">

                    <div className="avatar">
                        {initial}
                    </div>

                    <h3>{student.fullname}</h3>

                    <p>Registered Student</p>

                </div>

                <div className="nav-title">
                    MENU
                </div>

                <nav className="sidebar-nav">

                    <a href="#overview" className="active">
                        <span>▦</span>
                        Dashboard
                    </a>

                    <a href="#profile">
                        <span>👤</span>
                        My Profile
                    </a>

                    <a href="#course">
                        <span>📚</span>
                        My Course
                    </a>

                    <a href="#information">
                        <span>📋</span>
                        Registration
                    </a>

                </nav>

                <div className="sidebar-bottom">

                    <p>Need assistance?</p>

                    <small>Contact your training administrator.</small>

                    <button onClick={onLogout}>
                        ⇥ Logout
                    </button>

                </div>

            </aside>


            {/* MAIN AREA */}

            <main className="dashboard-main">

                {/* HEADER */}

                <header className="dashboard-header">

                    <div>
                        <h2>Dashboard</h2>
                        <p>Manage your student account</p>
                    </div>

                    <div className="header-profile">

                        <div className="small-avatar">
                            {initial}
                        </div>

                        <div>
                            <strong>{student.fullname}</strong>
                            <small>Student Account</small>
                        </div>

                    </div>

                </header>


                {/* WELCOME */}

                <section className="welcome-banner" id="overview">

                    <div className="welcome-text">

                        <span>WELCOME TO YOUR STUDENT PORTAL</span>

                        <h1>Hello, {student.fullname}!</h1>

                        <p>
                            Your learning journey starts here.
                            Manage your profile and view your course
                            registration details from your dashboard.
                        </p>

                    </div>

                    <div className="welcome-art">
                        🎓
                    </div>

                </section>


                {/* SUMMARY CARDS */}

                <section className="stats-grid">

                    <div className="stat-card">

                        <div className="stat-icon icon-blue">
                            👤
                        </div>

                        <div>
                            <p>Student ID</p>
                            <h3>{studentID}</h3>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon icon-green">
                            📚
                        </div>

                        <div>
                            <p>Registered Course</p>
                            <h3>1 Course</h3>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon icon-orange">
                            ✓
                        </div>

                        <div>
                            <p>Account Status</p>
                            <h3 className="active-status">Active</h3>
                        </div>

                    </div>

                </section>


                {/* INFORMATION SECTION */}

                <section className="content-grid">

                    {/* PROFILE */}

                    <div className="dashboard-card" id="profile">

                        <div className="card-header">
                            <h3>Personal Information</h3>
                            <span>MY PROFILE</span>
                        </div>

                        <div className="profile-center">

                            <div className="profile-avatar">
                                {initial}
                            </div>

                            <h2>{student.fullname}</h2>

                            <p>Registered Student</p>

                        </div>

                        <div className="information-list">

                            <div>
                                <span>Student ID</span>
                                <strong>{studentID}</strong>
                            </div>

                            <div>
                                <span>Full Name</span>
                                <strong>{student.fullname}</strong>
                            </div>

                            <div>
                                <span>Email Address</span>
                                <strong>{student.email}</strong>
                            </div>

                            <div>
                                <span>Phone Number</span>
                                <strong>{student.phone || "Not provided"}</strong>
                            </div>

                        </div>

                    </div>


                    {/* COURSE */}

                    <div className="dashboard-card" id="course">

                        <div className="card-header">
                            <h3>My Course</h3>
                            <span>COURSE DETAILS</span>
                        </div>

                        <div className="course-illustration">
                            📖
                        </div>

                        <p className="course-caption">
                            YOUR REGISTERED PROGRAM
                        </p>

                        <h2 className="course-name">
                            {student.course || "No course selected"}
                        </h2>

                        <div className="course-divider"></div>

                        <div className="course-information">

                            <div>
                                <span>Registration Status</span>
                                <strong className="active-status">
                                    Registered
                                </strong>
                            </div>

                            <div>
                                <span>Registration Date</span>
                                <strong>{registrationDate}</strong>
                            </div>

                            <div>
                                <span>Student Number</span>
                                <strong>{studentID}</strong>
                            </div>

                        </div>

                    </div>

                </section>


                {/* REGISTRATION SUMMARY */}

                <section className="dashboard-card registration-card"
                    id="information">

                    <div className="card-header">
                        <h3>Registration Summary</h3>
                        <span>ACCOUNT OVERVIEW</span>
                    </div>

                    <div className="summary-grid">

                        <div>
                            <span>Registration</span>
                            <strong>Completed</strong>
                        </div>

                        <div>
                            <span>Email</span>
                            <strong>{student.email}</strong>
                        </div>

                        <div>
                            <span>Account</span>
                            <strong className="active-status">
                                Active
                            </strong>
                        </div>

                    </div>

                </section>


                {/* FOOTER */}

                <footer className="dashboard-footer">

                    <p>
                        © {new Date().getFullYear()} MyStudent Portal.
                        All Rights Reserved.
                    </p>

                    <p>
                        Empowering Students Through Education.
                    </p>

                </footer>

            </main>

        </div>

    );

}

export default Dashboard;