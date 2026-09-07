import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../assets/css/PublicInfo.css";

function PublicInfo({ type }) {
    const { i18n } = useTranslation();
    const hindi = i18n.language === "hi";

    const aboutSections = hindi
        ? [
            {
                title: "1. महर्षि कश्यप",
                paragraphs: [
                    "भारतीय वैदिक परंपरा में महर्षि कश्यप का अत्यंत महत्वपूर्ण स्थान है। उन्हें प्रजापतियों में गिना जाता है और अनेक परंपराओं में उन्हें विभिन्न जीव-जगत तथा मानव वंशों के आदि पुरुषों में से एक माना गया है।",
                    "श्रृंगी ऋषि की परंपरा में महर्षि कश्यप को उनका पितामह अर्थात दादा माना जाता है। उनके तेजस्वी पुत्रों में महर्षि विभाण्डक का नाम प्रमुखता से आता है।"
                ],
                lineage: "महर्षि कश्यप → महर्षि विभाण्डक"
            },
            {
                title: "2. महर्षि विभाण्डक",
                paragraphs: [
                    "महर्षि विभाण्डक अत्यंत तपस्वी, सिद्ध और तेजस्वी ऋषि माने जाते हैं। उन्होंने वन में कठोर तपस्या करते हुए अपना जीवन साधना में व्यतीत किया।",
                    "परंपरा में कहा जाता है कि उनके तप का प्रभाव इतना प्रबल था कि देवताओं को भी उनके तप से चिंता होने लगी थी। उनके पुत्र ही आगे चलकर ऋष्यश्रृंग अर्थात श्रृंगी ऋषि के नाम से प्रसिद्ध हुए।"
                ],
                lineage: "महर्षि कश्यप → महर्षि विभाण्डक → महर्षि श्रृंगी"
            },
            {
                title: "3. महर्षि ऋष्यश्रृंग अर्थात श्रृंगी ऋषि (प्रथम)",
                paragraphs: [
                    "महर्षि विभाण्डक के पुत्र ऋष्यश्रृंग को सामान्यतः श्रृंगी ऋषि कहा जाता है।",
                    "उनके जन्म के संबंध में अनेक कथाएँ प्रचलित हैं। परंपरागत वर्णन के अनुसार उनके मस्तक पर सींग के समान एक विशेष उभार था, जिसके कारण उनका नाम ऋष्यश्रृंग पड़ा।",
                    "श्रृंगी ऋषि ने अपने पिता से वेद, वेदांग, तप, योग, यज्ञ और आध्यात्मिक ज्ञान प्राप्त किया। उनका प्रारंभिक जीवन वन और आश्रम की तपस्या में बीता।",
                    "बाद में उनका संबंध अंगदेश के राजा रोमपाद से स्थापित हुआ और उनका विवाह राजकुमारी शांता से हुआ।",
                    "परंपरा के अनुसार शांता वास्तव में अयोध्या के राजा दशरथ की पुत्री थीं, जिन्हें राजा रोमपाद और उनकी पत्नी वर्षिणी ने अपनी पुत्री के रूप में पाला था।",
                    "श्रृंगी ऋषि का नाम विशेष रूप से राजा दशरथ के अश्वमेध तथा पुत्रकामेष्टि यज्ञ से जुड़ा हुआ है। इसी यज्ञ की परंपरा के कारण वे भगवान श्रीराम के जन्म की कथा में अत्यंत महत्वपूर्ण स्थान रखते हैं।"
                ],
                lineage: "महर्षि कश्यप → महर्षि विभाण्डक → महर्षि ऋष्यश्रृंग / श्रृंगी ऋषि (प्रथम)"
            },
            {
                title: "4. श्रृंगी ऋषि और माता शांता",
                paragraphs: [
                    "श्रृंगी ऋषि का विवाह माता शांता से हुआ। परंपरा में शांता को राजा दशरथ और रानी कौशल्या की पुत्री माना जाता है, जिन्हें बाद में अंगदेश के राजा रोमपाद ने दत्तक पुत्री के रूप में स्वीकार किया।",
                    "शांता धार्मिक, विदुषी और तपस्विनी स्वभाव की मानी जाती हैं। उन्होंने श्रृंगी ऋषि के तपस्वी जीवन में उनका साथ दिया।",
                    "इसी दांपत्य से श्रृंगी ऋषि की वंश परंपरा आगे बढ़ी। परंपरागत वंशावली में उनके पुत्र का नाम शांत-शारंगी बताया जाता है, जो आगे चलकर सारंग्य ऋषि के नाम से प्रसिद्ध हुए।"
                ],
                lineage: "कश्यप → विभाण्डक → श्रृंगी ऋषि (प्रथम) + माता शांता → शांत-शारंगी"
            },
            {
                title: "5. शांत-शारंगी / सारंग्य ऋषि",
                paragraphs: [
                    "श्रृंगी ऋषि और माता शांता के पुत्र शांत-शारंगी अत्यंत तेजस्वी, विद्वान और गुणवान बताए जाते हैं।",
                    "श्रृंगी ऋषि ने स्वयं अपने पुत्र को वेदों और धर्मशास्त्रों का अध्ययन कराया। पिता की तरह उन्होंने भी ब्रह्मचर्य, संयम, वेदाध्ययन और तप को महत्व दिया।",
                    "आगे चलकर शांत-शारंगी सारंग्य ऋषि के नाम से प्रसिद्ध हुए। इस प्रकार श्रृंगी ऋषि की तप, ज्ञान और वैदिक संस्कारों की परंपरा अगली पीढ़ी में भी आगे बढ़ी।"
                ],
                lineage: "श्रृंगी ऋषि → शांत-शारंगी → सारंग्य ऋषि"
            },
            {
                title: "6. सारंग्य ऋषि के आठ पुत्र",
                paragraphs: [
                    "परंपरागत वंशावली के अनुसार सारंग्य ऋषि के आठ पुत्र हुए। इन पुत्रों के माध्यम से श्रृंगी ऋषि की परंपरा आगे विभिन्न ऋषि-शाखाओं में विस्तृत हुई।",
                    "इन आठ पुत्रों के नाम बताए जाते हैं—"
                ],
                list: ["उग्र", "वाम", "भीम", "वासुदेव", "वत्स", "धौम्य", "वेददृग", "वेदबाहु"],
                paragraphsAfterList: [
                    "इनमें से कुछ ने ब्रह्मचर्य और तप का मार्ग अपनाया, जबकि कुछ ने वेदों का अध्ययन करने के बाद गृहस्थ आश्रम में प्रवेश किया।",
                    "इन आठ पुत्रों में वत्स ऋषि की परंपरा आगे विशेष रूप से प्रसिद्ध हुई और इसी शाखा से आगे चलकर अनेक विद्वान ऋषियों के नाम जोड़े जाते हैं।"
                ],
                lineage: "श्रृंगी ऋषि (प्रथम) ↓ शांत-शारंगी / सारंग्य ऋषि ↓ उग्र • वाम • भीम • वासुदेव • वत्स • धौम्य • वेददृग • वेदबाहु"
            },
            {
                title: "7. वत्स ऋषि की परंपरा",
                paragraphs: [
                    "सारंग्य ऋषि के पुत्रों में वत्स ऋषि की परंपरा विशेष रूप से महत्वपूर्ण मानी जाती है।",
                    "परंपरागत वंशावली के अनुसार वत्स ऋषि की शाखा में आगे अनेक विद्वान और तपस्वी ऋषि हुए। इसी वंशक्रम में आगे चलकर महामुनि जैमिनी का नाम आता है।",
                    "इस प्रकार श्रृंगी ऋषि की परंपरा केवल तप और यज्ञ तक सीमित नहीं रही, बल्कि भारतीय वैदिक दर्शन और विद्या की परंपरा से भी जुड़ती हुई दिखाई देती है।"
                ],
                lineage: "श्रृंगी → सारंग्य → वत्स → जैमिनी"
            },
            {
                title: "8. महर्षि जैमिनी",
                paragraphs: [
                    "महर्षि जैमिनी भारतीय दर्शन और वैदिक मीमांसा परंपरा के महान आचार्य माने जाते हैं।",
                    "उन्हें विशेष रूप से पूर्व मीमांसा दर्शन के प्रवर्तक आचार्य के रूप में प्रसिद्धि प्राप्त है। उनका नाम जैमिनी सूत्र और वैदिक कर्मकांड की दार्शनिक व्याख्या से जुड़ा हुआ है।",
                    "परंपरागत वंशावली में जैमिनी को वत्स ऋषि की परंपरा में बताया गया है।",
                    "आगे इसी वंश में शांतिदेव और फिर कौडिन्य ऋषि के आने की मान्यता मिलती है।"
                ],
                lineage: "वत्स → महर्षि जैमिनी → शांतिदेव → कौडिन्य"
            },
            {
                title: "9. शांतिदेव और कौडिन्य ऋषि",
                paragraphs: [
                    "जैमिनी की परंपरा में आगे शांतिदेव का नाम आता है। शांतिदेव के कुल में कौडिन्य ऋषि के जन्म की परंपरागत मान्यता है।",
                    "कौडिन्य ऋषि का नाम भी प्राचीन ऋषि परंपरा में मिलता है। कुछ परंपरागत वंशावलियों में उन्हें अंगिरा नाम से भी संबोधित किया गया है।",
                    "कौडिन्य ऋषि की परंपरा में आगे चलकर शमीक ऋषि का जन्म बताया जाता है।",
                    "इस प्रकार श्रृंगी ऋषि की परंपरा एक लंबी ऋषि-श्रृंखला के रूप में आगे बढ़ती हुई महाभारत काल तक पहुंचती है।"
                ],
                lineage: "जैमिनी → शांतिदेव → कौडिन्य / अंगिरा → शमीक ऋषि"
            },
            {
                title: "10. महर्षि शमीक",
                paragraphs: [
                    "महर्षि शमीक का नाम महाभारत काल के प्रसिद्ध ऋषियों में आता है। वे अत्यंत शांत, तपस्वी और ध्याननिष्ठ ऋषि माने जाते हैं।",
                    "उनके पुत्र श्रृंगी ऋषि (द्वितीय) ने आगे चलकर महाभारत की उत्तरकथा में महत्वपूर्ण भूमिका निभाई।",
                    "यहां यह बात विशेष रूप से ध्यान देने योग्य है कि शमीक ऋषि के पुत्र श्रृंगी, राजा दशरथ के पुत्रकामेष्टि यज्ञ से जुड़े त्रेतायुगीन श्रृंगी ऋषि से अलग व्यक्ति माने जाते हैं।"
                ],
                lineage: "कौडिन्य / अंगिरा → महर्षि शमीक → श्रृंगी ऋषि (द्वितीय)"
            },
            {
                title: "11. शमीक ऋषि के पुत्र श्रृंगी ऋषि (द्वितीय)",
                paragraphs: [
                    "महाभारत की प्रसिद्ध कथा में श्रृंगी ऋषि (द्वितीय) का उल्लेख मिलता है। वे महर्षि शमीक के पुत्र थे और अपने तेज, तप तथा ब्रह्मशक्ति के लिए प्रसिद्ध माने जाते हैं।",
                    "एक बार राजा परीक्षित शमीक ऋषि के आश्रम में पहुंचे। उस समय शमीक ऋषि गहन ध्यान में लीन थे और राजा को उनसे अपेक्षित उत्तर नहीं मिला।",
                    "राजा परीक्षित ने क्रोधवश एक मृत सर्प को ऋषि के गले में डाल दिया। जब यह घटना शमीक ऋषि के पुत्र श्रृंगी को ज्ञात हुई तो वे अत्यंत क्रोधित हुए।",
                    "उन्होंने अपने तपोबल से राजा परीक्षित को श्राप दिया कि सातवें दिन तक्षक नाग के दंश से उनकी मृत्यु होगी।",
                    "श्रृंगी ऋषि के इस श्राप के कारण महाभारत की उत्तरकथा में आगे की घटनाओं का क्रम प्रारंभ हुआ। राजा परीक्षित की मृत्यु के बाद उनके पुत्र जनमेजय ने सर्पसत्र यज्ञ कराया, जिसमें नागों से संबंधित प्रसिद्ध कथा आगे बढ़ती है।",
                    "इस प्रकार शमीक ऋषि के पुत्र श्रृंगी ऋषि का नाम महाभारत की महत्वपूर्ण घटनाओं से जुड़ जाता है।"
                ]
            }
        ]
        : [
            {
                title: "1. Maharishi Kashyap",
                paragraphs: [
                    "Maharishi Kashyap holds a highly important place in the Vedic tradition of India. He is counted among the Prajapatis and, in many traditions, is regarded as one of the primordial figures associated with various forms of life and human lineages.",
                    "In the traditional lineage associated with Shringi Rishi, Maharishi Kashyap is regarded as his grandfather. Among his illustrious sons, Maharishi Vibhandak is prominently mentioned."
                ],
                lineage: "Maharishi Kashyap → Maharishi Vibhandak"
            },
            {
                title: "2. Maharishi Vibhandak",
                paragraphs: [
                    "Maharishi Vibhandak is traditionally described as an exceptionally ascetic, accomplished and radiant sage. He spent his life performing intense austerities in the forest.",
                    "Tradition says that the power of his austerities was so great that even the gods became concerned. His son later became famous as Rishyasringa, respectfully known as Shringi Rishi."
                ],
                lineage: "Maharishi Kashyap → Maharishi Vibhandak → Maharishi Shringi"
            },
            {
                title: "3. Maharishi Rishyasringa, or Shringi Rishi (First)",
                paragraphs: [
                    "Rishyasringa, the son of Maharishi Vibhandak, is generally known as Shringi Rishi.",
                    "Several stories are associated with his birth. According to a traditional account, a distinctive horn-like projection on his head led to the name Rishyasringa.",
                    "Shringi Rishi received knowledge of the Vedas, Vedangas, austerity, yoga, yajna and spirituality from his father. His early life was spent in forest and ashram-based austerities.",
                    "Later, he became associated with King Romapada of Anga and married Princess Shanta.",
                    "According to tradition, Shanta was actually the daughter of King Dasharatha of Ayodhya and was raised as the daughter of King Romapada and his wife Varshini.",
                    "Shringi Rishi is particularly associated with the Ashvamedha and Putrakameshti yajnas of King Dasharatha. Through the tradition of the Putrakameshti yajna, he occupies an important place in the traditional account of the birth of Lord Rama."
                ],
                lineage: "Maharishi Kashyap → Maharishi Vibhandak → Maharishi Rishyasringa / Shringi Rishi (First)"
            },
            {
                title: "4. Shringi Rishi and Mata Shanta",
                paragraphs: [
                    "Shringi Rishi married Mata Shanta. Tradition regards Shanta as the daughter of King Dasharatha and Queen Kaushalya, later accepted as the adopted daughter of King Romapada of Anga.",
                    "Shanta is traditionally described as religious, learned and ascetic in disposition. She is said to have supported Shringi Rishi in his austere life.",
                    "Their marriage is said to have carried the lineage of Shringi Rishi forward. Traditional genealogies name their son as Shant-Sharangi, who later became known as Sarangya Rishi."
                ],
                lineage: "Kashyap → Vibhandak → Shringi Rishi (First) + Mata Shanta → Shant-Sharangi"
            },
            {
                title: "5. Shant-Sharangi / Sarangya Rishi",
                paragraphs: [
                    "Shant-Sharangi, the son of Shringi Rishi and Mata Shanta, is traditionally described as radiant, learned and virtuous.",
                    "Shringi Rishi is said to have personally taught his son the Vedas and Dharmashastras. Like his father, he valued celibacy, discipline, Vedic learning and austerity.",
                    "Shant-Sharangi later became known as Sarangya Rishi. Thus, the tradition of austerity, knowledge and Vedic values associated with Shringi Rishi is said to have continued into the next generation."
                ],
                lineage: "Shringi Rishi → Shant-Sharangi → Sarangya Rishi"
            },
            {
                title: "6. The Eight Sons of Sarangya Rishi",
                paragraphs: [
                    "According to a traditional genealogy, Sarangya Rishi had eight sons. Through these sons, the tradition associated with Shringi Rishi is said to have expanded into different sage lineages.",
                    "The eight sons are traditionally named as follows:"
                ],
                list: ["Ugra", "Vama", "Bhima", "Vasudeva", "Vatsa", "Dhaumya", "Vedadrig", "Vedabahu"],
                paragraphsAfterList: [
                    "Some are said to have followed the path of celibacy and austerity, while others entered household life after studying the Vedas.",
                    "Among these eight sons, the lineage of Vatsa Rishi became particularly prominent, and many learned sages are traditionally associated with this branch."
                ],
                lineage: "Shringi Rishi (First) ↓ Shant-Sharangi / Sarangya Rishi ↓ Ugra • Vama • Bhima • Vasudeva • Vatsa • Dhaumya • Vedadrig • Vedabahu"
            },
            {
                title: "7. The Tradition of Vatsa Rishi",
                paragraphs: [
                    "Among the sons of Sarangya Rishi, the tradition of Vatsa Rishi is regarded as particularly significant.",
                    "According to traditional genealogies, many learned and ascetic sages arose in the branch of Vatsa Rishi. Maharishi Jaimini is later placed in this lineage by tradition.",
                    "Thus, the tradition associated with Shringi Rishi is not presented merely as a tradition of austerity and yajna, but also as one connected with Indian Vedic philosophy and learning."
                ],
                lineage: "Shringi → Sarangya → Vatsa → Jaimini"
            },
            {
                title: "8. Maharishi Jaimini",
                paragraphs: [
                    "Maharishi Jaimini is regarded as a great teacher of Indian philosophy and the Vedic Mimamsa tradition.",
                    "He is particularly famous as an exponent of Purva Mimamsa. His name is associated with the Jaimini Sutras and philosophical interpretation of Vedic ritual practice.",
                    "Traditional genealogies place Jaimini in the lineage of Vatsa Rishi.",
                    "According to the same traditional lineage, Shantideva and then Rishi Kaudinya follow in the line."
                ],
                lineage: "Vatsa → Maharishi Jaimini → Shantideva → Kaudinya"
            },
            {
                title: "9. Shantideva and Rishi Kaudinya",
                paragraphs: [
                    "Shantideva is named later in the tradition associated with Jaimini. Traditional accounts place the birth of Rishi Kaudinya in the family line of Shantideva.",
                    "The name Kaudinya also appears in ancient sage traditions. Some traditional genealogies also refer to him as Angira.",
                    "The lineage of Rishi Kaudinya is traditionally continued through the birth of Rishi Shamik.",
                    "In this way, the traditional Shringi lineage is described as a long succession of sages extending into the Mahabharata period."
                ],
                lineage: "Jaimini → Shantideva → Kaudinya / Angira → Rishi Shamik"
            },
            {
                title: "10. Maharishi Shamik",
                paragraphs: [
                    "Maharishi Shamik is named among the well-known sages associated with the Mahabharata period. He is traditionally described as peaceful, ascetic and deeply devoted to meditation.",
                    "His son, Shringi Rishi (Second), later played an important role in the events described in the post-war narratives of the Mahabharata.",
                    "It is especially important to note that the Shringi who was the son of Rishi Shamik is regarded as a different person from the Treta-Yuga Shringi Rishi associated with King Dasharatha's Putrakameshti yajna."
                ],
                lineage: "Kaudinya / Angira → Maharishi Shamik → Shringi Rishi (Second)"
            },
            {
                title: "11. Shringi Rishi (Second), Son of Rishi Shamik",
                paragraphs: [
                    "Shringi Rishi (Second) is mentioned in a famous Mahabharata story. He was the son of Maharishi Shamik and is traditionally known for his spiritual power, austerity and Brahmic energy.",
                    "Once, King Parikshit arrived at the ashram of Rishi Shamik. At that time, Shamik Rishi was absorbed in deep meditation and did not respond to the king as the king expected.",
                    "In anger, King Parikshit placed a dead snake around the sage's neck. When Shringi, the son of Shamik Rishi, learned of the incident, he became extremely angry.",
                    "Through the power of his austerities, he cursed King Parikshit that he would die on the seventh day from the bite of the serpent Takshaka.",
                    "This curse became the starting point for subsequent events in the post-Mahabharata narrative. After King Parikshit's death, his son Janamejaya performed the Sarpa Satra, through which the famous narrative concerning the serpents continued.",
                    "Thus, the Shringi Rishi who was the son of Rishi Shamik becomes connected with important events in the Mahabharata tradition."
                ]
            }
        ];

    const comparison = hindi
        ? {
            title: "त्रेता और द्वापर के दोनों श्रृंगी ऋषियों में अंतर",
            intro: "श्रृंगी ऋषि के नाम को लेकर अक्सर भ्रम होता है, क्योंकि भारतीय परंपरा में दो अलग-अलग कालों के दो श्रृंगी ऋषियों का उल्लेख मिलता है।",
            firstTitle: "प्रथम श्रृंगी ऋषि — त्रेता युग",
            firstLineage: "महर्षि कश्यप → महर्षि विभाण्डक → श्रृंगी ऋषि (प्रथम)",
            firstText: "इनका विवाह माता शांता से हुआ। इनका नाम राजा दशरथ के पुत्रकामेष्टि यज्ञ तथा भगवान श्रीराम, भरत, लक्ष्मण और शत्रुघ्न के जन्म की कथा से जुड़ा हुआ है।",
            secondTitle: "द्वितीय श्रृंगी ऋषि — द्वापर युग",
            secondLineage: "कौडिन्य/अंगिरा → शमीक ऋषि → श्रृंगी ऋषि (द्वितीय)",
            secondText: "ये महर्षि शमीक के पुत्र माने जाते हैं और राजा परीक्षित को श्राप देने की महाभारत की प्रसिद्ध कथा से संबंधित हैं।",
            conclusion: "अतः दोनों श्रृंगी ऋषियों को एक ही व्यक्ति मानना उचित नहीं है।"
        }
        : {
            title: "The Difference Between the Two Shringi Rishis of Treta and Dvapara",
            intro: "There is often confusion about the name Shringi Rishi because Indian tradition refers to two Shringi Rishis associated with different periods.",
            firstTitle: "First Shringi Rishi — Treta Yuga",
            firstLineage: "Maharishi Kashyap → Maharishi Vibhandak → Shringi Rishi (First)",
            firstText: "He married Mata Shanta. His name is associated with King Dasharatha's Putrakameshti yajna and the traditional account of the births of Lord Rama, Bharata, Lakshmana and Shatrughna.",
            secondTitle: "Second Shringi Rishi — Dvapara Yuga",
            secondLineage: "Kaudinya/Angira → Rishi Shamik → Shringi Rishi (Second)",
            secondText: "He is traditionally regarded as the son of Maharishi Shamik and is associated with the famous Mahabharata story in which King Parikshit was cursed.",
            conclusion: "Therefore, the two Shringi Rishis should not be treated as the same individual."
        };

    const summary = hindi
        ? {
            title: "संपूर्ण वंशक्रम — श्रृंगी ऋषि द्वितीय तक",
            intro: "परंपरागत वंशावली को एक नजर में इस प्रकार देखा जा सकता है—",
            lines: [
                "महर्षि कश्यप",
                "↓",
                "महर्षि विभाण्डक",
                "↓",
                "महर्षि ऋष्यश्रृंग / श्रृंगी ऋषि (प्रथम)",
                "↓",
                "+ माता शांता",
                "↓",
                "शांत-शारंगी / सारंग्य ऋषि",
                "↓",
                "आठ पुत्र — उग्र • वाम • भीम • वासुदेव • वत्स • धौम्य • वेददृग • वेदबाहु",
                "↓",
                "वत्स ऋषि की परंपरा",
                "↓",
                "महर्षि जैमिनी",
                "↓",
                "शांतिदेव",
                "↓",
                "कौडिन्य / अंगिरा",
                "↓",
                "महर्षि शमीक",
                "↓",
                "श्रृंगी ऋषि (द्वितीय)"
            ],
            conclusionTitle: "वंश परंपरा का सार",
            conclusion: "इस प्रकार परंपरागत मान्यता के अनुसार महर्षि कश्यप से प्रारंभ होकर महर्षि विभाण्डक, श्रृंगी ऋषि प्रथम, माता शांता, शांत-शारंगी, सारंग्य ऋषि, उनके आठ पुत्रों में वत्स, फिर जैमिनी, शांतिदेव, कौडिन्य और महर्षि शमीक के माध्यम से श्रृंगी ऋषि द्वितीय तक यह वंश परंपरा पहुंचती है। यही वंशावली कालांतर में आगे बढ़ते हुए वर्तमान तक पहुंची है।",
            poetic: "महर्षि कश्यप की तपोपरंपरा से विभाण्डक,\nविभाण्डक से श्रृंगी,\nश्रृंगी से ज्ञान और संस्कार की परंपरा,\nऔर आगे शमीक के तेजस्वी पुत्र श्रृंगी तक—\nयह भारतीय ऋषि परंपरा की एक गौरवपूर्ण कड़ी है।",
            jai: "जय महर्षि श्रृंगी ऋषि।\nजय माता शांता।\nजय श्रीराम।",
            note: "यह जानकारी अनेक पौराणिक ग्रंथों से जुटाकर प्रस्तुत करने का प्रयास है। इसमें त्रुटियां भी हो सकती हैं।"
        }
        : {
            title: "Complete Lineage — Up to Shringi Rishi (Second)",
            intro: "The traditional genealogy can be viewed at a glance as follows:",
            lines: [
                "Maharishi Kashyap",
                "↓",
                "Maharishi Vibhandak",
                "↓",
                "Maharishi Rishyasringa / Shringi Rishi (First)",
                "↓",
                "+ Mata Shanta",
                "↓",
                "Shant-Sharangi / Sarangya Rishi",
                "↓",
                "Eight sons — Ugra • Vama • Bhima • Vasudeva • Vatsa • Dhaumya • Vedadrig • Vedabahu",
                "↓",
                "Tradition of Vatsa Rishi",
                "↓",
                "Maharishi Jaimini",
                "↓",
                "Shantideva",
                "↓",
                "Kaudinya / Angira",
                "↓",
                "Maharishi Shamik",
                "↓",
                "Shringi Rishi (Second)"
            ],
            conclusionTitle: "Summary of the Lineage Tradition",
            conclusion: "According to this traditional account, the lineage begins with Maharishi Kashyap and continues through Maharishi Vibhandak, Shringi Rishi (First), Mata Shanta, Shant-Sharangi, Sarangya Rishi, Vatsa among his eight sons, then Jaimini, Shantideva, Kaudinya and Maharishi Shamik, reaching Shringi Rishi (Second). This traditional lineage is described as continuing through later generations to the present day.",
            poetic: "From the austerity tradition of Maharishi Kashyap to Vibhandak,\nfrom Vibhandak to Shringi,\nfrom Shringi the tradition of knowledge and values,\nand onward to Shringi, the illustrious son of Shamik—\nthis is presented as a proud link in the Indian Rishi tradition.",
            jai: "Jai Maharishi Shringi Rishi.\nJai Mata Shanta.\nJai Shri Ram.",
            note: "This information is an attempt to compile material from various Puranic and traditional sources. Some details may contain inaccuracies."
        };

    const content = {
        about: {
            title: hindi
                ? "महर्षि श्रृंगी ऋषि की विस्तृत वंश परंपरा"
                : "Maharishi Shringi Rishi – Detailed Genealogical Tradition",
            subtitle: hindi
                ? "ऋषि परंपरा, वंशावली और श्रृंगी ऋषि के दोनों स्वरूपों का परिचय"
                : "An account of the Rishi tradition, genealogy and the two traditions associated with Shringi Rishi",
            icon: "bi-info-circle-fill",
            body: hindi
                ? "भारतीय ऋषि परंपरा में महर्षि ऋष्यश्रृंग, जिन्हें श्रद्धापूर्वक श्रृंगी ऋषि कहा जाता है, का स्थान अत्यंत विशिष्ट है। उनकी परंपरा अनेक महान ऋषियों और वेदवेत्ताओं से जुड़ी हुई बताई जाती है। विभिन्न धार्मिक ग्रंथों, पुराणों, स्थानीय जनश्रुतियों तथा परंपरागत वंशावलियों में इस वंश का अलग-अलग रूप में वर्णन मिलता है। यहां प्रस्तुत वंशक्रम मुख्यतः परंपरागत मान्यताओं और वंश-स्मृतियों पर आधारित है।"
                : "In the Indian Rishi tradition, Maharishi Rishyasringa, respectfully known as Shringi Rishi, holds a distinctive place. Traditional accounts connect his lineage with several great sages and scholars of the Vedic tradition. Different religious texts, Puranas, local traditions and genealogical accounts describe this lineage in different ways. The lineage presented here is primarily based on traditional beliefs and remembered genealogies.",
            sections: aboutSections,
            comparison,
            summary
        },
        temple: {
            title: hindi ? "शृंगऋषि मंदिर" : "Shrangirishi Temple",
            subtitle: hindi ? "आस्था, इतिहास और आध्यात्मिकता का केंद्र" : "A place of faith, history and spirituality",
            icon: "bi-building-fill",
            body: hindi
                ? "यहाँ मंदिर का वास्तविक इतिहास, स्थापना, धार्मिक महत्व, प्रमुख आयोजन और स्थानीय परंपराओं की प्रमाणित जानकारी जोड़ी जा सकती है।"
                : "This page can contain the verified history of the temple, its origin, religious significance, major festivals and local traditions.",
            cards: [
                [hindi ? "इतिहास" : "History", "bi-hourglass-split", hindi ? "मंदिर की स्थापना और ऐतिहासिक यात्रा।" : "The origin and historical journey of the temple."],
                [hindi ? "दर्शन" : "Temple Visit", "bi-heart-fill", hindi ? "दर्शन, पूजा और प्रमुख अवसरों से संबंधित जानकारी।" : "Information about worship, visits and important occasions."],
                [hindi ? "गैलरी" : "Gallery", "bi-images", hindi ? "मंदिर की वास्तविक तस्वीरें यहाँ प्रदर्शित की जा सकती हैं।" : "Final temple photographs can be displayed here."]
            ]
        },
        place: {
            title: hindi ? "स्थान विवरण" : "Place Details",
            subtitle: hindi ? "स्थान, पहुँच और आसपास के महत्वपूर्ण स्थल" : "Location, access and nearby places",
            icon: "bi-geo-alt-fill",
            body: hindi
                ? "इस अनुभाग में मंदिर/स्थान का सही पता, मानचित्र, पहुँच मार्ग, आसपास के प्रमुख स्थान और उपयोगी यात्रा जानकारी जोड़ी जा सकती है।"
                : "This section can contain the verified address, map, access routes, nearby landmarks and useful travel information.",
            cards: [
                [hindi ? "स्थान" : "Location", "bi-pin-map-fill", hindi ? "सही पता और Google Maps लिंक यहाँ जोड़ा जा सकता है।" : "The verified address and Google Maps link can be added here."],
                [hindi ? "कैसे पहुँचें" : "How to Reach", "bi-signpost-2-fill", hindi ? "सड़क, रेल और अन्य पहुँच विकल्प।" : "Road, rail and other access options."],
                [hindi ? "आसपास" : "Nearby Places", "bi-map-fill", hindi ? "आसपास के महत्वपूर्ण धार्मिक और ऐतिहासिक स्थल।" : "Important religious and historical places nearby."]
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
                        <img src="/src/assets/images/shringirishi-temple.jpg" alt={hindi ? "शृंगऋषि मंदिर" : "Shrangirishi Temple"} />
                        <div className="public-image-caption">
                            {hindi ? "शृंगऋषि मंदिर" : "Shrangirishi Temple"}
                        </div>
                    </div>
                </div>

                {type === "about" ? (
                    <article className="public-history-article">
                        <div className="public-history-intro">
                            <i className="bi bi-journal-text"></i>
                            <div>
                                <h2>{hindi ? "महर्षि श्रृंगी ऋषि की वंश परंपरा" : "The Lineage Tradition of Maharishi Shringi Rishi"}</h2>
                                <p>{hindi ? "यहां प्रस्तुत वंशक्रम मुख्यतः परंपरागत मान्यताओं और वंश-स्मृतियों पर आधारित है।" : "The lineage presented here is primarily based on traditional beliefs and remembered genealogies."}</p>
                            </div>
                        </div>

                        {data.sections.map((section) => (
                            <section className="public-history-section" key={section.title}>
                                <h2>{section.title}</h2>
                                {section.paragraphs.map((paragraph, index) => (
                                    <p key={`${section.title}-p-${index}`}>{paragraph}</p>
                                ))}
                                {section.list && (
                                    <ol className="public-lineage-list">
                                        {section.list.map((item) => <li key={item}>{item}</li>)}
                                    </ol>
                                )}
                                {section.paragraphsAfterList?.map((paragraph, index) => (
                                    <p key={`${section.title}-after-${index}`}>{paragraph}</p>
                                ))}
                                {section.lineage && (
                                    <div className="public-lineage-box">

                                        <div>{section.lineage}</div>
                                    </div>
                                )}
                            </section>
                        ))}

                        <section className="public-history-section public-comparison-section">
                            <h2>{data.comparison.title}</h2>
                            <p>{data.comparison.intro}</p>
                            <div className="public-comparison-grid">
                                <div className="public-comparison-card">
                                    <h3>{data.comparison.firstTitle}</h3>
                                    <div className="public-lineage-box"><span>{hindi ? "वंशक्रम" : "Lineage"}</span><div>{data.comparison.firstLineage}</div></div>
                                    <p>{data.comparison.firstText}</p>
                                </div>
                                <div className="public-comparison-card">
                                    <h3>{data.comparison.secondTitle}</h3>
                                    <div className="public-lineage-box"><span>{hindi ? "वंशक्रम" : "Lineage"}</span><div>{data.comparison.secondLineage}</div></div>
                                    <p>{data.comparison.secondText}</p>
                                </div>
                            </div>
                            <div className="public-conclusion">{data.comparison.conclusion}</div>
                        </section>

                        <section className="public-history-section public-summary-section">
                            <h2>{data.summary.title}</h2>
                            <p>{data.summary.intro}</p>
                            <div className="public-full-lineage">
                                {data.summary.lines.map((line, index) => (
                                    <div key={`${line}-${index}`} className={line === "↓" ? "public-lineage-arrow" : "public-lineage-item"}>
                                        {line}
                                    </div>
                                ))}
                            </div>
                            <h2>{data.summary.conclusionTitle}</h2>
                            <p>{data.summary.conclusion}</p>
                            <div className="public-poetic-summary">
                                {data.summary.poetic.split("\n").map((line, index) => <div key={index}>{line}</div>)}
                            </div>
                            <div className="public-jai-message">
                                {data.summary.jai.split("\n").map((line, index) => <div key={index}>{line}</div>)}
                            </div>
                        </section>

                        <div className="public-info-note public-history-note">
                            <i className="bi bi-info-circle me-2"></i>
                            {data.summary.note}
                        </div>
                    </article>
                ) : (
                    <>
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
                    </>
                )}
            </main>

            <footer className="public-info-footer">
                <nav className="login-public-nav">

                    <NavLink
                        to="/about-shringirishi"
                        className={({ isActive }) =>
                            `login-public-link ${isActive ? "active" : ""}`
                        }
                    >
                        <i className="bi bi-info-circle"></i>
                        {hindi ? "शृंगऋषि के बारे में" : "About Shringirishi"}
                    </NavLink>

                    <NavLink
                        to="/temple"
                        className={({ isActive }) =>
                            `login-public-link ${isActive ? "active" : ""}`
                        }
                    >
                        <i className="bi bi-building"></i>
                        {hindi ? "मंदिर" : "Temple"}
                    </NavLink>

                    <NavLink
                        to="/place-details"
                        className={({ isActive }) =>
                            `login-public-link ${isActive ? "active" : ""}`
                        }
                    >
                        <i className="bi bi-geo-alt"></i>
                        {hindi ? "स्थान विवरण" : "Place Details"}
                    </NavLink>

                </nav>
            </footer>
        </div>
    );
}

export default PublicInfo;
