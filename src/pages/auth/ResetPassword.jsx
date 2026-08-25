import { useState } from "react";
import {
    Link,
    useNavigate,
    useSearchParams
} from "react-router-dom";

import { toast } from "react-toastify";

import {
    resetPassword
} from "../../services/authService";


function ResetPassword() {

    const navigate = useNavigate();

    const [searchParams] =
        useSearchParams();

    const token =
        searchParams.get("token");


    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!token) {

            toast.error(
                "Invalid password reset link"
            );

            return;
        }


        if (!newPassword) {

            toast.error(
                "Please enter a new password"
            );

            return;
        }


        if (newPassword.length < 6) {

            toast.error(
                "Password must be at least 6 characters"
            );

            return;
        }


        if (
            newPassword !== confirmPassword
        ) {

            toast.error(
                "Passwords do not match"
            );

            return;
        }


        try {

            setLoading(true);

            await resetPassword(
                token,
                newPassword
            );


            toast.success(
                "Password reset successfully. Please login."
            );


            setTimeout(() => {

                navigate(
                    "/login",
                    {
                        replace: true
                    }
                );

            }, 1500);


        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to reset password"
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

                        <i className="bi bi-shield-lock-fill"></i>

                    </div>

                    <h2>
                        Reset Password
                    </h2>

                    <p className="text-muted">

                        Please enter your new password.

                    </p>

                </div>


                {

                    !token && (

                        <div
                            className="alert alert-danger"
                        >

                            Invalid or missing reset token.

                        </div>

                    )

                }


                {

                    token && (

                        <form
                            onSubmit={handleSubmit}
                        >

                            <div className="mb-3">

                                <label
                                    className="form-label"
                                >

                                    New Password

                                </label>

                                <input

                                    type="password"

                                    className="form-control"

                                    placeholder="Enter new password"

                                    value={newPassword}

                                    onChange={(e) =>
                                        setNewPassword(
                                            e.target.value
                                        )
                                    }

                                    required

                                />

                            </div>


                            <div className="mb-4">

                                <label
                                    className="form-label"
                                >

                                    Confirm Password

                                </label>

                                <input

                                    type="password"

                                    className="form-control"

                                    placeholder="Confirm new password"

                                    value={confirmPassword}

                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
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

                                        ? "Resetting..."

                                        : "Reset Password"

                                }

                            </button>

                        </form>

                    )

                }


                <div className="text-center mt-4">

                    <Link
                        to="/login"
                        className="text-decoration-none"
                    >

                        Back to Login

                    </Link>

                </div>

            </div>

        </div>

    );

}


export default ResetPassword;