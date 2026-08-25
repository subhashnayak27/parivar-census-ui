import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
    forgotPassword
} from "../../services/authService";


function ForgotPassword() {

    const [email, setEmail] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email.trim()) {

            toast.error(
                "Please enter your email address"
            );

            return;
        }


        try {

            setLoading(true);

            await forgotPassword(email);

            toast.success(
                "Password reset link has been generated"
            );

            setEmail("");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to process forgot password request"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="login-page">

            <div className="forgot-password-card">

                <div className="text-center mb-4">

                    <div className="login-logo">

                        <i className="bi bi-key-fill"></i>

                    </div>

                    <h2>
                        Forgot Password?
                    </h2>

                    <p className="text-muted">

                        Enter your registered email address.
                        We will help you reset your password.

                    </p>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="mb-4">

                        <label className="form-label">

                            Email Address

                        </label>

                        <input

                            type="email"

                            className="form-control"

                            placeholder="Enter your email"

                            value={email}

                            onChange={(e) =>
                                setEmail(e.target.value)
                            }

                            required

                        />

                    </div>


                    <button

                        type="submit"

                        className="btn btn-primary w-100 login-button"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Please wait..."

                                : "Send Reset Link"

                        }

                    </button>

                </form>


                <div className="text-center mt-4">

                    <Link
                        to="/login"
                        className="text-decoration-none"
                    >

                        <i className="bi bi-arrow-left me-2"></i>

                        Back to Login

                    </Link>

                </div>

            </div>

        </div>

    );

}


export default ForgotPassword;