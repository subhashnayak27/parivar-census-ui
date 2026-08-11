import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUser } from "../../services/authService";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        email: "",
        mobileNo: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            setLoading(true);

            await registerUser({
                username: form.username,
                password: form.password,
                fullName: form.fullName,
                email: form.email,
                mobileNo: form.mobileNo
            });

            toast.success("Registration successful");

            navigate("/login");

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-6 col-lg-5">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h3 className="text-center mb-4">
                                Create Account
                            </h3>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        value={form.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Mobile Number
                                    </label>

                                    <input
                                        type="text"
                                        name="mobileNo"
                                        className="form-control"
                                        value={form.mobileNo}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Creating Account..."
                                        : "Register"}
                                </button>

                            </form>

                            <div className="text-center mt-3">

                                <span>
                                    Already have an account?{" "}
                                </span>

                                <Link to="/login">
                                    Login
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;