import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../assets/css/PublicInfo.css";

function PublicInfo({ type }) {

    const { i18n } = useTranslation();
    const hindi = i18n.language === "hi";

    const content = {
        about: {
            title: hindi ? "शृंगऋषि के बारे में" : "About Shringirishi",
            subtitle: hindi
                ? "हमारी परंपरा, हमारी पहचान और हमारी विरासत"
                : "Our tradition, identity and heritage",
            icon: "bi-info-circle-fill",
            body: hindi
                ? "शृंगऋषि भारतीय आध्यात्मिक और सांस्कृतिक परंपरा से जुड़े एक महत्वपूर्ण ऋषि माने जाते हैं। इस अनुभाग में शृंगऋषि, उनकी परंपरा और समुदाय से जुड़े ऐतिहासिक एवं सांस्कृतिक पहलुओं की जानकारी प्रस्तुत की जा सकती है।"
                : "Shringirishi is associated with India's spiritual and cultural traditions. This section can present the history, traditions and cultural significance connected with Shringirishi and the community.",
            cards: [
                [hindi ? "परंपरा" : "Tradition", "bi-stars-fill",
                    hindi ? "पीढ़ियों से चली आ रही परंपराओं और मान्यताओं का परिचय।" : "An introduction to traditions and values passed through generations."],
                [hindi ? "विरासत" : "Heritage", "bi-bank2",
                    hindi ? "हमारी सांस्कृतिक विरासत और उसके संरक्षण की जानकारी।" : "Information about our cultural heritage and its preservation."],
                [hindi ? "समुदाय" : "Community", "bi-people-fill",
                    hindi ? "समुदाय, परिवार और सामाजिक जुड़ाव की झलक।" : "A view of community, families and social connections."]
            ]
        },
        temple: {
            title: hindi ? "शृंगऋषि मंदिर" : "Shrangirishi Temple",
            subtitle: hindi
                ? "आस्था, इतिहास और आध्यात्मिकता का केंद्र"
                : "A place of faith, history and spirituality",
            icon: "bi-building-fill",
            body: hindi
                ? "यहाँ मंदिर का वास्तविक इतिहास, स्थापना, धार्मिक महत्व, प्रमुख आयोजन और स्थानीय परंपराओं की प्रमाणित जानकारी जोड़ी जा सकती है।"
                : "This page can contain the verified history of the temple, its origin, religious significance, major festivals and local traditions.",
            cards: [
                [hindi ? "इतिहास" : "History", "bi-hourglass-split",
                    hindi ? "मंदिर की स्थापना और ऐतिहासिक यात्रा।" : "The origin and historical journey of the temple."],
                [hindi ? "दर्शन" : "Temple Visit", "bi-heart-fill",
                    hindi ? "दर्शन, पूजा और प्रमुख अवसरों से संबंधित जानकारी।" : "Information about worship, visits and important occasions."],
                [hindi ? "गैलरी" : "Gallery", "bi-images",
                    hindi ? "मंदिर की वास्तविक तस्वीरें यहाँ प्रदर्शित की जा सकती हैं।" : "Final temple photographs can be displayed here."]
            ]
        },
        place: {
            title: hindi ? "स्थान विवरण" : "Place Details",
            subtitle: hindi
                ? "स्थान, पहुँच और आसपास के महत्वपूर्ण स्थल"
                : "Location, access and nearby places",
            icon: "bi-geo-alt-fill",
            body: hindi
                ? "इस अनुभाग में मंदिर/स्थान का सही पता, मानचित्र, पहुँच मार्ग, आसपास के प्रमुख स्थान और उपयोगी यात्रा जानकारी जोड़ी जा सकती है।"
                : "This section can contain the verified address, map, access routes, nearby landmarks and useful travel information.",
            cards: [
                [hindi ? "स्थान" : "Location", "bi-pin-map-fill",
                    hindi ? "सही पता और Google Maps लिंक यहाँ जोड़ा जा सकता है।" : "The verified address and Google Maps link can be added here."],
                [hindi ? "कैसे पहुँचें" : "How to Reach", "bi-signpost-2-fill",
                    hindi ? "सड़क, रेल और अन्य पहुँच विकल्प।" : "Road, rail and other access options."],
                [hindi ? "आसपास" : "Nearby Places", "bi-map-fill",
                    hindi ? "आसपास के महत्वपूर्ण धार्मिक और ऐतिहासिक स्थल।" : "Important religious and historical places nearby."]
            ]
        }
    };

    const data = content[type] || content.about;

    return (
        <div className="public-info-page">

            <header className="public-info-header">
                <Link to="/login" className="public-brand">
                    <span className="public-brand-icon">👨‍👩‍👧‍👦</span>
                    <span>Parivar Census</span>
                </Link>

                <div className="public-header-actions">
                    <Link to="/login" className="public-login-btn">
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        {hindi ? "लॉगिन" : "Login"}
                    </Link>
                </div>
            </header>

            <main className="public-info-container">

                <div className="public-info-hero">

                    <div className="public-info-copy">

                        <div className="public-info-icon">
                            <i className={`bi ${data.icon}`}></i>
                        </div>

                        <h1>{data.title}</h1>
                        <p className="public-info-subtitle">{data.subtitle}</p>
                        <p className="public-info-body">{data.body}</p>

                    </div>

                    <div className="public-info-image-card">
                        <img
                            src="/src/assets/images/shringirishi-temple.jpg"
                            alt="Shrangirishi Temple"
                        />
                        <div className="public-image-caption">
                            {hindi ? "शृंगऋषि मंदिर" : "Shrangirishi Temple"}
                        </div>
                    </div>

                </div>

                <div className="public-info-cards">

                    {data.cards.map(([title, icon, description]) => (
                        <div className="public-detail-card" key={title}>
                            <i className={`bi ${icon}`}></i>
                            <h3>{title}</h3>
                            <p>{description}</p>
                        </div>
                    ))}

                </div>

                <div className="public-info-note">
                    <i className="bi bi-info-circle me-2"></i>
                    {hindi
                        ? "नोट: अंतिम ऐतिहासिक, धार्मिक और स्थान संबंधी जानकारी सत्यापित स्रोतों के आधार पर अपडेट की जाएगी।"
                        : "Note: Final historical, religious and location information should be updated using verified sources."}
                </div>

            </main>

            <footer className="public-info-footer">
                <Link to="/about-shringirishi">
                    {hindi ? "शृंगऋषि" : "Shringirishi"}
                </Link>
                <span>•</span>
                <Link to="/temple">
                    {hindi ? "मंदिर" : "Temple"}
                </Link>
                <span>•</span>
                <Link to="/place-details">
                    {hindi ? "स्थान" : "Location"}
                </Link>
                <span>•</span>
                <Link to="/login">
                    {hindi ? "लॉगिन" : "Login"}
                </Link>
            </footer>

        </div>
    );
}

export default PublicInfo;
