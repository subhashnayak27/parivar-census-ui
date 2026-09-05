import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authService";
import { saveAuth } from "../../utils/tokenStorage";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "../../assets/css/Login.css";

function Login() {

    const { t, i18n } = useTranslation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await login(username, password);

            saveAuth(response.data);

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Invalid Username or Password"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            {/* LEFT SIDE - PUBLIC INFORMATION */}

            <div className="login-info-section">

                <div className="login-brand">

                    <div className="brand-icon">
                        👨‍👩‍👧‍👦
                    </div>

                    <div>

                        <h2>
                            {t("appName")}
                        </h2>

                        <p>
                            Digital Census • Better Planning • Stronger Community
                        </p>

                    </div>

                </div>


                {/* PUBLIC INFORMATION NAVIGATION */}

                <div className="public-info-nav">

                    <Link to="/about-shringirishi" className="public-info-link">
                        <i className="bi bi-info-circle"></i>
                        <span>
                            {i18n.language === "hi"
                                ? "शृंगऋषि के बारे में"
                                : "About Shringirishi"}
                        </span>
                    </Link>

                    <Link to="/temple" className="public-info-link">
                        <i className="bi bi-building"></i>
                        <span>
                            {i18n.language === "hi"
                                ? "मंदिर"
                                : "Temple"}
                        </span>
                    </Link>

                    <Link to="/place-details" className="public-info-link">
                        <i className="bi bi-geo-alt"></i>
                        <span>
                            {i18n.language === "hi"
                                ? "स्थान विवरण"
                                : "Place Details"}
                        </span>
                    </Link>

                </div>


                <div className="login-hero">

                    <h1>
                        {i18n.language === "hi"
                            ? "हमारा परिवार, हमारी पहचान"
                            : "Our Family, Our Identity"}
                    </h1>

                    <p>
                        {i18n.language === "hi"
                            ? "परिवारों की सटीक जानकारी, समाज के समग्र विकास की नींव है।"
                            : "Accurate family information is the foundation for stronger community development."}
                    </p>

                </div>


                {/* PUBLIC STATISTICS */}

                <div className="stats-grid">

                    <div className="stat-card">

                        <i className="bi bi-people-fill"></i>

                        <h2>12,480</h2>

                        <span>
                            {i18n.language === "hi"
                                ? "कुल परिवार"
                                : "Total Families"}
                        </span>

                    </div>


                    <div className="stat-card">

                        <i className="bi bi-person-fill"></i>

                        <h2>48,320</h2>

                        <span>
                            {i18n.language === "hi"
                                ? "कुल सदस्य"
                                : "Total Members"}
                        </span>

                    </div>


                    <div className="stat-card">

                        <i className="bi bi-geo-alt-fill"></i>

                        <h2>412</h2>

                        <span>
                            {i18n.language === "hi"
                                ? "कुल गाँव"
                                : "Villages Covered"}
                        </span>

                    </div>

                </div>


                {/* FEATURES */}

                <div className="features-section">

                    <h4>
                        {i18n.language === "hi"
                            ? "मुख्य विशेषताएं"
                            : "Key Features"}
                    </h4>

                    <div className="features-grid">

                        <div>

                            <i className="bi bi-people"></i>

                            <span>
                                {i18n.language === "hi"
                                    ? "परिवार प्रबंधन"
                                    : "Family Management"}
                            </span>

                        </div>

                        <div>

                            <i className="bi bi-bar-chart-fill"></i>

                            <span>
                                {i18n.language === "hi"
                                    ? "डेटा विश्लेषण"
                                    : "Data Analytics"}
                            </span>

                        </div>

                        <div>

                            <i className="bi bi-shield-check"></i>

                            <span>
                                {i18n.language === "hi"
                                    ? "डेटा सुरक्षा"
                                    : "Data Security"}
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* RIGHT SIDE - LOGIN */}

            <div className="login-form-section">

                {/* LANGUAGE SWITCH */}

                <div className="language-switch">

                    <button
                        type="button"
                        className={
                            i18n.language === "en"
                                ? "active-language"
                                : ""
                        }
                        onClick={() =>
                            handleLanguageChange("en")
                        }
                    >
                        English
                    </button>

                    <button
                        type="button"
                        className={
                            i18n.language === "hi"
                                ? "active-language"
                                : ""
                        }
                        onClick={() =>
                            handleLanguageChange("hi")
                        }
                    >
                        हिन्दी
                    </button>

                </div>


                <Card className="login-card border-0">

                    <Card.Body>

                        <div className="text-center mb-4">

                            <div className="login-logo">
                                <i className="bi bi-shield-lock-fill"></i>
                            </div>

                            <h2>
                                {i18n.language === "hi"
                                    ? "वापसी पर स्वागत है"
                                    : "Welcome Back"}
                            </h2>

                            <p className="text-muted">
                                {i18n.language === "hi"
                                    ? "अपने खाते में लॉगिन करें"
                                    : "Login to access the system"}
                            </p>

                        </div>


                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mb-3">

                                <Form.Label>
                                    <i className="bi bi-person me-2"></i>

                                    {i18n.language === "hi"
                                        ? "यूज़रनेम"
                                        : "Username"}
                                </Form.Label>

                                <Form.Control
                                    placeholder={
                                        i18n.language === "hi"
                                            ? "यूज़रनेम दर्ज करें"
                                            : "Enter username"
                                    }
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />

                            </Form.Group>


                            <Form.Group className="mb-4">

                                <Form.Label>
                                    <i className="bi bi-lock me-2"></i>

                                    {i18n.language === "hi"
                                        ? "पासवर्ड"
                                        : "Password"}
                                </Form.Label>

                                <Form.Control
                                    type="password"
                                    placeholder={
                                        i18n.language === "hi"
                                            ? "पासवर्ड दर्ज करें"
                                            : "Enter password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                            </Form.Group>

                            <div className="text-end mb-3">

                                <Link
                                    to="/forgot-password"
                                    className="forgot-password-link"
                                >

                                    Forgot Password?

                                </Link>

                            </div>

                            <Button
                                className="w-100 login-button"
                                type="submit"
                                disabled={loading}
                            >

                                {loading ? (

                                    <>
                                        <Spinner
                                            animation="border"
                                            size="sm"
                                            className="me-2"
                                        />

                                        {i18n.language === "hi"
                                            ? "लॉगिन हो रहा है..."
                                            : "Logging in..."}
                                    </>

                                ) : (

                                    <>
                                        <i className="bi bi-box-arrow-in-right me-2"></i>

                                        {i18n.language === "hi"
                                            ? "लॉगिन करें"
                                            : "Login"}
                                    </>

                                )}

                            </Button>


                            <div className="text-center mt-4">

                                <span>
                                    {i18n.language === "hi"
                                        ? "क्या आपका खाता नहीं है?"
                                        : "Don't have an account?"}
                                </span>

                                <Link
                                    to="/register"
                                    className="ms-2"
                                >
                                    {i18n.language === "hi"
                                        ? "रजिस्टर करें"
                                        : "Register"}
                                </Link>

                            </div>

                        </Form>

                    </Card.Body>

                </Card>


                <div className="login-footer">

                    © 2026 {t("appName")}

                </div>

            </div>

        </div>

    );

}

export default Login;