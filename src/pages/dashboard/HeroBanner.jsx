import { useNavigate } from "react-router-dom";
import banner from "../../assets/images/banner.jpg";

function HeroBanner() {

    const navigate = useNavigate();

    return (

        <div
            className="position-relative shadow-lg mb-4"
            style={{
                borderRadius: "18px",
                overflow: "hidden",
                height: "380px"
            }}
        >

            {/* Background Image */}

            <img
                src={banner}
                alt="Banner"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }}
            />

            {/* Dark Overlay */}

            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    background: "rgba(0,0,0,0.45)"
                }}
            ></div>

            {/* Content */}

            <div
                className="position-absolute top-50 start-50 translate-middle text-white text-center w-100 px-4"
            >

            {/*     <h1 className="fw-bold display-5">

                    🏛 PARIVAR CENSUS MANAGEMENT SYSTEM

                </h1>

                <h4 className="mt-3">

                    Digital Family Heritage Portal

                </h4>

                <p className="mt-3 fs-5">

                    Preserving Heritage • Connecting Families •
                    Building Future Generations

                </p> */}

                {/* <div className="mt-4">

                    <button
                        className="btn btn-light me-3"
                        onClick={() => navigate("/families")}
                    >
                        👨‍👩‍👧 Add Family
                    </button>

                    <button
                        className="btn btn-warning me-3"
                        onClick={() => navigate("/members")}
                    >
                        👤 Add Member
                    </button>

                    <button
                        className="btn btn-outline-light"
                    >
                        📊 Reports
                    </button>

                </div> */}

            </div>

        </div>

    );

}

export default HeroBanner;