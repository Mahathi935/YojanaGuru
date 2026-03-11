import { useState, useEffect, useRef } from "react";
import { VillageHelperMode } from "../VillageHelperMode";

/* ============================================================
   GLOBAL STYLES
   ============================================================ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Nunito+Sans:wght@300;400;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;font-size:18px;}
    body{font-family:'Poppins',system-ui,-apple-system,BlinkMacSystemFont,sans-serif;background:#fefae0;color:#283618;overflow-x:hidden;}
    ::-webkit-scrollbar{width:6px;}
    ::-webkit-scrollbar-track{background:#fefae0;}
    ::-webkit-scrollbar-thumb{background:#dda15e;border-radius:10px;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.04);}}
    @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
    @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
    @keyframes blink{0%,100%{opacity:.3;transform:scale(.8);}50%{opacity:1;transform:scale(1.1);}}
    @keyframes bounce{0%,100%{transform:translateY(0);}40%{transform:translateY(-12px);}60%{transform:translateY(-6px);}}
    @keyframes slideRight{from{width:0}to{width:100%}}
    @keyframes softFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
    @keyframes subtleGlow{0%,100%{box-shadow:0 0 0 rgba(188,108,37,0)}50%{box-shadow:0 0 18px rgba(188,108,37,.35)}}
    .fade-up{animation:fadeUp .45s ease both;}
    .page-enter{animation:fadeIn .3s ease both;}
    button{cursor:pointer;font-family:'Poppins',system-ui,-apple-system,BlinkMacSystemFont,sans-serif;}
    input,select,textarea{font-family:'Nunito Sans','Poppins',system-ui,-apple-system,BlinkMacSystemFont,sans-serif;}
    a{text-decoration:none;color:inherit;}
    .opt-btn:hover{background:#fefae0!important;border-color:#dda15e!important;transform:translateX(4px);}
    .scheme-card:hover{transform:translateY(-6px);box-shadow:0 12px 40px rgba(0,0,0,.14)!important;animation:subtleGlow .9s ease-in-out;}
    .ql-card:hover{transform:translateY(-4px);box-shadow:0 8px 30px rgba(0,0,0,.12)!important;}

    /* Responsive layout tweaks */
    @media (max-width: 1024px) {
      html{font-size:16px;}
    }

    @media (max-width: 768px) {
      html{font-size:15px;}
      nav{padding:0 8px;}
      .scheme-card{padding:16px;}
      .ql-card{padding:18px;}
    }

    @media (max-width: 600px) {
      html{font-size:14px;}
      body{overflow-x:hidden;}
      .scheme-card{border-radius:14px;}
      .ql-card{border-radius:14px;}
      .neta-panel{right:16px;bottom:70px;width:90vw;max-width:360px;}
    }

    @media (max-width: 480px) {
      html{font-size:13px;}
      .neta-toggle{right:16px;bottom:16px;}
    }
  `}</style>
);

/* ============================================================
   SCHEMES DATABASE  (Tamil Nadu + Andhra Pradesh/Telangana + Central)
   ============================================================ */
const SCHEMES = [
  // ── TAMIL NADU ──
  {
    id:"TN_001",state:"Tamil Nadu",isNew:false,isCentral:false,
    name:"Kalaignar Magalir Urimai Thogai",
    name_ta:"கலைஞர் மகளிர் உரிமைத் தொகை",name_hi:"कलैञर महिला अधिकार राशि",name_te:"కలైஞர் మహిళా హక్కు నిధి",
    emoji:"",category:"women",color:"#bc6c25",
    tagline:"Monthly money for every woman",
    benefit:"₹1,000 every month straight to your bank account",
    benefit_simple:"Every adult woman in Tamil Nadu gets ₹1,000 every month. Government puts the money directly in your bank. No middleman.",
    benefit_simple_ta:"தமிழ்நாட்டில் உள்ள ஒவ்வொரு பெரியவரான பெண்களுக்கும் மாதம் ₹1,000 அரசு தருகிறது. இந்தத் தொகை உங்கள் வங்கி கணக்கில் நேரடியாக வரும்; நடுவில் யாரும் இருக்க மாட்டார்கள்.",
    benefit_simple_hi:"तमिलनाडु की हर वयस्क महिला को सरकार हर महीने ₹1,000 देती है। यह पैसा सीधे आपके बैंक खाते में आता है, बीच में कोई बिचौलिया नहीं रहता।",
    benefit_simple_te:"తమిళనాడులోని ప్రతి పెద్ద మహిళకు ప్రభుత్వం ప్రతి నెల ₹1,000 ఇస్తుంది. ఈ డబ్బు నేరుగా మీ బ్యాంక్ ఖాతాలో జమ అవుతుంది, మధ్యలో ఎవరూ ఉండరు.",
    eligibility:{gender:"female",state:"tamil_nadu",income_annual_max:250000,age_min:21},
    eligibility_plain:"Woman, age 21+, living in Tamil Nadu, family income less than ₹2.5 lakh/year.",
    eligibility_plain_ta:"தமிழ்நாட்டில் வசிக்கும், வயது 21 மற்றும் அதற்கு மேற்பட்ட, குடும்ப ஆண்டு வருமானம் ₹2.5 லட்சத்திற்குக் குறைவாக உள்ள பெண்கள்.",
    eligibility_plain_hi:"तमिलनाडु में रहने वाली 21 वर्ष या उससे अधिक आयु की महिलाएँ, जिनके परिवार की सालाना आमदनी ₹2.5 लाख से कम है।",
    eligibility_plain_te:"తమిళనాడులో నివసించే, వయసు 21 ఏళ్లు లేదా అంతకు పైగా ఉన్న మహిళలు, కుటుంబ వార్షిక ఆదాయం ₹2.5 లక్షల కంటే తక్కువగా ఉండాలి.",
    requiredDocs:["aadhaar","bank_passbook","ration_card","age_proof"],
    documents:["Aadhaar Card","Bank Passbook","Ration Card","Age Proof"],
    apply_at:"Nearest Ration Shop or e-Sevai Centre",
    helpCenters:["Village Ration Shop","e-Sevai Centre","Taluk Office","District Collectorate"],
    addedDate:"2023-09-15",
  },
  {
    id:"TN_002",state:"Tamil Nadu",isNew:true,isCentral:false,
    name:"Pudhumai Penn Scheme",
    name_ta:"புதுமைப் பெண் திட்டம்",name_hi:"पुधुमई पेन योजना",name_te:"పుధుమై పెన్ పథకం",
    emoji:"",category:"education",color:"#dda15e",
    tagline:"Education support for girls in college",
    benefit:"₹1,000 every month for girl students studying in college",
    benefit_simple:"If you are a girl studying in college, government gives ₹1,000 every month so you can focus on studies without worry.",
    benefit_simple_ta:"நீங்கள் கல்லூரியில் படிக்கும் மாணவி ஆனால், அரசு மாதம் ₹1,000 வழங்குகிறது. இதனால் கவலை இல்லாமல் படிப்பில் கவனம் செலுத்தலாம்.",
    benefit_simple_hi:"अगर आप कॉलेज में पढ़ने वाली लड़की हैं तो सरकार हर महीने ₹1,000 देती है ताकि आप बिना चिंता पढ़ाई पर ध्यान दे सकें।",
    benefit_simple_te:"మీరు కాలేజ్‌లో చదువుతున్న అమ్మాయి అయితే, ప్రభుత్వం ప్రతి నెల ₹1,000 ఇస్తుంది ताकि మీరు బెంగ లేకుండా చదువుపై దృష్టి పెట్టగలుగుతారు.",
    eligibility:{gender:"female",state:"tamil_nadu",age_min:18,age_max:25,studying:true},
    eligibility_plain:"Girl students in government colleges, age 18–25, from Tamil Nadu government schools.",
    eligibility_plain_ta:"தமிழ்நாடு அரசுப் பள்ளிகளில் படித்து, தற்போது அரசு கல்லூரிகளில் படிக்கும் 18–25 வயதுடைய மாணவிகள்.",
    eligibility_plain_hi:"18–25 वर्ष की वे लड़कियाँ जो तमिलनाडु की सरकारी स्कूलों में पढ़कर अब सरकारी कॉलेजों में पढ़ रही हैं।",
    eligibility_plain_te:"తమిళనాడు ప్రభుత్వ పాఠశాలల్లో చదివి, ఇప్పుడు ప్రభుత్వ కాలేజీల్లో చదువుతున్న 18–25 ఏళ్ల బాలికలు.",
    requiredDocs:["aadhaar","college_id","bank_passbook","ration_card"],
    documents:["Aadhaar Card","College ID Card","Bank Passbook","Ration Card","School Leaving Certificate"],
    apply_at:"Your College Office or e-Sevai Centre",
    helpCenters:["College Admin Office","e-Sevai Centre","District Education Office"],
    addedDate:"2023-09-01",
  },
  {
    id:"TN_003",state:"Tamil Nadu",isNew:false,isCentral:false,
    name:"Innuyir Kaapom — CM Health Insurance",
    name_ta:"இன்னுயிர் காப்போம்",name_hi:"इन्नुयिर काप्पोम",name_te:"ఇన్నుయిర్ కాప్పోమ్",
    emoji:"",category:"health",color:"#606c38",
    tagline:"Free hospital treatment up to ₹5 lakh",
    benefit:"Free medical treatment up to ₹5 lakh per year at government hospitals",
    benefit_simple:"If you are sick and need expensive treatment or surgery, government pays the full hospital bill — up to ₹5 lakh.",
    benefit_simple_ta:"உங்களுக்கு பெரிய சிகிச்சை அல்லது அறுவை சிகிச்சை தேவைப்பட்டால், அரசு அத்தனை மருத்துவ செலவையும் — அதிகபட்சம் ₹5 லட்சம் வரை — செலுத்துகிறது.",
    benefit_simple_hi:"अगर आपको बड़ी इलाज या ऑपरेशन की जरूरत हो तो सरकार आपका पूरा अस्पताल खर्च, अधिकतम ₹5 लाख तक, अपने पास से भरती है।",
    benefit_simple_te:"మీకు పెద్ద చికిత్స లేదా శస్త్రచికిత్స అవసరం అయితే, ప్రభుత్వం మీ ఆసుపత్రి బిల్లంతా — గరిష్టంగా ₹5 లక్షల వరకు — చెల్లిస్తుంది.",
    eligibility:{state:"tamil_nadu",income_annual_max:300000},
    eligibility_plain:"Any family in Tamil Nadu with annual income below ₹3 lakh.",
    eligibility_plain_ta:"தமிழ்நாட்டில் ஆண்டு வருமானம் ₹3 லட்சத்திற்குக் குறைவாக உள்ள எந்தக் குடும்பமும்.",
    eligibility_plain_hi:"तमिलनाडु का वह कोई भी परिवार जिसकी सालाना आमदनी ₹3 लाख से कम है।",
    eligibility_plain_te:"తమిళనాడులో వార్షిక ఆదాయం ₹3 లక్షలకు తగ్గగా ఉన్న ఏ కుటుంబమైనా.",
    requiredDocs:["aadhaar","ration_card"],
    documents:["Aadhaar Card","Ration Card"],
    apply_at:"Any Government Hospital or e-Sevai Centre",
    helpCenters:["Government Hospital","PHC","e-Sevai Centre","District Hospital"],
    addedDate:"2022-01-10",
  },
  {
    id:"TN_004",state:"Tamil Nadu",isNew:false,isCentral:false,
    name:"Moovalur Ramamirtham Ammaiyar Scheme",
    name_ta:"மூவலூர் ரామாமிர்தம் அம்மையார் திட்டம்",name_hi:"मूवलूर रामामिर्थम योजना",name_te:"మూవలూర్ రామామిర్థమ్ పథకం",
    emoji:"",category:"education",color:"#dda15e",
    tagline:"Free hostel + cash for SC/ST girls in college",
    benefit:"₹1,000/month + free hostel for SC/ST girl students",
    benefit_simple:"SC and ST girls studying in college get ₹1,000 every month AND free hostel. No rent, no worry.",
    benefit_simple_ta:"கல்லூரியில் படிக்கும் SC/ST மாணவிகளுக்கு அரசால் மாதம் ₹1,000வும், இலவச விடுதியும் வழங்கப்படுகிறது. வாடகை சுமை இல்லை, கவலை இல்லை.",
    benefit_simple_hi:"कॉलेज में पढ़ने वाली SC/ST लड़कियों को सरकार हर महीने ₹1,000 और मुफ्त हॉस्टल देती है। किराए की चिंता नहीं रहती।",
    benefit_simple_te:"కాలేజ్‌లో చదువుతున్న SC/ST అమ్మాయిలకు ప్రభుత్వం ప్రతి నెల ₹1,000తో పాటు ఉచిత హాస్టల్ ఇస్తుంది. అద్దె బాధలేదు.",
    eligibility:{gender:"female",state:"tamil_nadu",caste:["sc","st"],studying:true},
    eligibility_plain:"SC/ST girls in government colleges in Tamil Nadu.",
    eligibility_plain_ta:"தமிழ்நாட்டில் உள்ள அரசு கல்லூரிகளில் படிக்கும் SC/ST மாணவிகள்.",
    eligibility_plain_hi:"तमिलनाडु के सरकारी कॉलेजों में पढ़ने वाली SC/ST लड़कियाँ।",
    eligibility_plain_te:"తమిళనాడు ప్రభుత్వ కళాశాలల్లో చదువుతున్న SC/ST బాలికలు.",
    requiredDocs:["aadhaar","community_certificate","college_id","ration_card","income_certificate"],
    documents:["Aadhaar Card","Community Certificate","College ID","Ration Card","Income Certificate"],
    apply_at:"Social Welfare Department or e-Sevai Centre",
    helpCenters:["Social Welfare Department","e-Sevai Centre","District SC/ST Welfare Office"],
    addedDate:"2021-06-05",
  },
  {
    id:"TN_005",state:"Tamil Nadu",isNew:false,isCentral:false,
    name:"TN Agricultural Labourers Welfare",
    name_ta:"விவசாய கூலித் தொழிலாளர் நலத்திட்டம்",name_hi:"कृषि मजदूर कल्याण",name_te:"వ్యవసాయ కార్మిక సంక్షేమం",
    emoji:"",category:"farmer",color:"#606c38",
    tagline:"Insurance + pension for farm workers",
    benefit:"Accident insurance ₹1 lakh + pension ₹1,500/month after age 60",
    benefit_simple:"Farm workers get accident insurance of ₹1 lakh. After you turn 60, you get ₹1,500 every month as pension.",
    benefit_simple_ta:"விவசாயத் தொழிலாளர்களுக்கு ₹1 லட்சம் வரை விபத்து காப்பீடு கிடைக்கும். 60 வயதுக்கு பிறகு மாதம் ₹1,500 ஓய்வூதியம் வழங்கப்படும்.",
    benefit_simple_hi:"खेती में काम करने वाले मजदूरों को ₹1 लाख तक दुर्घटना बीमा मिलता है। 60 साल के बाद हर महीने ₹1,500 पेंशन दी जाती है।",
    benefit_simple_te:"వ్యవసాయ కార్మికులకు ₹1 లక్ష వరకు ప్రమాద బీమా లభిస్తుంది. మీరు 60 ఏళ్లు పూర్తయ్యాక ప్రతి నెల ₹1,500 పెన్షన్‌గా వస్తుంది.",
    eligibility:{occupation:"agricultural_labourer",state:"tamil_nadu"},
    eligibility_plain:"Anyone who works as a farm labourer in Tamil Nadu.",
    eligibility_plain_ta:"தமிழ்நாட்டில் விவசாய கூலித் தொழிலாளராக வேலை செய்பவர்கள் யாரும்.",
    eligibility_plain_hi:"तमिलनाडु में खेत मजदूर के रूप में काम करने वाला कोई भी व्यक्ति।",
    eligibility_plain_te:"తమిళనాడులో వ్యవసాయ కూలీగా పనిచేసే ఎవరైనా.",
    requiredDocs:["aadhaar","labour_card","bank_passbook"],
    documents:["Aadhaar Card","Labour Card","Bank Passbook","Age Proof"],
    apply_at:"Panchayat Office or Labour Department",
    helpCenters:["Gram Panchayat Office","Labour Department Office","Block Development Office"],
    addedDate:"2020-03-12",
  },
  {
    id:"TN_006",state:"Tamil Nadu",isNew:false,isCentral:false,
    name:"TNSIM — Crop Insurance",
    name_ta:"தமிழ்நாடு வேளாண் காப்பீட்டு திட்டம்",name_hi:"तमिलनाडु फसल बीमा",name_te:"తమిళనాడు పంట బీమా",
    emoji:"",category:"farmer",color:"#606c38",
    tagline:"Get money if your crops fail",
    benefit:"Government pays compensation if crops fail due to flood, drought or pest",
    benefit_simple:"If rain does not come, flood destroys, or insects eat your crops — government gives you money to cover your loss.",
    benefit_simple_ta:"மழை வராதால், வெள்ளம் அழித்தால் அல்லது பூச்சிகள் பயிரை சாப்பிட்டால் — அந்த நஷ்டத்தை ஈடு செய்ய அரசு உங்களுக்கு பணம் வழங்கும்.",
    benefit_simple_hi:"अगर बारिश न हो, बाढ़ से फसल नष्ट हो जाए या कीड़े फसल खा जाएँ तो सरकार आपका नुकसान भरने के लिए पैसा देती है।",
    benefit_simple_te:"వర్షం రాకపోతే, వరదలు పంటను పాడు చేస్తే లేదా పురుగులు పంటను తింటే — మీ నష్టాన్ని భర్తీ చేయడానికి ప్రభుత్వం మీకు డబ్బు ఇస్తుంది.",
    eligibility:{occupation:"farmer",state:"tamil_nadu"},
    eligibility_plain:"Any farmer in Tamil Nadu who grows crops.",
    eligibility_plain_ta:"தமிழ்நாட்டில் விவசாயம் செய்து பயிர் வளர்க்கும் எந்த விவசாயியும்.",
    eligibility_plain_hi:"तमिलनाडु का कोई भी किसान जो खेत में फसल उगाता है।",
    eligibility_plain_te:"తమిళనాడులో పంటలు పండించే ఏ రైతు అయినా.",
    requiredDocs:["aadhaar","land_records","bank_passbook"],
    documents:["Aadhaar Card","Patta (Land Record)","Bank Passbook"],
    apply_at:"Village Agriculture Officer (VAS) or Agriculture Department",
    helpCenters:["Village Agriculture Officer","Agriculture Department","Block Office"],
    addedDate:"2019-07-20",
  },
  {
    id:"TN_007",state:"Tamil Nadu",isNew:true,isCentral:false,
    name:"Differently Abled Persons Welfare",
    name_ta:"மாற்றுத்திறனாளிகள் நலத்திட்டம்",name_hi:"दिव्यांग कल्याण योजना",name_te:"వికలాంగుల సంక்షేమ పథకం",
    emoji:"",category:"disability",color:"#bc6c25",
    tagline:"Monthly support and free aids",
    benefit:"₹1,500/month pension + free assistive devices",
    benefit_simple:"Disabled persons get ₹1,500 every month and free wheelchair, hearing aid, or other devices they need.",
    benefit_simple_ta:"மாற்றுத்திறனாளிகளுக்கு மாதம் ₹1,500 ஓய்வூதியமும், தேவையான வாகன நாற்காலி, கேட்கும் கருவி போன்ற உதவி சாதனங்களும் இலவசமாக வழங்கப்படும்.",
    benefit_simple_hi:"दिव्यांग लोगों को हर महीने ₹1,500 पेंशन मिलती है और व्हीलचेयर, हियरिंग एड जैसी ज़रूरी सहायक सामग्री मुफ्त दी जाती है।",
    benefit_simple_te:"వికలాంగులకు ప్రతి నెల ₹1,500 పెన్షన్ లభిస్తుంది మరియు వీల్‌చెయిర్, హియరింగ్ ఎయిడ్ లాంటి అవసరమైన ఉపకరణాలు ఉచితంగా ఇస్తారు.",
    eligibility:{disabled:true,state:"tamil_nadu",income_annual_max:200000},
    eligibility_plain:"Persons with disability in Tamil Nadu, family income below ₹2 lakh.",
    eligibility_plain_ta:"தமிழ்நாட்டில் வசிக்கும் மாற்றுத்திறனாளிகள், குடும்ப ஆண்டு வருமானம் ₹2 லட்சத்திற்குக் குறைவாக இருக்க வேண்டும்.",
    eligibility_plain_hi:"तमिलनाडु के दिव्यांग व्यक्ति, जिनका पारिवारिक सालाना आय ₹2 लाख से कम है।",
    eligibility_plain_te:"తమిళనాడులో నివసించే వికలాంగులు, కుటుంబ వార్షిక ఆదాయం ₹2 లక్షల కంటే తక్కువగా ఉండాలి.",
    requiredDocs:["aadhaar","disability_certificate","bank_passbook","ration_card"],
    documents:["Aadhaar Card","Disability Certificate","Bank Passbook","Ration Card"],
    apply_at:"Social Welfare Department or e-Sevai Centre",
    helpCenters:["Social Welfare Department","e-Sevai Centre","District Disability Welfare Office"],
    addedDate:"2024-01-05",
  },
  // ── ANDHRA PRADESH ──
  {
    id:"AP_001",state:"Andhra Pradesh",isNew:false,isCentral:false,
    name:"YSR Rythu Bharosa",
    name_ta:"YSR ரைது பரோஸா",name_hi:"YSR रायथु भरोसा",name_te:"YSR రైతు భరోసా",
    emoji:"",category:"farmer",color:"#606c38",
    tagline:"₹13,500 per year for every farmer in AP",
    benefit:"₹13,500 per year directly to farmers' bank accounts",
    benefit_simple:"Every farmer in Andhra Pradesh gets ₹13,500 every year from the government. The money goes directly to your bank. No need to go anywhere.",
    benefit_simple_ta:"ஆந்திரப் பிரதேசத்தில் உள்ள ஒவ்வொரு விவசாயிக்கும் அரசு ஆண்டுக்கு ₹13,500 வழங்குகிறது. இந்தப் பணம் உங்கள் வங்கி கணக்கில் நேரடியாக வைக்கப்படும்; எங்கும் சென்று ஓட வேண்டியதில்லை.",
    benefit_simple_hi:"आंध्र प्रदेश के हर किसान को सरकार हर साल ₹13,500 देती है। यह पैसा सीधे आपके बैंक खाते में आता है, आपको कहीं जाने की जरूरत नहीं।",
    benefit_simple_te:"ఆంధ్రప్రదేశ్‌లో ప్రతి రైతుకు ప్రభుత్వం ప్రతి సంవత్సరం ₹13,500 ఇస్తుంది. ఈ డబ్బు నేరుగా మీ బ్యాంక్ ఖాతాలో జమ అవుతుంది, ఎక్కడికీ తిరగాల్సిన అవసరం లేదు.",
    eligibility:{occupation:"farmer",state:"andhra_pradesh"},
    eligibility_plain:"Any farmer owning agricultural land in Andhra Pradesh.",
    eligibility_plain_ta:"ஆந்திரப் பிரதேசத்தில் விவசாய நிலம் வைத்திருக்கும் எந்த விவசாயியும்.",
    eligibility_plain_hi:"आंध्र प्रदेश का कोई भी किसान जिसके पास कृषि भूमि है।",
    eligibility_plain_te:"ఆంధ్రప్రదేశ్‌లో వ్యవసాయ భూమి కలిగిన ఏ రైతు అయినా.",
    requiredDocs:["aadhaar","land_records","bank_passbook","ration_card"],
    documents:["Aadhaar Card","Land Records (Pattadar Passbook)","Bank Passbook","Ration Card"],
    apply_at:"Village Secretariat or MeeSeva Centre",
    helpCenters:["Village Secretariat","MeeSeva Centre","Agriculture Department","Mandal Office"],
    addedDate:"2019-10-15",
  },
  {
    id:"AP_002",state:"Andhra Pradesh",isNew:false,isCentral:false,
    name:"YSR Cheyutha",
    name_ta:"YSR சேயுத",name_hi:"YSR चेयुथा",name_te:"YSR చేయూత",
    emoji:"",category:"women",color:"#bc6c25",
    tagline:"₹18,750/year for BC/SC/ST/minority women",
    benefit:"₹18,750 per year for women from BC, SC, ST and minority communities",
    benefit_simple:"Women from backward and scheduled communities in AP get ₹18,750 every year — about ₹1,562 per month. Straight to your bank account.",
    benefit_simple_ta:"ஆந்திரப் பிரதேசத்தில் பின்தங்கிய மற்றும் ஒதுக்கப்பட்ட சமூகங்களைச் சேர்ந்த பெண்களுக்கு ஆண்டு ₹18,750 — மாதம் சுமார் ₹1,562 — நேரடியாக வங்கி கணக்கில் செலுத்தப்படும்.",
    benefit_simple_hi:"आंध्र प्रदेश की पिछड़ी, SC, ST और अल्पसंख्यक समुदायों की महिलाओं को हर साल ₹18,750 (लगभग ₹1,562 प्रति माह) सीधे बैंक खाते में मिलते हैं।",
    benefit_simple_te:"ఆంధ్రప్రదేశ్‌లో BC, SC, ST మరియు మైనారిటీ సమాజాల మహిళలకు సంవత్సరానికి ₹18,750 (దాదాపు నెలకు ₹1,562) నేరుగా బ్యాంక్ ఖాతాలో జమ అవుతుంది.",
    eligibility:{gender:"female",state:"andhra_pradesh",age_min:45,age_max:60,caste:["bc","sc","st","minority"]},
    eligibility_plain:"Women aged 45–60 from BC, SC, ST or minority communities in Andhra Pradesh.",
    eligibility_plain_ta:"ஆந்திரப் பிரதேசத்தில் வசிக்கும், வயது 45–60 உள்ள BC, SC, ST அல்லது சிறுபான்மை சமூகப் பெண்கள்.",
    eligibility_plain_hi:"आंध्र प्रदेश की 45–60 वर्ष आयु की महिलाएँ जो BC, SC, ST या अल्पसंख्यक समुदाय से हैं।",
    eligibility_plain_te:"ఆంధ్రప్రదేశ్‌లో 45–60 ఏళ్ల వయస్సు గల BC, SC, ST లేదా మైనారిటీ సమాజాల మహిళలు.",
    requiredDocs:["aadhaar","community_certificate","bank_passbook","ration_card","age_proof"],
    documents:["Aadhaar Card","Community Certificate","Bank Passbook","Ration Card","Age Proof"],
    apply_at:"Village Secretariat or MeeSeva Centre",
    helpCenters:["Village Secretariat","MeeSeva Centre","District Women Welfare Office"],
    addedDate:"2020-05-20",
  },
  {
    id:"AP_003",state:"Andhra Pradesh",isNew:false,isCentral:false,
    name:"YSR Aarogyasri",
    name_ta:"YSR ஆரோக்யஸ்ரீ",name_hi:"YSR आरोग्यश्री",name_te:"YSR ఆరోగ్యశ్రీ",
    emoji:"",category:"health",color:"#606c38",
    tagline:"Free treatment up to ₹5 lakh at hospitals",
    benefit:"Cashless medical treatment up to ₹5 lakh at government and private hospitals",
    benefit_simple:"Any serious illness or surgery is treated for free at government and many private hospitals in AP. No hospital bill for you — government pays.",
    benefit_simple_ta:"ஆந்திரப் பிரதேசத்தில் பெரிய நோய்கள் மற்றும் அறுவை சிகிச்சைகள் அரசு மற்றும் பல தனியார் மருத்துவமனைகளில் இலவசமாக சிகிச்சை அளிக்கப்படுகின்றன. உங்களுக்கு மருத்துவ மசோதா கிடையாது — அரசு செலுத்தும்.",
    benefit_simple_hi:"आंध्र प्रदेश में कोई भी गंभीर बीमारी या ऑपरेशन सरकारी और कई निजी अस्पतालों में मुफ्त इलाज से कवर होता है। आपको अस्पताल का बिल नहीं भरना पड़ता — सरकार भरती है।",
    benefit_simple_te:"ఆంధ్రప్రదేశ్‌లో తీవ్రమైన వ్యాధులు లేదా శస్త్రచికిత్సలు ప్రభుత్వ మరియు అనేక ప్రైవేట్ ఆసుపత్రుల్లో ఉచితంగా చేయబడతాయి. మీకు బిల్లు ఉండదు — ప్రభుత్వమే చెల్లిస్తుంది.",
    eligibility:{state:"andhra_pradesh",income_annual_max:500000},
    eligibility_plain:"Any family in Andhra Pradesh with annual income below ₹5 lakh.",
    eligibility_plain_ta:"ஆந்திரப் பிரதேசத்தில் ஆண்டு வருமானம் ₹5 லட்சத்திற்குக் குறைவாக உள்ள எந்தக் குடும்பமும்.",
    eligibility_plain_hi:"आंध्र प्रदेश का कोई भी परिवार जिसकी सालाना आय ₹5 लाख से कम है।",
    eligibility_plain_te:"ఆంధ్రప్రదేశ్‌లో వార్షిక ఆదాయం ₹5 లక్షలకు తగ్గగా ఉన్న ఏ కుటుంబమైనా.",
    requiredDocs:["aadhaar","ration_card","income_certificate"],
    documents:["Aadhaar Card","Ration Card","Income Certificate"],
    apply_at:"Village Secretariat or any empanelled hospital",
    helpCenters:["Village Secretariat","Government Hospital","MeeSeva Centre","District Hospital"],
    addedDate:"2019-08-11",
  },
  {
    id:"AP_004",state:"Andhra Pradesh",isNew:true,isCentral:false,
    name:"YSR Jagananna Vidya Deevena",
    name_ta:"YSR ஜகன்னா வித்யா தீவேனா",name_hi:"YSR जगनन्ना विद्या दीवेना",name_te:"YSR జగనన్న విద్యా దీవెన",
    emoji:"",category:"education",color:"#dda15e",
    tagline:"100% fee reimbursement for college students",
    benefit:"Full tuition fee paid by government for ITI, polytechnic, degree and PG students",
    benefit_simple:"If your child is studying in college — ITI, polytechnic or degree — government pays the full tuition fee. You pay nothing. Money goes directly to college.",
    benefit_simple_ta:"உங்கள் குழந்தை ITI, பாலிடெக்னிக் அல்லது டிகிரி கல்லூரியில் படித்து வந்தால், முழு கட்டணத்தையும் அரசு செலுத்தும். நீங்கள் எந்தக் கட்டணமும் செலுத்த வேண்டியதில்லை; தொகை நேரடியாக கல்லூரிக்கு செல்கிறது.",
    benefit_simple_hi:"अगर आपका बच्चा ITI, पॉलिटेक्निक या डिग्री कॉलेज में पढ़ रहा है तो पूरी फीस सरकार भरती है। आपको एक रुपया भी नहीं देना पड़ता, पैसा सीधे कॉलेज में जाता है।",
    benefit_simple_te:"మీ బిడ్డ ITI, పాలిటెక్నిక్ లేదా డిగ్రీ కాలేజ్‌లో చదువుతుంటే మొత్తం ట్యూషన్ ఫీజును ప్రభుత్వం చెల్లిస్తుంది. మీరు ఏ ఫీజూ చెల్లించాల్సిన అవసరం లేదు; డబ్బు నేరుగా కాలేజ్‌కి వెళ్తుంది.",
    eligibility:{state:"andhra_pradesh",studying:true,income_annual_max:250000},
    eligibility_plain:"Students from families with income below ₹2.5 lakh studying in AP colleges.",
    eligibility_plain_ta:"ஆந்திரப் பிரதேசக் கல்லூரிகளில் படித்து, குடும்ப ஆண்டு வருமானம் ₹2.5 லட்சத்திற்குக் குறைவாக உள்ள மாணவர்கள்.",
    eligibility_plain_hi:"वे छात्र जो आंध्र प्रदेश के कॉलेज में पढ़ रहे हैं और जिनके परिवार की सालाना आय ₹2.5 लाख से कम है।",
    eligibility_plain_te:"ఆంధ్రప్రదేశ్‌లోని కాలేజీల్లో చదువుతూ, కుటుంబ వార్షిక ఆదాయం ₹2.5 లక్షలకు తగ్గగా ఉన్న విద్యార్థులు.",
    requiredDocs:["aadhaar","college_id","income_certificate","bank_passbook","ration_card"],
    documents:["Aadhaar Card","College ID","Income Certificate","Bank Passbook","Ration Card"],
    apply_at:"Village Secretariat or College Admin Office",
    helpCenters:["Village Secretariat","College Admin Office","MeeSeva Centre","District Education Office"],
    addedDate:"2023-06-01",
  },
  {
    id:"AP_005",state:"Andhra Pradesh",isNew:false,isCentral:false,
    name:"YSR Pension Kanuka",
    name_ta:"YSR பென்ஷன் கனுகா",name_hi:"YSR पेंशन कनुका",name_te:"YSR పెన్షన్ కానుక",
    emoji:"",category:"elderly",color:"#283618",
    tagline:"₹3,000/month pension for elderly and disabled",
    benefit:"₹3,000/month pension for elderly, disabled, widows and weavers in AP",
    benefit_simple:"Old people (60+), disabled persons, and widows in AP get ₹3,000 every month from the government as pension.",
    benefit_simple_ta:"ஆந்திரப் பிரதேசத்தில் 60 வயதுக்கு மேற்பட்ட முதியோர், மாற்றுத்திறனாளிகள் மற்றும் விதவைகள் அனைவருக்கும் அரசு மாதம் ₹3,000 ஓய்வூதியம் வழங்குகிறது.",
    benefit_simple_hi:"आंध्र प्रदेश में 60+ उम्र के बुज़ुर्ग, दिव्यांग और विधवाओं को सरकार हर महीने ₹3,000 पेंशन देती है।",
    benefit_simple_te:"ఆంధ్రప్రదేశ్‌లో 60 ఏళ్లు దాటిన వృద్ధులు, వికలాంగులు మరియు విధవలకు ప్రభుత్వం ప్రతి నెల ₹3,000 పెన్షన్ ఇస్తుంది.",
    eligibility:{state:"andhra_pradesh",income_annual_max:100000},
    eligibility_plain:"Elderly (60+), disabled, widows or weavers in Andhra Pradesh from poor families.",
    eligibility_plain_ta:"ஆந்திரப் பிரதேசத்தில் வறிய குடும்பத்தைச் சேர்ந்த 60+ முதியோர், மாற்றுத்திறனாளிகள், விதவைகள் அல்லது நெசவாளர்கள்.",
    eligibility_plain_hi:"आंध्र प्रदेश के गरीब परिवारों के 60+ बुज़ुर्ग, दिव्यांग, विधवाएँ या बुनकर।",
    eligibility_plain_te:"ఆంధ్రప్రదేశ్‌లో పేద కుటుంబాలకు చెందిన 60+ వృద్ధులు, వికలాంగులు, విధవులు లేదా నేయుగాళ్లు.",
    requiredDocs:["aadhaar","age_proof","bank_passbook","ration_card"],
    documents:["Aadhaar Card","Age Proof","Bank Passbook","Ration Card"],
    apply_at:"Village Secretariat",
    helpCenters:["Village Secretariat","MeeSeva Centre","District Social Welfare Office"],
    addedDate:"2019-11-01",
  },
  // ── TELANGANA ──
  {
    id:"TS_001",state:"Telangana",isNew:false,isCentral:false,
    name:"Rythu Bandhu",
    name_ta:"ரைது பந்து",name_hi:"रायथु बंधु",name_te:"రైతు బంధు",
    emoji:"",category:"farmer",color:"#606c38",
    tagline:"₹10,000 per acre per year for farmers",
    benefit:"₹5,000 per acre per season (₹10,000/year) for all farmers in Telangana",
    benefit_simple:"Every farmer in Telangana gets ₹5,000 per acre before each crop season. Government gives this directly to your bank so you can buy seeds and fertilizer.",
    benefit_simple_ta:"தெலங்கானாவில் உள்ள ஒவ்வொரு விவசாயிக்கும் ஒவ்வொரு பயிர் சீசனுக்கும் ஏக்கருக்கு ₹5,000 அரசு வழங்குகிறது. விதை, உரம் வாங்க இந்தத் தொகை நேரடியாக உங்கள் வங்கி கணக்கில் வரும்.",
    benefit_simple_hi:"तेलंगाना के हर किसान को हर फसल सीजन से पहले प्रति एकड़ ₹5,000 मिलते हैं। यह पैसा सीधे आपके बैंक खाते में आता है ताकि आप बीज और खाद खरीद सकें।",
    benefit_simple_te:"తెలంగాణలో ప్రతి పంట సీజన్‌కు ముందు ప్రతి ఎకరానికి రైతుకు ₹5,000 ప్రభుత్వం ఇస్తుంది. విత్తనాలు, ఎరువులు కొనడానికి ఈ డబ్బు నేరుగా మీ బ్యాంక్ ఖాతాలో జమ అవుతుంది.",
    eligibility:{occupation:"farmer",state:"telangana"},
    eligibility_plain:"Any farmer owning agricultural land in Telangana.",
    eligibility_plain_ta:"தெலங்கானாவில் விவசாய நிலம் வைத்திருக்கும் எந்த விவசாயியும்.",
    eligibility_plain_hi:"तेलंगाना का कोई भी किसान जिसके पास कृषि भूमि है।",
    eligibility_plain_te:"తెలంగాణలో వ్యవసాయ భూమి ఉన్న ఏ రైతూ.",
    requiredDocs:["aadhaar","land_records","bank_passbook"],
    documents:["Aadhaar Card","Land Records (Pahani/Pattadar Passbook)","Bank Passbook"],
    apply_at:"Local Agriculture Office or Mee Seva Centre",
    helpCenters:["Local Agriculture Office","Mee Seva Centre","Mandal Office","District Collectorate"],
    addedDate:"2018-05-10",
  },
  {
    id:"TS_002",state:"Telangana",isNew:false,isCentral:false,
    name:"Aasara Pension",
    name_ta:"ஆஸரா பென்ஷன்",name_hi:"आसरा पेंशन",name_te:"ఆసరా పెన్షన్",
    emoji:"",category:"elderly",color:"#283618",
    tagline:"Monthly pension for elderly and disabled in Telangana",
    benefit:"₹3,016/month pension for elderly, disabled, widows and toddy tappers",
    benefit_simple:"Poor elderly people (60+), disabled, widows and toddy tappers in Telangana get over ₹3,000 every month as pension.",
    benefit_simple_ta:"தெலங்கானாவில் உள்ள வறிய 60+ முதியோர், மாற்றுத்திறனாளிகள், விதவைகள் மற்றும் குட்டிக்காரர்கள் ஆகியோருக்கு மாதம் ₹3,000 க்கும் மேல் ஓய்வூதியம் வழங்கப்படுகிறது.",
    benefit_simple_hi:"तेलंगाना के गरीब बुज़ुर्ग (60+), दिव्यांग, विधवा और ताड़ी मजदूरों को हर महीने ₹3,000 से अधिक पेंशन मिलती है।",
    benefit_simple_te:"తెలంగాణలో పేద వృద్ధులు (60+), వికలాంగులు, విధవులు మరియు టాడీ కార్మికులకు ప్రతి నెల ₹3,000 కంటే ఎక్కువ పెన్షన్ ఇస్తారు.",
    eligibility:{state:"telangana",income_annual_max:150000},
    eligibility_plain:"Elderly (60+), disabled, widows, or toddy tappers in Telangana from poor families.",
    eligibility_plain_ta:"தெலங்கானாவில் வறிய குடும்பத்தைச் சேர்ந்த 60+ முதியோர், மாற்றுத்திறனாளிகள், விதவைகள் அல்லது குட்டிக்காரர்கள்.",
    eligibility_plain_hi:"तेलंगाना के गरीब परिवारों के 60+ बुज़ुर्ग, दिव्यांग, विधवाएँ या ताड़ी मजदूर।",
    eligibility_plain_te:"తెలంగాణలో పేద కుటుంబాల 60+ వృద్ధులు, వికలాంగులు, విధవులు లేదా టాడీ కార్మికులు.",
    requiredDocs:["aadhaar","age_proof","bank_passbook","ration_card"],
    documents:["Aadhaar Card","Age Proof","Bank Passbook","Ration Card"],
    apply_at:"Gram Panchayat or Mee Seva Centre",
    helpCenters:["Gram Panchayat Office","Mee Seva Centre","District Social Welfare Office"],
    addedDate:"2014-06-02",
  },
  {
    id:"TS_003",state:"Telangana",isNew:true,isCentral:false,
    name:"KCR Kit — Maternity Benefit",
    name_ta:"KCR கிட் — மகப்பேறு சலுகை",name_hi:"KCR किट — मातृत्व लाभ",name_te:"KCR కిట్ — ప్రసూతి ప్రయోజనం",
    emoji:"",category:"women",color:"#bc6c25",
    tagline:"Free kit + ₹13,000 cash for pregnant women",
    benefit:"Baby kit with 16 items + ₹13,000 cash for pregnant women in Telangana",
    benefit_simple:"Pregnant women in Telangana get a free kit with all baby items plus ₹13,000 cash — ₹12,000 before birth and ₹1,000 after. Government takes care of mother and baby.",
    benefit_simple_ta:"தெலங்கானாவில் கர்ப்பிணிப் பெண்களுக்கு குழந்தைக்கு தேவையான பொருட்கள் உள்ள இலவச KCR கிட் மற்றும் மொத்தம் ₹13,000 பண உதவியும் கிடைக்கும் — பிரசவத்திற்கு முன் ₹12,000, பிறகு ₹1,000. அரசு அம்மா, குழந்தை இருவரையும் கவனிக்கிறது.",
    benefit_simple_hi:"तेलंगाना में गर्भवती महिलाओं को बच्चे के सभी सामान वाला मुफ्त KCR किट और कुल ₹13,000 नकद मिलता है — जन्म से पहले ₹12,000 और बाद में ₹1,000। सरकार माँ और बच्चे दोनों का ध्यान रखती है।",
    benefit_simple_te:"తెలంగాణలో గర్భిణీ స్త్రీలకు బిడ్డకు అవసరమైన అన్ని వస్తువులతో కూడిన ఉచిత KCR కిట్‌తో పాటు మొత్తం ₹13,000 నగదు లభిస్తుంది — పుట్టుకకు ముందు ₹12,000, తర్వాత ₹1,000. అమ్మ, బిడ్డ ఇద్దరినీ ప్రభుత్వం చూసుకుంటుంది.",
    eligibility:{gender:"female",state:"telangana",pregnant_or_new_mother:true},
    eligibility_plain:"Pregnant women registered at government hospitals in Telangana.",
    eligibility_plain_ta:"தெலங்கானாவில் அரசு மருத்துவமனைகளில் பதிவு செய்யப்பட்ட கர்ப்பிணிப் பெண்கள்.",
    eligibility_plain_hi:"तेलंगाना के सरकारी अस्पतालों में पंजीकृत गर्भवती महिलाएँ।",
    eligibility_plain_te:"తెలంగాణలో ప్రభుత్వ ఆసుపత్రుల్లో నమోదు అయిన గర్భిణీ స్త్రీలు.",
    requiredDocs:["aadhaar","pregnancy_proof","bank_passbook","ration_card"],
    documents:["Aadhaar Card","Pregnancy Certificate (from doctor)","Bank Passbook","Ration Card"],
    apply_at:"Government Hospital or Primary Health Centre",
    helpCenters:["Government Hospital","PHC","ASHA Worker","Mee Seva Centre"],
    addedDate:"2023-07-15",
  },
  {
    id:"TS_004",state:"Telangana",isNew:false,isCentral:false,
    name:"TS-RERA Housing for Poor",
    name_ta:"TS-RERA வீட்டு திட்டம்",name_hi:"TS-RERA आवास योजना",name_te:"TS-RERA పేదల ఇల్లు పథకం",
    emoji:"",category:"housing",color:"#dda15e",
    tagline:"Free 2BHK house for poor in Telangana",
    benefit:"Free 2BHK house (560 sq ft) for urban poor families",
    benefit_simple:"Poor families living in Telangana cities get a free 2-bedroom house from the government. No rent, no loan — it is yours.",
    benefit_simple_ta:"தெலங்கானா நகரங்களில் வசிக்கும் வறிய குடும்பங்களுக்கு அரசு இலவச 2BHK வீடு வழங்குகிறது. வாடகை இல்லை, கடன் இல்லை — வீடு முழுவதும் உங்களுக்கே.",
    benefit_simple_hi:"तेलंगाना के शहरों में रहने वाले गरीब परिवारों को सरकार मुफ्त 2 बेडरूम का घर देती है। न किराया, न लोन — घर आपका अपना हो जाता है।",
    benefit_simple_te:"తెలంగాణ నగరాల్లో నివసించే పేద కుటుంబాలకు ప్రభుత్వం ఉచితంగా 2 బెడ్‌రూమ్ ఇల్లు ఇస్తుంది. అద్దె లేదు, రుణం లేదు — ఆ ఇల్లు పూర్తిగా మీది.",
    eligibility:{state:"telangana",residence:"urban",income_annual_max:200000,has_pucca_house:false},
    eligibility_plain:"Urban poor families in Telangana without a proper house, income below ₹2 lakh.",
    eligibility_plain_ta:"தெலங்கானா நகரப்பகுதிகளில் வசித்து, நல்ல வீடு இல்லாமல், ஆண்டு வருமானம் ₹2 லட்சத்திற்குக் குறைவாக உள்ள வறிய குடும்பங்கள்.",
    eligibility_plain_hi:"तेलंगाना के शहरी गरीब परिवार जिनके पास पक्का घर नहीं है और जिनकी सालाना आय ₹2 लाख से कम है।",
    eligibility_plain_te:"తెలంగాణ పట్టణాల్లో సరిగ్గా ఇల్లు లేకుండా, వార్షిక ఆదాయం ₹2 లక్షల కంటే తక్కువగా ఉన్న పేద కుటుంబాలు.",
    requiredDocs:["aadhaar","income_certificate","ration_card","bank_passbook"],
    documents:["Aadhaar Card","Income Certificate","Ration Card","Bank Passbook"],
    apply_at:"GHMC Office or Mee Seva Centre",
    helpCenters:["GHMC Office","Mee Seva Centre","Municipal Office","District Collectorate"],
    addedDate:"2020-12-01",
  },
  {
    id:"TS_005",state:"Telangana",isNew:true,isCentral:false,
    name:"Telangana SC/ST Education Scholarships",
    name_ta:"தெலங்கானா SC/ST கல்வி உதவித்தொகை",name_hi:"तेलंगाना SC/ST शिक्षा छात्रवृत्ति",name_te:"తెలంగాణ SC/ST విద్యా స్కాలర్‌షిప్",
    emoji:"",category:"education",color:"#dda15e",
    tagline:"Full fee + stipend for SC/ST students",
    benefit:"100% fee reimbursement + ₹1,500/month stipend for SC/ST students",
    benefit_simple:"SC and ST students in Telangana colleges get full fee paid by government plus ₹1,500 every month to spend on food and books.",
    benefit_simple_ta:"தெலங்கானா கல்லூரிகளில் படிக்கும் SC/ST மாணவர்களுக்கு முழுக் கட்டணத்தையும் அரசு செலுத்தும், அதோடு உணவு மற்றும் புத்தகங்களுக்கு மாதம் ₹1,500 உதவியும் கிடைக்கும்.",
    benefit_simple_hi:"तेलंगाना के कॉलेजों में पढ़ने वाले SC/ST छात्रों की पूरी फीस सरकार भरती है और खाने‑किताबों के लिए हर महीने ₹1,500 भी देती है।",
    benefit_simple_te:"తెలంగాణ కళాశాలల్లో చదువుతున్న SC/ST విద్యార్థుల పూర్తి ఫీజు ప్రభుత్వమే చెల్లిస్తుంది మరియు ఆహారం, పుస్తకాలకు ప్రతి నెల ₹1,500 ఇస్తుంది.",
    eligibility:{state:"telangana",caste:["sc","st"],studying:true},
    eligibility_plain:"SC or ST students studying in Telangana colleges.",
    eligibility_plain_ta:"தெலங்கானா மாநில கல்லூரிகளில் தற்போது படிக்கும் SC அல்லது ST மாணவர்கள்.",
    eligibility_plain_hi:"वे छात्र जो तेलंगाना के कॉलेजों में पढ़ रहे SC या ST समुदाय से हैं।",
    eligibility_plain_te:"తెలంగాణ కాలేజీల్లో చదువుతున్న SC లేదా ST విద్యార్థులు.",
    requiredDocs:["aadhaar","community_certificate","college_id","bank_passbook","income_certificate"],
    documents:["Aadhaar Card","Community Certificate","College ID","Bank Passbook","Income Certificate"],
    apply_at:"College Admin Office or Mee Seva Centre",
    helpCenters:["College Admin Office","Mee Seva Centre","District SC/ST Welfare Office"],
    addedDate:"2024-02-10",
  },
  // ── CENTRAL SCHEMES ──
  {
    id:"CN_001",state:"Central",isNew:false,isCentral:true,
    name:"PM-KISAN Samman Nidhi",
    name_ta:"பிரதம மந்திரி கிசான் சம்மான் நிதி",name_hi:"प्रधानमंत्री किसान सम्मान निधि",name_te:"ప్రధానమంత్రి కిసాన్ సమ్మాన్ నిధి",
    emoji:"",category:"farmer",color:"#606c38",
    tagline:"₹6,000 every year for all farmers",
    benefit:"₹6,000 per year in 3 instalments of ₹2,000 directly to bank",
    benefit_simple:"Every farmer gets ₹2,000 three times a year — total ₹6,000. Money comes directly to your bank. No need to ask anyone.",
    benefit_simple_ta:"இந்த திட்டத்தில், வருடத்தில் மூன்று தடவை ஒவ்வொரு விவசாயிக்கும் ₹2,000 — மொத்தம் ₹6,000 — வழங்கப்படுகிறது. இந்தத் தொகை நேரடியாக உங்கள் வங்கி கணக்கில் வரும்; யாரையும் கேட்டு செல்ல வேண்டியதில்லை.",
    benefit_simple_hi:"इस योजना में हर किसान को साल में तीन बार ₹2,000 यानी कुल ₹6,000 मिलते हैं। पैसा सीधे आपके बैंक खाते में आता है, किसी के आगे हाथ फैलाने की जरूरत नहीं।",
    benefit_simple_te:"ఈ పథకంలో ప్రతి రైతుకు సంవత్సరానికి మూడు సార్లు ₹2,000 చొప్పున — మొత్తం ₹6,000 — వస్తుంది. ఈ డబ్బు నేరుగా మీ బ్యాంక్ ఖాతాలో జమ అవుతుంది; ఎవరినీ అడగాల్సిన అవసరం లేదు.",
    eligibility:{occupation:"farmer",land_hectares_max:2},
    eligibility_plain:"Any farmer who owns agricultural land. Works all over India.",
    eligibility_plain_ta:"இந்தியாவின் எங்கும், 2 ஹெக்டேருக்கு குறைவான நிலத்தை own செய்திருக்கும் எந்த விவசாயியும்.",
    eligibility_plain_hi:"भारत में ऐसा कोई भी किसान जिसके पास 2 हेक्टेयर तक कृषि भूमि है।",
    eligibility_plain_te:"భారతదేశంలో గరిష్టంగా 2 హెక్టార్ల వ్యవసాయ భూమి కలిగిన ఏ రైతైనా.",
    requiredDocs:["aadhaar","land_records","bank_passbook"],
    documents:["Aadhaar Card","Land Records (Patta/Khata)","Bank Passbook","Mobile Number"],
    apply_at:"Village Agriculture Officer or CSC Centre",
    helpCenters:["Village Agriculture Officer (VAS)","Common Service Centre (CSC)","Block Agriculture Office"],
    addedDate:"2019-02-24",
  },
  {
    id:"CN_002",state:"Central",isNew:false,isCentral:true,
    name:"Ayushman Bharat — PMJAY",
    name_ta:"ஆயுஷ்மான் பாரத்",name_hi:"आयुष्मान भारत",name_te:"ఆయుష్మాన్ భారత్",
    emoji:"",category:"health",color:"#606c38",
    tagline:"Big hospital bills paid by government",
    benefit:"Free treatment up to ₹5 lakh per year at empanelled hospitals",
    benefit_simple:"For big surgeries and serious illness, government pays up to ₹5 lakh. Works at many private hospitals too.",
    benefit_simple_ta:"பெரிய அறுவை சிகிச்சைகள் அல்லது கடுமையான நோய்களுக்கு, அரசு அதிகபட்சம் ₹5 லட்சம் வரை மருத்துவச் செலவுகளை ஏற்றுக்கொள்கிறது. பல தனியார் மருத்துவமனைகளிலும் இந்தத் திட்டம் பொருந்தும்.",
    benefit_simple_hi:"बड़ी सर्जरी या गंभीर बीमारी के लिए सरकार अधिकतम ₹5 लाख तक का इलाज खर्च उठाती है। यह योजना कई प्राइवेट अस्पतालों में भी लागू है।",
    benefit_simple_te:"పెద్ద శస్త్రచికిత్సలు లేదా తీవ్రమైన వ్యాధుల కోసం ప్రభుత్వం గరిష్టంగా ₹5 లక్షల వరకు చికిత్స ఖర్చు భరిస్తుంది. ఈ పథకం అనేక ప్రైవేట్ ఆసుపత్రుల్లో కూడా పనిచేస్తుంది.",
    eligibility:{income_annual_max:200000},
    eligibility_plain:"Families with annual income below ₹2 lakh. BPL families get priority.",
    eligibility_plain_ta:"ஆண்டுக்கு ₹2 லட்சத்திற்குக் குறைவான வருமானம் கொண்ட குடும்பங்கள். BPL பட்டியலில் உள்ளவர்களுக்கு முன்னுரிமை.",
    eligibility_plain_hi:"वे परिवार जिनकी सालाना आय ₹2 लाख से कम है। BPL परिवारों को पहले प्राथमिकता मिलती है।",
    eligibility_plain_te:"వార్షిక ఆదాయం ₹2 లక్షల కంటే తక్కువగా ఉన్న కుటుంబాలు. BPL కుటుంబాలకు ప్రాధాన్యం ఇస్తారు.",
    requiredDocs:["aadhaar","ration_card"],
    documents:["Aadhaar Card","Ration Card"],
    apply_at:"Empanelled Hospital or CSC Centre",
    helpCenters:["Nearest Empanelled Hospital","Common Service Centre (CSC)","District Health Office"],
    addedDate:"2018-09-23",
  },
  {
    id:"CN_003",state:"Central",isNew:false,isCentral:true,
    name:"PMAY-G — Rural Housing",
    name_ta:"பிரதம மந்திரி ఆవாஸ் யோஜனா (கிரామம்)",name_hi:"प्रधानमंत्री आवास योजना-ग्रामीण",name_te:"ప్రధానమంత్రి గ్రామీణ ఆవాస్ యోజన",
    emoji:"",category:"housing",color:"#dda15e",
    tagline:"₹1.2 lakh to build your own house",
    benefit:"₹1,20,000 to construct a pucca house in rural areas",
    benefit_simple:"If you live in a mud or thatched house, government gives ₹1.2 lakh to build a proper brick house. You don't repay this money.",
    benefit_simple_ta:"நீங்கள் மண் அல்லது புல் கூரையிலான வீட்டில் வசித்தால், அரசு உங்களுக்கு ஒரு நல்ல செங்கல் வீட்டைக் கட்ட ₹1.2 லட்சம் வழங்கும். இந்தத் தொகையை திருப்பிச் செலுத்த வேண்டியதில்லை.",
    benefit_simple_hi:"अगर आप कच्चे या झोपड़ी जैसे घर में रहते हैं तो सरकार आपको पक्का ईंट का घर बनाने के लिए ₹1.2 लाख देती है। यह पैसा आपको वापस नहीं करना होता।",
    benefit_simple_te:"మీరు మట్టి ఇల్లు లేదా గడ్డి కప్పు ఉన్న ఇంటిలో ఉంటే, ప్రభుత్వం పక్కా ఇటుకల ఇల్లు కట్టుకోవడానికి ₹1.2 లక్షలు ఇస్తుంది. ఈ డబ్బును మీరు తిరిగి చెల్లించాల్సిన అవసరం లేదు.",
    eligibility:{residence:"rural",income_annual_max:200000,has_pucca_house:false},
    eligibility_plain:"Rural families without a proper house, income below ₹2 lakh.",
    eligibility_plain_ta:"ஊரக பகுதிகளில் வசிக்கும், நல்ல பக்கா வீடு இல்லாத மற்றும் ஆண்டு வருமானம் ₹2 லட்சத்திற்குக் குறைவாக உள்ள குடும்பங்கள்.",
    eligibility_plain_hi:"गाँवों में रहने वाले वे परिवार जिनके पास पक्का घर नहीं है और जिनकी सालाना आय ₹2 लाख से कम है।",
    eligibility_plain_te:"గ్రామీణ ప్రాంతాల్లో నివసిస్తూ పక్కా ఇల్లు లేని, వార్షిక ఆదాయం ₹2 లక్షల కంటే తక్కువగా ఉన్న కుటుంబాలు.",
    requiredDocs:["aadhaar","ration_card","land_document","bank_passbook"],
    documents:["Aadhaar Card","BPL/Ration Card","Land Document","Bank Passbook"],
    apply_at:"Gram Panchayat or Block Development Office",
    helpCenters:["Gram Panchayat Office","Block Development Office (BDO)","District Rural Development Office"],
    addedDate:"2016-11-20",
  },
  {
    id:"CN_004",state:"Central",isNew:false,isCentral:true,
    name:"Ujjwala 2.0 — Free LPG",
    name_ta:"உஜ்வலா 2.0 யோஜனா",name_hi:"उज्ज्वला 2.0 योजना",name_te:"ఉజ్జ్వల 2.0 యోజన",
    emoji:"",category:"women",color:"#bc6c25",
    tagline:"Free cooking gas connection for women",
    benefit:"Free LPG connection + first cylinder free for poor women",
    benefit_simple:"Women from poor families get a gas cylinder and stove connection for free. No more smoke from firewood. Healthier kitchen for you and your children.",
    benefit_simple_ta:"வறிய குடும்பத்தைச் சேர்ந்த பெண்களுக்கு இலவச எல்.பி.ஜி சிலிண்டர் மற்றும் அடுப்பு இணைப்பு வழங்கப்படுகிறது. இனி薪 கொண்டு புகை பிடிக்க வேண்டாம்; உங்களுக்கும் உங்கள் குழந்தைகளுக்கும் ஆரோக்யமான சமையலறை.",
    eligibility:{gender:"female",income_annual_max:200000,has_lpg:false},
    eligibility_plain:"Women from BPL families who don't already have an LPG connection.",
    eligibility_plain_ta:"ஏற்கனவே எல்.பி.ஜி இணைப்பு இல்லாத BPL (வறிய) குடும்பங்களைச் சேர்ந்த பெண்கள்.",
    eligibility_plain_hi:"वे महिलाएँ जो BPL परिवार से हैं और जिनके घर में पहले से LPG कनेक्शन नहीं है।",
    eligibility_plain_te:"ఇప్పటికే LPG కనెక్షన్ లేని BPL (పేద) కుటుంబాల మహిళలు.",
    requiredDocs:["aadhaar","ration_card","bank_passbook"],
    documents:["Aadhaar Card","BPL/Ration Card","Bank Passbook","Address Proof"],
    apply_at:"Nearest LPG Distributor or CSC Centre",
    helpCenters:["Nearest Gas Agency","Common Service Centre (CSC)","Block Office"],
    addedDate:"2021-08-10",
  },
  {
    id:"CN_005",state:"Central",isNew:true,isCentral:true,
    name:"PM Vishwakarma Yojana",
    name_ta:"பிரதம மந்திரி விஸ்வகர்மா யோஜனா",name_hi:"प्रधानमंत्री विश्वकर्मा योजना",name_te:"ప్రధానమంత్రి విశ్వకర్మ యోజన",
    emoji:"",category:"artisan",color:"#bc6c25",
    tagline:"Loan + tools + training for craftspeople",
    benefit:"₹3 lakh low-interest loan + free skill training + ₹15,000 for tools",
    benefit_simple:"Carpenters, blacksmiths, potters, tailors — get free training, ₹15,000 for tools, and loan up to ₹3 lakh at low interest.",
    benefit_simple_ta:"தச்சர்கள், கம்மியர்கள், குயவர்கள், தையல்காரர்கள் போன்ற பாரம்பரிய தொழிலாளர்கள் இலவச பயிற்சி, கருவிகளுக்காக ₹15,000 உதவி மற்றும் குறைந்த வட்டியில் ₹3 லட்சம் வரை கடன் பெறலாம்.",
    eligibility:{occupation:"artisan"},
    eligibility_plain:"Traditional craftspeople and artisans — carpenters, weavers, goldsmiths, potters, cobblers etc.",
    eligibility_plain_ta:"தச்சர், நெசவாளர், பொற்கொல்லன், குயவர், செருப்புக் காரர் போன்ற பாரம்பரிய தொழில் செய்பவர்கள்.",
    eligibility_plain_hi:"ऐसे पारंपरिक कारीगर जैसे बढ़ई, बुनकर, सुनार, कुम्हार, मोची आदि।",
    eligibility_plain_te:"సాంప్రదాయ వృత్తులైన మిస్త్రీలు, నేయుగాళ్లు, బంగారు పనివారు, కుంభకారులు, చెప్పుల కర్మాగారులు మొదలైన చేతివృత్తి దారులు.",
    requiredDocs:["aadhaar","bank_passbook"],
    documents:["Aadhaar Card","Bank Passbook","Caste Certificate","Proof of trade"],
    apply_at:"CSC Centre or PM Vishwakarma Portal",
    helpCenters:["Common Service Centre (CSC)","District Industries Centre","Block Office"],
    addedDate:"2023-09-17",
  },
  {
    id:"CN_006",state:"Central",isNew:false,isCentral:true,
    name:"MGNREGS — 100 Days Work",
    name_ta:"மகாத்மா காந்தி தேசிய ஊரக வேலை திட்டம்",name_hi:"महात्मा गांधी नरेगा",name_te:"మహాత్మా గాంధీ నరేగా",
    emoji:"",category:"employment",color:"#7a9860",
    tagline:"100 days of guaranteed work near your village",
    benefit:"Government guarantees 100 days of work per year at minimum wages",
    benefit_simple:"If you need work, government must give you work near your village for 100 days every year. If no work is given, you get unemployment allowance.",
    benefit_simple_ta:"வேலை தேவை என்றால், அரசு உங்கள் கிராமம் அருகில் வருடத்தில் 100 நாட்கள் வரை வேலை கொடுக்க வேண்டும். வேலை தரப்படாவிடில் வேலை இழப்பு உதவித்தொகை கிடைக்கும்.",
    eligibility:{residence:"rural",age_min:18},
    eligibility_plain:"Any adult (18+) living in rural India. No income limit.",
    eligibility_plain_ta:"இந்தியாவின் ஊரகப் பகுதிகளில் வசிக்கும் 18 வயதுக்கு மேற்பட்ட எந்த நபரும். வருமான வரம்பு இல்லை.",
    eligibility_plain_hi:"ग्रामीण भारत में रहने वाला कोई भी 18+ वयस्क व्यक्ति। इस योजना में कोई आय सीमा नहीं है।",
    eligibility_plain_te:"గ్రామీణ భారతదేశంలో నివసించే 18 సంవత్సరాలు పైబడిన ఏ వ్యక్తి అయినా. ఆదాయ పరిమితి లేదు.",
    requiredDocs:["aadhaar","job_card","bank_passbook"],
    documents:["Aadhaar Card","Job Card (from Panchayat — free)","Bank Passbook"],
    apply_at:"Gram Panchayat Office",
    helpCenters:["Gram Panchayat Office","Block Development Office","MGNREGS Field Assistant"],
    addedDate:"2005-09-07",
  },
  {
    id:"CN_007",state:"Central",isNew:false,isCentral:true,
    name:"PM Matru Vandana Yojana",
    name_ta:"பிரதம மந்திரி மாதுர் வந்தனா யோஜனா",name_hi:"प्रधानमंत्री मातृ वंदना योजना",name_te:"ప్రధానమంత్రి మాతృ వందన యోజన",
    emoji:"",category:"women",color:"#bc6c25",
    tagline:"₹5,000 cash for pregnant women",
    benefit:"₹5,000 cash for first pregnancy — for nutrition",
    benefit_simple:"Pregnant for the first time? Government gives ₹5,000 directly to your bank for food and nutrition. Healthy mother, healthy baby.",
    benefit_simple_ta:"முதல் முறையாக கர்ப்பமாக உள்ளீர்களா? உணவு மற்றும் ஊட்டச்சத்திற்கு அரசு நேரடியாக உங்கள் வங்கி கணக்கில் ₹5,000 செலுத்தும். ஆரோக்கியமான அம்மா, ஆரோக்கியமான குழந்தை.",
    benefit_simple_hi:"पहली बार गर्भवती हैं? सरकार खान‑पान और पोषण के लिए सीधे आपके बैंक खाते में ₹5,000 भेजती है। स्वस्थ माँ, स्वस्थ बच्चा।",
    benefit_simple_te:"మొదటిసారి గర్భవతి అయ్యారా? ఆహారం, పోషణ కోసం ప్రభుత్వం నేరుగా మీ బ్యాంక్ ఖాతాలో ₹5,000 జమ చేస్తుంది. ఆరోగ్యకరమైన తల్లి, ఆరోగ్యకరమైన బిడ్డ.",
    eligibility:{gender:"female",pregnant_or_new_mother:true,age_min:19},
    eligibility_plain:"Women pregnant for the first time, age 19 or above.",
    eligibility_plain_ta:"முதல் முறையாக கர்ப்பமாக உள்ள, வயது 19 மற்றும் அதற்கு மேற்பட்ட பெண்கள்.",
    eligibility_plain_hi:"वे महिलाएँ जो पहली बार गर्भवती हैं और जिनकी उम्र 19 वर्ष या उससे अधिक है।",
    eligibility_plain_te:"మొదటిసారి గర్భవతి అయిన, వయస్సు 19 ఏళ్లు లేదా అంతకు పైగా ఉన్న మహిళలు.",
    requiredDocs:["aadhaar","pregnancy_proof","bank_passbook"],
    documents:["Aadhaar Card","MCP Card (from ASHA worker)","Bank Passbook","Pregnancy proof"],
    apply_at:"ASHA Worker / Anganwadi Centre / PHC",
    helpCenters:["Your ASHA Worker","Anganwadi Centre","Primary Health Centre (PHC)"],
    addedDate:"2017-12-31",
  },
  {
    id:"CN_008",state:"Central",isNew:false,isCentral:true,
    name:"Old Age Pension — NSAP",
    name_ta:"முதியோர் ஓய்வூதியம்",name_hi:"वृद्धावस्था पेंशन",name_te:"వృద్ధాప్య పెన్షన్",
    emoji:"",category:"elderly",color:"#283618",
    tagline:"Monthly pension for senior citizens",
    benefit:"₹200–500/month pension for poor senior citizens aged 60+",
    benefit_simple:"If you are 60 or older and from a poor family, you get ₹200–500 every month as pension. Money comes to your bank or post office.",
    benefit_simple_ta:"நீங்கள் 60 வயது அல்லது அதற்கு மேற்பட்டவராகவும், வறிய குடும்பத்தைச் சேர்ந்தவராகவும் இருந்தால், மாதம் ₹200–₹500 வரை ஓய்வூதியம் கிடைக்கும். இந்தத் தொகை உங்கள் வங்கி அல்லது தபால் நிலைய கணக்கில் வருகிறது.",
    eligibility:{age_min:60,income_annual_max:100000},
    eligibility_plain:"Senior citizens aged 60+ from BPL families.",
    eligibility_plain_ta:"BPL (வறிய) குடும்பங்களைச் சேர்ந்த, 60 வயது மற்றும் அதற்கு மேற்பட்ட முதியோர்.",
    eligibility_plain_hi:"BPL परिवारों के 60 वर्ष या उससे अधिक आयु के बुज़ुर्ग।",
    eligibility_plain_te:"BPL కుటుంబాలకు చెందిన, వయస్సు 60 ఏళ్లు లేదా అంతకు పైగా ఉన్న వృద్ధులు.",
    requiredDocs:["aadhaar","age_proof","ration_card","bank_passbook"],
    documents:["Aadhaar Card","Age Proof","BPL/Ration Card","Bank Passbook"],
    apply_at:"Gram Panchayat or Block Office",
    helpCenters:["Gram Panchayat Office","Block Development Office","District Social Welfare Office"],
    addedDate:"2009-11-19",
  },
];

/* ============================================================
   DOCUMENT DEFINITIONS
   ============================================================ */
const DOC_TYPES = [
  {id:"aadhaar",label:"Aadhaar Card",label_ta:"ஆதார் அட்டை",label_hi:"आधार कार्ड",label_te:"ఆధార్ కార్డు",emoji:"",required:true,hint:"12-digit Aadhaar number or card"},
  {id:"bank_passbook",label:"Bank Passbook",label_ta:"வங்கி பாஸ்புக்",label_hi:"बैंक पासबुक",label_te:"బ్యాంక్ పాస్‌బుక్",emoji:"",required:true,hint:"First page showing name and account number"},
  {id:"ration_card",label:"Ration Card",label_ta:"ரேஷன் அட்டை",label_hi:"राशन कार्ड",label_te:"రేషన్ కార్డు",emoji:"",required:false,hint:"Family ration card (BPL/APL)"},
  {id:"age_proof",label:"Age Proof",label_ta:"வயது சான்று",label_hi:"उम्र का प्रमाण",label_te:"వయస్సు రుజువు",emoji:"",required:false,hint:"Birth certificate, school certificate, or Aadhaar"},
  {id:"land_records",label:"Land Records / Patta",label_ta:"நில பதிவு / பட்டா",label_hi:"भूमि रिकॉर्ड",label_te:"భూమి రికార్డులు",emoji:"",required:false,hint:"Patta, Khata, or Pattadar Passbook"},
  {id:"community_certificate",label:"Community Certificate",label_ta:"சாதி சான்றிதழ்",label_hi:"जाति प्रमाण पत्र",label_te:"కులం సర్టిఫికెట్",emoji:"",required:false,hint:"SC/ST/OBC/BC caste certificate"},
  {id:"income_certificate",label:"Income Certificate",label_ta:"வருமான சான்றிதழ்",label_hi:"आय प्रमाण पत्र",label_te:"ఆదాయ సర్టిఫికెట్",emoji:"",required:false,hint:"Issued by Tahsildar or Village Officer"},
  {id:"disability_certificate",label:"Disability Certificate",label_ta:"மாற்றுத்திறன் சான்று",label_hi:"विकलांगता प्रमाण पत्र",label_te:"వికలాంగత సర్టిఫికెట్",emoji:"",required:false,hint:"Issued by government medical board"},
  {id:"college_id",label:"College ID Card",label_ta:"கல்லூரி அட்டை",label_hi:"कॉलेज आईडी",label_te:"కాలేజ్ ఐడీ కార్డు",emoji:"",required:false,hint:"Current year college identity card"},
  {id:"labour_card",label:"Labour Card",label_ta:"தொழிலாளர் அட்டை",label_hi:"श्रम कार्ड",label_te:"లేబర్ కార్డు",emoji:"",required:false,hint:"Issued by Labour Department"},
  {id:"pregnancy_proof",label:"Pregnancy Certificate",label_ta:"கர்ப்ப சான்று",label_hi:"गर्भावस्था प्रमाण",label_te:"గర్భం సర్టిఫికెట్",emoji:"",required:false,hint:"From government doctor or ASHA worker"},
  {id:"job_card",label:"Job Card (MGNREGS)",label_ta:"வேலை அட்டை",label_hi:"जॉब कार्ड",label_te:"జాబ్ కార్డు",emoji:"",required:false,hint:"MGNREGS job card from Gram Panchayat — free"},
  {id:"land_document",label:"Land Document",label_ta:"நில ஆவணம்",label_hi:"भूमि दस्तावेज़",label_te:"భూమి పత్రం",emoji:"",required:false,hint:"Any document proving land ownership"},
];

const DOC_LABEL = (doc, lang) =>
  lang==="ta" ? doc.label_ta : lang==="hi" ? doc.label_hi : lang==="te" ? doc.label_te : doc.label;

/* ============================================================
   LANGUAGES
   ============================================================ */
const LANG_OPTIONS = [
  {code:"en",label:"English",flag:"",voice:"en-IN"},
  {code:"ta",label:"தமிழ்",flag:"",voice:"ta-IN"},
  {code:"hi",label:"हिंदी",flag:"",voice:"hi-IN"},
  {code:"te",label:"తెలుగు",flag:"",voice:"te-IN"},
];

const TRANSLATIONS = {
  en:{home:"Home",schemes:"All Schemes",checker:"Eligibility Check",benefits:"My Benefits",newSchemes:"New Schemes",login:"Login",logout:"Logout",uploadDocs:"Upload Documents",documents:"Documents",tapToLearn:"Tap to learn more",readAloud:"Read Aloud",stopReading:"Stop",schemeFor:"Scheme for",applyNow:"How to Apply",applyAt:"Apply at",helpCenters:"Nearby Help Centres",whatYouGet:"What You Get",simpleWords:"In Simple Words",whoCanApply:"Who Can Apply",docsNeeded:"Documents Needed",checkEligibility:"Check Eligibility",eligible:"You are ELIGIBLE!",notEligible:"Not eligible",mayBeEligible:"May be eligible",multiScheme:"You can apply for MULTIPLE schemes!",yourDocs:"Your Uploaded Documents",missingDocs:"Missing Documents",uploadHint:"Upload your documents once. We check eligibility automatically.",noResults:"No schemes found"},
  ta:{home:"முகப்பு",schemes:"திட்டங்கள்",checker:"தகுதி சோதனை",benefits:"என் பலன்கள்",newSchemes:"புதிய திட்டங்கள்",login:"உள்நுழைவு",logout:"வெளியேறு",uploadDocs:"ஆவணங்கள் பதிவேற்று",documents:"ஆவணங்கள்",tapToLearn:"மேலும் அறிய தட்டவும்",readAloud:"சத்தமாக படி",stopReading:"நிறுத்து",schemeFor:"திட்டம்",applyNow:"விண்ணப்பிக்க எப்படி",applyAt:"எங்கே விண்ணப்பிக்கலாம்",helpCenters:"அருகிலுள்ள உதவி மையங்கள்",whatYouGet:"நீங்கள் பெறுவது",simpleWords:"எளிய வார்த்தைகளில்",whoCanApply:"யார் விண்ணப்பிக்கலாம்",docsNeeded:"தேவையான ஆவணங்கள்",checkEligibility:"தகுதி சோதிக்கவும்",eligible:"நீங்கள் தகுதியானவர்!",notEligible:"தகுதியில்லை",mayBeEligible:"தகுதி இருக்கலாம்",multiScheme:"நீங்கள் பல திட்டங்களுக்கு விண்ணப்பிக்கலாம்!",yourDocs:"உங்கள் ஆவணங்கள்",missingDocs:"இல்லாத ஆவணங்கள்",uploadHint:"உங்கள் ஆவணங்களை ஒரே முறை பதிவேற்றவும். நாங்கள் தகுதியை சரிபார்க்கிறோம்.",noResults:"திட்டங்கள் இல்லை"},
  hi:{home:"होम",schemes:"सभी योजनाएं",checker:"पात्रता जांच",benefits:"मेरे लाभ",newSchemes:"नई योजनाएं",login:"लॉगिन",logout:"लॉगआउट",uploadDocs:"दस्तावेज़ अपलोड करें",documents:"दस्तावेज़",tapToLearn:"अधिक जानने के लिए दबाएं",readAloud:"ज़ोर से पढ़ें",stopReading:"रोकें",schemeFor:"योजना",applyNow:"आवेदन कैसे करें",applyAt:"कहाँ आवेदन करें",helpCenters:"नजदीकी सहायता केंद्र",whatYouGet:"आपको क्या मिलेगा",simpleWords:"आसान भाषा में",whoCanApply:"कौन आवेदन कर सकता है",docsNeeded:"जरूरी दस्तावेज",checkEligibility:"पात्रता जांचें",eligible:"आप पात्र हैं!",notEligible:"पात्र नहीं",mayBeEligible:"पात्र हो सकते हैं",multiScheme:"आप कई योजनाओं के लिए आवेदन कर सकते हैं!",yourDocs:"आपके दस्तावेज़",missingDocs:"अनुपस्थित दस्तावेज़",uploadHint:"अपने दस्तावेज़ एक बार अपलोड करें। हम पात्रता स्वतः जांचेंगे।",noResults:"कोई योजना नहीं मिली"},
  te:{home:"హోమ్",schemes:"అన్ని పథకాలు",checker:"అర్హత తనిఖీ",benefits:"నా లాభాలు",newSchemes:"కొత్త పథకాలు",login:"లాగిన్",logout:"లాగ్అవుట్",uploadDocs:"పత్రాలు అప్‌లోడ్ చేయండి",documents:"పత్రాలు",tapToLearn:"మరింత తెలుసుకోవడానికి నొక్కండి",readAloud:"గట్టిగా చదవండి",stopReading:"ఆపండి",schemeFor:"పథకం",applyNow:"దరఖాస్తు ఎలా చేయాలి",applyAt:"ఎక్కడ దరఖాస్తు చేయాలి",helpCenters:"దగ్గరలో సహాయ కేంద్రాలు",whatYouGet:"మీకు ఏమి వస్తుంది",simpleWords:"సులభ మాటలలో",whoCanApply:"ఎవరు దరఖాస్తు చేయవచ్చు",docsNeeded:"అవసరమైన పత్రాలు",checkEligibility:"అర్హత తనిఖీ చేయండి",eligible:"మీరు అర్హులు!",notEligible:"అర్హత లేదు",mayBeEligible:"అర్హత ఉండవచ్చు",multiScheme:"మీరు అనేక పథకాలకు దరఖాస్తు చేయవచ్చు!",yourDocs:"మీ పత్రాలు",missingDocs:"లేని పత్రాలు",uploadHint:"మీ పత్రాలను ఒకసారి అప్‌లోడ్ చేయండి. మేము అర్హతను స్వయంచాలకంగా తనిఖీ చేస్తాము.",noResults:"పథకాలు కనుగొనబడలేదు"},
};

const t = (lang,key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
const getSchemeName = (s,lang) => lang==="ta"?s.name_ta:lang==="hi"?s.name_hi:lang==="te"?s.name_te:s.name;

const getBenefitSimple = (scheme, lang) => {
  if(!scheme) return "";
  if(lang==="ta") return scheme.benefit_simple_ta || scheme.benefit_simple;
  if(lang==="hi") return scheme.benefit_simple_hi || scheme.benefit_simple;
  if(lang==="te") return scheme.benefit_simple_te || scheme.benefit_simple;
  return scheme.benefit_simple;
};

const getEligibilityPlain = (scheme, lang) => {
  if(!scheme) return "";
  if(lang==="ta") return scheme.eligibility_plain_ta || scheme.eligibility_plain;
  if(lang==="hi") return scheme.eligibility_plain_hi || scheme.eligibility_plain;
  if(lang==="te") return scheme.eligibility_plain_te || scheme.eligibility_plain;
  return scheme.eligibility_plain;
};

const CATEGORIES = [
  {id:"all",label:"All",emoji:""},{id:"women",label:"Women",emoji:""},
  {id:"farmer",label:"Farmers",emoji:""},{id:"health",label:"Health",emoji:""},
  {id:"education",label:"Education",emoji:""},{id:"housing",label:"Housing",emoji:""},
  {id:"employment",label:"Employment",emoji:""},{id:"elderly",label:"Elderly",emoji:""},
  {id:"disability",label:"Disability",emoji:""},{id:"artisan",label:"Artisan",emoji:""},
];

/* ============================================================
   READ ALOUD HOOK
   ============================================================ */
function useReadAloud() {
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef(null);

  const speak = (text, lang) => {
    if(!window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const voiceLang = LANG_OPTIONS.find(l=>l.code===lang)?.voice || "en-IN";
    const u = new SpeechSynthesisUtterance(text);

    // Pick a voice that matches the selected language (fallbacks to closest / default)
    const voices = synth.getVoices ? synth.getVoices() : [];
    const exactVoice = voices.find(v => v.lang === voiceLang);
    const baseLang = voiceLang.split("-")[0];
    const baseMatch = !exactVoice ? voices.find(v => v.lang && v.lang.startsWith(baseLang)) : null;
    const chosenVoice = exactVoice || baseMatch || voices[0];
    if (chosenVoice) u.voice = chosenVoice;

    u.lang = voiceLang;
    u.rate = 0.88;
    u.pitch = 1;
    u.onstart = ()=>setSpeaking(true);
    u.onend = ()=>setSpeaking(false);
    u.onerror = ()=>setSpeaking(false);
    utterRef.current = u;
    synth.speak(u);
  };

  const stop = () => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  };

  return { speak, stop, speaking };
}

/* ============================================================
   READ ALOUD BUTTON
   ============================================================ */
function ReadAloudBtn({ text, lang, color="#c4885a" }) {
  const { speak, stop, speaking } = useReadAloud();
  return (
    <button
      style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:30,border:`2px solid ${color}`,background:speaking?"#fff8f0":"transparent",color,fontSize:13,fontWeight:600,transition:"all .2s"}}
      onClick={speaking ? stop : ()=>speak(text,lang)}
    >
      {speaking ? <> {t(lang,"stopReading")}</> : <> {t(lang,"readAloud")}</>}
    </button>
  );
}

/* ============================================================
   DOCUMENT UPLOAD STORE
   ============================================================ */
function useDocStore() {
  const [uploadedDocs, setUploadedDocs] = useState({});

  const markUploaded = (docId) => {
    setUploadedDocs(prev=>({...prev,[docId]:{uploaded:true,timestamp:Date.now()}}));
  };
  const markRemoved = (docId) => {
    setUploadedDocs(prev=>{const n={...prev};delete n[docId];return n;});
  };
  const hasDoc = (docId) => !!uploadedDocs[docId];
  const uploadedIds = Object.keys(uploadedDocs);

  return { uploadedDocs, markUploaded, markRemoved, hasDoc, uploadedIds };
}

/* ============================================================
   ELIGIBILITY ENGINE  (document-aware)
   ============================================================ */
function checkEligibility(scheme, profile, uploadedIds) {
  const e = scheme.eligibility;
  const reasons = [];
  let eligible = true;

  if(e.gender && e.gender!==profile.gender){ eligible=false; reasons.push(`Requires ${e.gender}`); }
  if(e.state){
    const stateMatch = profile.state===e.state||(e.state==="tamil_nadu"&&profile.state==="tamil_nadu")||(e.state==="andhra_pradesh"&&profile.state==="andhra_pradesh")||(e.state==="telangana"&&profile.state==="telangana");
    if(!stateMatch){ eligible=false; reasons.push(`Only for ${scheme.state}`); }
  }
  if(e.income_annual_max && profile.income > e.income_annual_max){ eligible=false; reasons.push(`Income must be below ₹${(e.income_annual_max/100000).toFixed(1)}L`); }
  if(e.age_min && profile.age < e.age_min){ eligible=false; reasons.push(`Minimum age ${e.age_min}`); }
  if(e.age_max && profile.age > e.age_max){ eligible=false; reasons.push(`Maximum age ${e.age_max}`); }
  if(e.occupation && e.occupation!==profile.occupation && !(e.occupation==="farmer"&&profile.occupation==="farmer")){ eligible=false; reasons.push(`For ${e.occupation} only`); }
  if(e.caste && profile.caste && !e.caste.includes(profile.caste)){ eligible=false; reasons.push(`For ${e.caste.join("/")} only`); }
  if(e.studying && !profile.studying){ eligible=false; reasons.push("Must be a student"); }
  if(e.disabled && !profile.disabled){ eligible=false; reasons.push("For disabled persons"); }
  if(e.pregnant_or_new_mother && !profile.pregnant){ eligible=false; reasons.push("For pregnant/new mothers"); }
  if(e.residence && profile.residence && e.residence!==profile.residence){ eligible=false; reasons.push(`For ${e.residence} residents`); }
  if(e.has_pucca_house===false && profile.has_pucca_house){ eligible=false; reasons.push("For those without pucca house"); }
  if(e.has_lpg===false && profile.has_lpg){ eligible=false; reasons.push("For those without LPG"); }

  // doc check
  const missingDocs = scheme.requiredDocs.filter(d=>!uploadedIds.includes(d));
  const hasAllDocs = missingDocs.length===0;

  return { eligible, reasons, missingDocs, hasAllDocs };
}

/* ============================================================
   NAV BAR
   ============================================================ */
function NavBar({ page, setPage, lang, setLang, user, setUser, setLoginMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems=[{id:"home"},{id:"schemes"},{id:"checker"},{id:"benefits"},{id:"newSchemes"},{id:"uploadDocs"}];
  return (
    <nav style={{background:"linear-gradient(135deg,#283618,#606c38)",boxShadow:"0 4px 20px rgba(40,54,24,.45)",position:"sticky",top:0,zIndex:100}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>setPage("home")}>
          <div style={{fontSize:16,background:"rgba(254,250,224,.2)",borderRadius:"50%",width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,letterSpacing:1,animation:"softFloat 3s ease-in-out infinite",color:"#fefae0",border:"1px solid rgba(254,250,224,.5)"}}>YG</div>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:"#fff"}}>YojanaGuru</div>
            <div style={{fontSize:11,color:"rgba(254,250,224,.82)"}}>Yojanas made simple.</div>
          </div>
        </div>
        <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
          {navItems.map(item=>(
            <button key={item.id} style={{background:page===item.id?"rgba(254,250,224,.22)":"transparent",border:"none",color:page===item.id?"#fefae0":"rgba(254,250,224,.82)",padding:"6px 11px",borderRadius:18,fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:4,transition:"all .2s"}} onClick={()=>setPage(item.id)}>
              <span>{t(lang,item.id)}</span>
            </button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <select style={{background:"rgba(254,250,224,.12)",border:"1px solid rgba(254,250,224,.4)",color:"#fefae0",padding:"5px 10px",borderRadius:20,fontSize:12,outline:"none"}} value={lang} onChange={e=>setLang(e.target.value)}>
            {LANG_OPTIONS.map(l=><option key={l.code} value={l.code} style={{color:"#000"}}>{l.label}</option>)}
          </select>
          {user
            ? <button style={{background:"rgba(254,250,224,.18)",border:"1px solid rgba(254,250,224,.4)",color:"#fefae0",padding:"6px 13px",borderRadius:20,fontSize:12}} onClick={()=>setUser(null)}>{t(lang,"logout")}</button>
            : <button
                style={{background:"rgba(254,250,224,.18)",border:"1px solid rgba(254,250,224,.4)",color:"#fefae0",padding:"6px 13px",borderRadius:20,fontSize:12}}
                onClick={()=>{
                  setLoginMode(null);
                  setPage("login");
                }}
              >
                {t(lang,"login")}
              </button>
          }
        </div>
      </div>
    </nav>
  );
}

/* ============================================================
   SCHEME CARD
   ============================================================ */
function SchemeCard({ scheme, lang, onClick, eligResult }) {
  return (
    <div className="scheme-card" style={{background:"#fff",borderRadius:16,padding:20,cursor:"pointer",transition:"all .25s ease",position:"relative",overflow:"hidden",borderTop:`4px solid ${scheme.color}`,boxShadow:"0 4px 16px rgba(0,0,0,.07)"}} onClick={()=>onClick(scheme)}>
      {scheme.isNew&&<div style={{position:"absolute",top:10,right:10,background:"#1aa1a5",color:"#fff",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20}}>
        {lang==="ta"?"புதிய திட்டம்":lang==="hi"?"नई योजना":lang==="te"?"క్రొత్త పథకం":"New scheme"}
      </div>}
      {scheme.isCentral&&<div style={{position:"absolute",top:scheme.isNew?30:10,right:10,background:"#005f99",color:"#fff",fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:20}}>
        {lang==="ta"?"மத்திய அரசு":lang==="hi"?"केंद्र सरकार":lang==="te"?"కేంద్ర ప్రభుత్వం":"Central govt"}
      </div>}
      {eligResult&&(
        <div style={{position:"absolute",top:10,left:10,fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:20,background:eligResult.eligible?"#e8f8e8":"#ffeaea",color:eligResult.eligible?"#7a3f44":"#c03030"}}>
          {eligResult.eligible ? t(lang,"eligible") : t(lang,"notEligible")}
        </div>
      )}
      <div style={{width:92,height:54,borderRadius:"18px",background:`${scheme.color}22`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12,marginTop:eligResult?20:0}}>
        <span style={{fontSize:11,fontWeight:600,color:scheme.color,textTransform:"uppercase"}}>{scheme.category}</span>
      </div>
      <h3
        style={{
          fontSize:14,
          fontWeight:700,
          color:"#2d1a0e",
          marginBottom:6,
          lineHeight:1.3,
          background:"#fdf5e8",
          borderRadius:8,
          padding:"6px 8px",
          display:"inline-block",
          maxWidth:"100%",
          wordWrap:"break-word"
        }}
      >
        {getSchemeName(scheme,lang)}
      </h3>
      <p style={{fontSize:12,color:"#7a5c3a",marginBottom:10,lineHeight:1.4}}>{lang==="en"?scheme.tagline:getBenefitSimple(scheme,lang)}</p>
      <div style={{background:"#fdf5e8",borderRadius:8,padding:"7px 10px",borderLeft:`3px solid ${scheme.color}`,marginBottom:10}}>
        <span style={{fontSize:12,color:"#bc6c25",fontWeight:500}}>{lang==="en"?scheme.benefit:getBenefitSimple(scheme,lang)}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
        <span
          style={{
            fontSize:11,
            fontWeight:600,
            padding:"4px 10px",
            borderRadius:20,
            background:`${scheme.color}20`,
            color:scheme.color,
            maxWidth:"70%",
            display:"inline-block",
            whiteSpace:"normal",
            wordWrap:"break-word"
          }}
        >
          {CATEGORIES.find(c=>c.id===scheme.category)?.emoji} {scheme.category}
        </span>
        <span style={{fontSize:11,color:"#c4885a",fontWeight:600,flexShrink:0}}>{t(lang,"tapToLearn")} →</span>
      </div>
    </div>
  );
}

/* ============================================================
   SCHEME DETAIL MODAL  (with read aloud)
   ============================================================ */
function SchemeModal({ scheme, lang, onClose, uploadedIds }) {
  if(!scheme) return null;
  const elig = checkEligibility(scheme, {}, uploadedIds||[]);
  const benefitText = getBenefitSimple(scheme, lang);
  const eligText = getEligibilityPlain(scheme, lang);
  const readText = `${getSchemeName(scheme,lang)}. ${benefitText} ${eligText} ${t(lang,"docsNeeded")}: ${scheme.documents.join(", ")}. ${t(lang,"applyAt")}: ${scheme.apply_at}`;

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16,animation:"fadeIn .2s ease"}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:20,width:"100%",maxWidth:560,maxHeight:"92vh",overflowY:"auto",animation:"fadeUp .3s ease"}} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{padding:"22px 20px 18px",background:`linear-gradient(135deg,${scheme.color},${scheme.color}cc)`,display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:18,background:"rgba(255,255,255,.2)",borderRadius:"18px",width:62,height:62,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:600,textTransform:"uppercase"}}>
              {scheme.category}
            </div>
            <div>
              <h2 style={{fontSize:17,fontWeight:700,color:"#fff",lineHeight:1.3}}>{getSchemeName(scheme,lang)}</h2>
              <p style={{fontSize:12,color:"rgba(255,255,255,.8)",marginTop:3}}>{lang==="en"?scheme.tagline:benefitText}</p>
              <div style={{marginTop:8}}><ReadAloudBtn text={readText} lang={lang} color="rgba(255,255,255,.9)"/></div>
            </div>
          </div>
          <button style={{background:"rgba(255,255,255,.25)",border:"none",color:"#fff",width:32,height:32,borderRadius:"50%",fontSize:14,flexShrink:0}} onClick={onClose}>✕</button>
        </div>

        <div style={{padding:20}}>
          {/* Eligibility status */}
          {uploadedIds&&uploadedIds.length>0&&(
            <div style={{background:elig.eligible?"#fefae0":"#fefae0",border:`2px solid ${elig.eligible?"#606c38":"#bc6c25"}`,borderRadius:12,padding:"12px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:24}}>{elig.eligible?"":""}</span>
              <div>
                <div style={{fontWeight:700,color:elig.eligible?"#2a6a2a":"#a03030",fontSize:14}}>{elig.eligible?t(lang,"eligible"):t(lang,"notEligible")}</div>
                {!elig.eligible&&elig.reasons.length>0&&<div style={{fontSize:12,color:"#7a3030",marginTop:2}}>{elig.reasons.join(" • ")}</div>}
              </div>
            </div>
          )}

          {/* What you get */}
          <div style={{marginBottom:18}}>
            <div style={{fontSize:12,fontWeight:700,color:"#bc6c25",textTransform:"uppercase",letterSpacing:.5,marginBottom:7}}>{t(lang,"whatYouGet")}</div>
            <div style={{background:"#fdf5e8",borderRadius:10,padding:"12px 14px",borderLeft:`4px solid ${scheme.color}`}}>
              <p style={{fontSize:15,fontWeight:600,color:"#3d2c1e",lineHeight:1.4}}>{scheme.benefit}</p>
            </div>
          </div>

          {/* Simple words */}
          <div style={{marginBottom:18}}>
            <div style={{fontSize:12,fontWeight:700,color:"#bc6c25",textTransform:"uppercase",letterSpacing:.5,marginBottom:7}}>{t(lang,"simpleWords")}</div>
            <p style={{fontSize:14,color:"#4a3020",lineHeight:1.7,background:"#fafaf5",borderRadius:10,padding:"12px 14px"}}>{benefitText}</p>
          </div>

          {/* Who can apply */}
          <div style={{marginBottom:18}}>
            <div style={{fontSize:12,fontWeight:700,color:"#bc6c25",textTransform:"uppercase",letterSpacing:.5,marginBottom:7}}>{t(lang,"whoCanApply")}</div>
            <p style={{fontSize:14,color:"#4a3020",lineHeight:1.6}}>{getEligibilityPlain(scheme,lang)}</p>
          </div>

          {/* Documents */}
          <div style={{marginBottom:18}}>
            <div style={{fontSize:12,fontWeight:700,color:"#bc6c25",textTransform:"uppercase",letterSpacing:.5,marginBottom:7}}>{t(lang,"docsNeeded")}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {scheme.documents.map((d,i)=>{
                const docDef = DOC_TYPES.find(dt=>scheme.requiredDocs[i]===dt.id);
                const uploaded = uploadedIds&&uploadedIds.includes(scheme.requiredDocs[i]);
                return (
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,background:uploaded?"#e8f8e8":"#faf5ee",borderRadius:8,padding:"8px 10px",border:uploaded?"1px solid #b0e0b0":"1px solid transparent"}}>
                    <span style={{fontSize:16}}>{uploaded?"":""}</span>
                    <span style={{fontSize:12,color:"#3d2c1e",fontWeight:500}}>{d}</span>
                  </div>
                );
              })}
            </div>
            {uploadedIds&&elig.missingDocs.length>0&&(
              <div style={{marginTop:10,background:"#fff5e8",borderRadius:8,padding:"10px 12px",border:"1px solid #f0c880"}}>
                <div style={{fontSize:12,fontWeight:600,color:"#8a4a10",marginBottom:4}}>{t(lang,"missingDocs")}:</div>
                {elig.missingDocs.map(d=>{
                  const doc=DOC_TYPES.find(dt=>dt.id===d);
                  return <div key={d} style={{fontSize:12,color:"#7a4020"}}>• {doc?DOC_LABEL(doc,lang):d}</div>;
                })}
              </div>
            )}
          </div>

          {/* Apply at */}
          <div style={{marginBottom:18}}>
            <div style={{fontSize:12,fontWeight:700,color:"#bc6c25",textTransform:"uppercase",letterSpacing:.5,marginBottom:7}}>{t(lang,"applyNow")}</div>
            <div style={{background:"#edf4ff",borderRadius:10,padding:"12px 14px",border:"1px solid #c0d8f0"}}>
              <span style={{fontSize:14,color:"#1a4a8a",fontWeight:500}}>{scheme.apply_at}</span>
            </div>
          </div>

          {/* Help centres */}
          <div>
            <div style={{fontSize:12,fontWeight:700,color:"#bc6c25",textTransform:"uppercase",letterSpacing:.5,marginBottom:7}}>{t(lang,"helpCenters")}</div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {scheme.helpCenters.map((c,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,fontSize:13,color:"#4a3020",background:"#f8f5f0",borderRadius:8,padding:"8px 12px"}}>
                  <span style={{color:"#c4885a",fontSize:10}}>●</span>{c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DOCUMENT UPLOAD PAGE
   ============================================================ */
function UploadDocsPage({ lang, uploadedDocs, markUploaded, markRemoved }) {
  const [activeDoc, setActiveDoc] = useState(null);
  const [uploading, setUploading] = useState(null);
  const fileRefs = useRef({});

  const handleFileSelect = (docId, file) => {
    if(!file) return;
    setUploading(docId);
    setTimeout(()=>{
      markUploaded(docId);
      setUploading(null);
    }, 900);
  };

  const uploadedCount = Object.keys(uploadedDocs).length;
  const totalRequired = DOC_TYPES.filter(d=>d.required).length;

  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"30px 20px"}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#283618,#606c38)",borderRadius:20,padding:"28px 24px",marginBottom:28,color:"#fefae0",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:10}}></div>
        <h1 style={{fontSize:24,fontWeight:800,fontFamily:"'Baloo 2',sans-serif",marginBottom:8}}>{t(lang,"uploadDocs")}</h1>
        <p style={{fontSize:14,opacity:.85,lineHeight:1.6,maxWidth:500,margin:"0 auto 16px"}}>{t(lang,"uploadHint")}</p>
        <div style={{display:"inline-flex",gap:16,background:"rgba(255,255,255,.15)",borderRadius:30,padding:"8px 20px"}}>
          <span style={{fontSize:14,fontWeight:700}}>{uploadedCount} / {DOC_TYPES.length} uploaded</span>
          <span style={{fontSize:14,opacity:.7}}>•</span>
          <span style={{fontSize:14}}>{uploadedCount>=totalRequired?"Ready to check":"Upload more"}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{background:"#f0e8dc",borderRadius:10,height:10,marginBottom:28,overflow:"hidden"}}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#bc6c25,#dda15e)",borderRadius:10,width:`${(uploadedCount/DOC_TYPES.length)*100}%`,transition:"width .4s ease"}}/>
      </div>

      {/* Document grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16}}>
        {DOC_TYPES.map(doc=>{
          const uploaded = !!uploadedDocs[doc.id];
          const isUploading = uploading===doc.id;
          return (
            <div key={doc.id} style={{background:"#fff",borderRadius:18,padding:22,border:`2px solid ${uploaded?"#606c38":activeDoc===doc.id?"#bc6c25":"#fefae0"}`,transition:"all .2s",cursor:"pointer",position:"relative"}}
              onClick={()=>setActiveDoc(activeDoc===doc.id?null:doc.id)}>
              {uploaded&&<div style={{position:"absolute",top:10,right:10,background:"#606c38",color:"#fff",borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>✓</div>}
              <div style={{fontSize:34,marginBottom:12}}>{doc.emoji}</div>
              <div style={{fontSize:15,fontWeight:700,color:"#2d1a0e",marginBottom:6}}>{DOC_LABEL(doc,lang)}</div>
              <div style={{fontSize:12,color:"#7a5c3a",marginBottom:14,lineHeight:1.5}}>{doc.hint}</div>
              {doc.required&&<div style={{fontSize:10,color:"#bc6c25",fontWeight:600,marginBottom:8}}>Required</div>}

              {isUploading ? (
                <div style={{background:"#f0f0f0",borderRadius:10,padding:"10px",textAlign:"center",fontSize:12,color:"#7a5c3a"}}>
                  <span style={{display:"inline-block",animation:"spin 1s linear infinite"}}>⏳</span> Uploading...
                </div>
              ) : uploaded ? (
                <div style={{display:"flex",gap:8}}>
                  <div style={{flex:1,background:"#e8f8e8",borderRadius:10,padding:"8px",textAlign:"center",fontSize:12,color:"#7a3f44",fontWeight:600}}>Uploaded</div>
                  <button style={{background:"#fff0f0",border:"1px solid #f0c0c0",borderRadius:10,padding:"8px 10px",fontSize:11,color:"#c03030"}} onClick={e=>{e.stopPropagation();markRemoved(doc.id);}}>✕</button>
                </div>
              ) : (
                <div>
                  <input ref={el=>fileRefs.current[doc.id]=el} type="file" accept="image/*,.pdf" style={{display:"none"}} onChange={e=>handleFileSelect(doc.id,e.target.files[0])}/>
                  <button style={{width:"100%",background:"#fefae0",border:"2px dashed #dda15e",borderRadius:10,padding:"9px",fontSize:13,fontWeight:600,color:"#283618"}}
                    onClick={e=>{e.stopPropagation();fileRefs.current[doc.id]?.click();}}>
                    {lang==="ta"?"பதிவேற்று":lang==="hi"?"अपलोड करें":lang==="te"?"అప్‌లోడ్":"Upload"}
                  </button>
                  <button style={{width:"100%",marginTop:6,background:"#fff",border:"1px solid #e0d0c0",borderRadius:10,padding:"7px",fontSize:12,color:"#7a5c3a"}}
                    onClick={e=>{e.stopPropagation();markUploaded(doc.id);}}>
                    ✔ {lang==="ta"?"என்னிடம் இருக்கிறது":lang==="hi"?"मेरे पास है":lang==="te"?"నా దగ్గర ఉంది":"I have this"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {uploadedCount > 0 && (
      <div style={{marginTop:28,background:"linear-gradient(135deg,#fefae0,#dda15e)",borderRadius:16,padding:20,border:"2px solid #606c38",textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:8}}></div>
          <div style={{fontSize:16,fontWeight:700,color:"#2a6a2a",marginBottom:4}}>
            {lang==="ta"?"நல்லது! இப்போது தகுதி சோதிக்கலாம்":lang==="hi"?"बढ़िया! अब पात्रता जांचें":lang==="te"?"చాలా మంచిది! ఇప్పుడు అర్హత తనిఖీ చేయండి":"Great! Now check your eligibility"}
          </div>
          <p style={{fontSize:13,color:"#4a8a4a",marginBottom:14}}>{uploadedCount} documents uploaded. We will show you exactly which schemes you qualify for.</p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   VOICE SEARCH BAR
   ============================================================ */
function VoiceSearchBar({ value, onChange, lang, placeholder }) {
  const [listening, setListening] = useState(false);
  const startVoice = () => {
    const SR = window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){alert("Voice search not supported on this browser.");return;}
    const r=new SR();
    r.lang=LANG_OPTIONS.find(l=>l.code===lang)?.voice||"en-IN";
    r.interimResults=false;
    r.onstart=()=>setListening(true);
    r.onresult=e=>{onChange(e.results[0][0].transcript);setListening(false);};
    r.onerror=()=>setListening(false);
    r.onend=()=>setListening(false);
    r.start();
  };
  return (
    <div style={{display:"flex",alignItems:"center",background:"#fff",borderRadius:50,padding:"8px 14px",boxShadow:"0 4px 20px rgba(0,0,0,.09)",border:"2px solid #e8d0b0",gap:8}}>
      <span style={{fontSize:18,color:"#c4885a"}}></span>
      <input style={{flex:1,border:"none",outline:"none",fontSize:15,background:"transparent",color:"#2d1a0e"}} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>
      <button style={{width:36,height:36,borderRadius:"50%",border:listening?"2px solid #e05050":"2px solid #e8c898",background:listening?"#ffe0e0":"#fdf0e0",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",flexShrink:0}} onClick={startVoice} title="Voice Search">
        {listening?<span style={{animation:"pulse 1s infinite",display:"inline-block"}}></span>:""}
      </button>
      {value&&<button style={{background:"none",border:"none",fontSize:16,color:"#aaa",cursor:"pointer",flexShrink:0}} onClick={()=>onChange("")}>✕</button>}
    </div>
  );
}

/* ============================================================
   HOME PAGE
   ============================================================ */
function HomePage({ setPage, lang }) {
  const stats=[{num:"24+",label:"Schemes",emoji:""},{num:"3",label:"States covered",emoji:""},{num:"₹7L+",label:"Max benefit",emoji:""},{num:"Free",label:"No cost",emoji:""}];
  const quickLinks=[
    {id:"uploadDocs",emoji:"",title:t(lang,"uploadDocs"),desc:"Upload once, check all schemes",color:"#bc6c25"},
    {id:"checker",emoji:"",title:t(lang,"checker"),desc:"Find which schemes you qualify for",color:"#dda15e"},
    {id:"schemes",emoji:"",title:t(lang,"schemes"),desc:"Browse all available schemes",color:"#606c38"},
    {id:"benefits",emoji:"",title:t(lang,"benefits"),desc:"See your matched schemes",color:"#283618"},
  ];
  return (
    <div>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#283618 0%,#606c38 45%,#bc6c25 100%)",padding:"70px 20px 80px",position:"relative",overflow:"hidden",minHeight:"320px"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 20% 80%,rgba(255,200,120,.12) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(200,255,150,.08) 0%,transparent 50%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:700,margin:"0 auto",textAlign:"center",position:"relative"}}>
          <h1 style={{fontSize:"clamp(22px,4vw,38px)",fontWeight:800,color:"#fff",fontFamily:"'Baloo 2',sans-serif",lineHeight:1.25,marginBottom:14}}>
            {lang==="ta"?"அரசு திட்டங்களை எளிதாக கண்டுபிடியுங்கள்":lang==="hi"?"सरकारी योजनाएं आसानी से खोजें":lang==="te"?"ప్రభుత్వ పథకాలను సులభంగా కనుగొనండి":"Find Government Schemes Made For You"}
          </h1>
          <p style={{fontSize:15,color:"rgba(255,255,255,.8)",lineHeight:1.6,marginBottom:28,maxWidth:520,margin:"0 auto 28px"}}>
            {lang==="ta"?"உங்கள் ஆவணங்களை பதிவேற்றி தகுதியான திட்டங்களை கண்டுபிடியுங்கள்":lang==="hi"?"अपने दस्तावेज़ अपलोड करें और पात्र योजनाएं खोजें":lang==="te"?"మీ పత్రాలు అప్‌లోడ్ చేసి అర్హమైన పథకాలు కనుగొనండి":"Upload your documents once and instantly discover all schemes you qualify for!"}
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button style={{background:"#fefae0",color:"#283618",border:"none",padding:"13px 28px",borderRadius:50,fontSize:15,fontWeight:600,boxShadow:"0 4px 18px rgba(40,54,24,.35)"}} onClick={()=>setPage("uploadDocs")}>
              {t(lang,"uploadDocs")}
            </button>
            <button style={{background:"transparent",color:"#fff",border:"2px solid rgba(255,255,255,.65)",padding:"13px 28px",borderRadius:50,fontSize:15,fontWeight:500}} onClick={()=>setPage("checker")}>
              {t(lang,"checker")}
            </button>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",background:"#fff",boxShadow:"0 4px 20px rgba(0,0,0,.08)"}}>
        {stats.map((s,i)=>(
          <div key={i} style={{padding:"18px 14px",textAlign:"center",borderRight:"1px solid #e3f1f4"}}>
            <div style={{fontSize:20,fontWeight:700,color:"#dda15e"}}>{s.num}</div>
            <div style={{fontSize:11,color:"#3b6b73",fontWeight:500,marginTop:4}}>{s.label}</div>
          </div>
        ))}
      </div>
      {/* Quick links */}
      <div style={{maxWidth:1100,margin:"0 auto",padding:"36px 20px"}}>
        <h2 style={{fontSize:22,fontWeight:700,color:"#063940",marginBottom:20,textAlign:"center"}}>
          {lang==="ta"?"என்ன வேண்டும்?":lang==="hi"?"क्या करना है?":lang==="te"?"ఏమి చేయాలి?":"What do you want to do?"}
        </h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
          {quickLinks.map(q=>(
            <button key={q.id} className="ql-card" style={{background:"#fff",borderRadius:16,padding:22,textAlign:"left",border:"1px solid #e3f1f4",cursor:"pointer",transition:"all .25s",boxShadow:"0 2px 12px rgba(0,0,0,.06)",borderTop:`4px solid ${q.color}`}} onClick={()=>setPage(q.id)}>
              <div style={{width:92,height:52,background:`${q.color}18`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12,fontSize:11,fontWeight:600,color:q.color,textTransform:"uppercase"}}>{q.id}</div>
              <div style={{fontSize:15,fontWeight:600,color:"#063940",marginBottom:5}}>{q.title}</div>
              <div style={{fontSize:13,color:"#3b6b73"}}>{q.desc}</div>
            </button>
          ))}
        </div>
      </div>
      {/* Voice tip */}
      <div style={{background:"linear-gradient(135deg,#fefae0,#dda15e)",margin:"0 20px 40px",borderRadius:16,padding:"18px 22px",display:"flex",alignItems:"center",gap:16,border:"1px solid #dda15e",maxWidth:1060,marginLeft:"auto",marginRight:"auto"}}>
        <div style={{width:40,height:40,borderRadius:"50%",border:"2px solid #bc6c25",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:"#bc6c25",animation:"pulse 2.4s ease-in-out infinite"}}>
          🎤
        </div>
        <div>
          <div style={{fontSize:15,fontWeight:600,color:"#063940",marginBottom:3}}>
            {lang==="ta"?"தமிழில் பேசலாம்!":lang==="hi"?"हिंदी में बोलें!":lang==="te"?"తెలుగులో మాట్లాడండి!":"Can't type? Just speak!"}
          </div>
          <div style={{fontSize:13,color:"#7a5c3a"}}>
            {lang==="ta"?"மைக் பொத்தானை அழுத்தி உங்கள் மொழியில் பேசுங்கள் — தேடல் பெட்டியில் எங்கும்":lang==="hi"?"माइक बटन दबाएं और बोलें — किसी भी सर्च बॉक्स में":lang==="te"?"మైక్ బటన్ నొక్కండి మరియు మీ భాషలో మాట్లాడండి":"Press the mic button anywhere and speak in your own language"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ALL SCHEMES PAGE
   ============================================================ */
function SchemesPage({ lang, setSelectedScheme, uploadedIds, profile, detectedState }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");

  const filtered = SCHEMES.filter(s=>{
    const name = getSchemeName(s,lang).toLowerCase();
    const matchSearch = name.includes(search.toLowerCase())||s.tagline.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat==="all"||s.category===cat;
    const matchState = stateFilter==="all"||(stateFilter==="central"&&s.isCentral)||(stateFilter==="tn"&&s.state==="Tamil Nadu")||(stateFilter==="ap"&&s.state==="Andhra Pradesh")||(stateFilter==="ts"&&s.state==="Telangana");
    const geoMatch = !detectedState || s.state === detectedState || s.isCentral;
    return matchSearch&&matchCat&&matchState&&geoMatch;
  });

  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 20px"}}>
          {detectedState && (
      <div style={{
        background:"#e8f8e8",
        padding:"10px 16px",
        borderRadius:"10px",
        marginBottom:"20px",
        fontSize:"13px",
        fontWeight:"600",
        color:"#2a6a2a"
      }}>
        Detected Location: {detectedState} — Showing relevant schemes
      </div>
    )}
      <div style={{textAlign:"center",marginBottom:26}}>
        <h1 style={{fontSize:26,fontWeight:800,color:"#2d1a0e",fontFamily:"'Baloo 2',sans-serif",marginBottom:6}}>{t(lang,"schemes")}</h1>
        <div style={{maxWidth:540,margin:"0 auto 14px"}}>
          <VoiceSearchBar value={search} onChange={setSearch} lang={lang} placeholder={lang==="ta"?"திட்டங்களை தேடுங்கள்...":lang==="hi"?"योजना खोजें...":lang==="te"?"పథకాలు వెతకండి...":"Search schemes..."}/>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:10}}>
          <select
            value={stateFilter}
            onChange={e=>setStateFilter(e.target.value)}
            style={{padding:"7px 14px",borderRadius:24,border:"2px solid #dda15e",fontSize:12,fontWeight:600,background:"#fff",color:"#283618",minWidth:160}}
          >
            <option value="all">All Regions</option>
            <option value="central">Central</option>
            <option value="tn">Tamil Nadu</option>
            <option value="ap">Andhra Pradesh</option>
            <option value="ts">Telangana</option>
          </select>
          <select
            value={cat}
            onChange={e=>setCat(e.target.value)}
            style={{padding:"7px 14px",borderRadius:24,border:"2px solid #dda15e",fontSize:12,fontWeight:600,background:"#fff",color:"#283618",minWidth:160}}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(c=>(
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:16}}>
        {filtered.length===0
          ? <div style={{gridColumn:"1/-1",textAlign:"center",padding:"60px 20px",fontSize:18,color:"#aaa"}}>{t(lang,"noResults")}</div>
          : filtered.map(s=>{
              const elig = uploadedIds&&uploadedIds.length>0 ? checkEligibility(s,profile||{},uploadedIds) : null;
              return <SchemeCard key={s.id} scheme={s} lang={lang} onClick={setSelectedScheme} eligResult={elig}/>;
            })
        }
      </div>
    </div>
  );
}

/* ============================================================
   ELIGIBILITY CHECKER PAGE  (document-aware)
   ============================================================ */
function CheckerPage({ lang, setPage, onResults, uploadedIds }) {
  const questions = [
    {id:"gender",q:{en:"Are you male or female?",ta:"நீங்கள் ஆண் அல்லது பெண்?",hi:"आप पुरुष हैं या महिला?",te:"మీరు పురుషుడా లేదా స్త్రీవా?"},
     opts:[{v:"female",l:{en:"Female",ta:"பெண்",hi:"महिला",te:"స్త్రీ"}},{v:"male",l:{en:"Male",ta:"ஆண்",hi:"पुरुष",te:"పురుషుడు"}}]},
    {id:"state",q:{en:"Which state do you live in?",ta:"நீங்கள் எந்த மாநிலத்தில் வசிக்கிறீர்கள்?",hi:"आप किस राज्य में रहते हैं?",te:"మీరు ఏ రాష్ట్రంలో నివసిస్తున్నారు?"},
     opts:[{v:"tamil_nadu",l:{en:"Tamil Nadu",ta:"தமிழ்நாடு",hi:"तमिलनाडु",te:"తమిళనాడు"}},{v:"andhra_pradesh",l:{en:"Andhra Pradesh",ta:"ஆந்திரா",hi:"आंध्र प्रदेश",te:"ఆంధ్ర ప్రదేశ్"}},{v:"telangana",l:{en:"Telangana",ta:"తెలங்கானా",hi:"तेलंगाना",te:"తెలంగాణ"}},{v:"other",l:{en:"Other State",ta:"வேறு மாநிலம்",hi:"अन्य राज्य",te:"ఇతర రాష్ట్రం"}}]},
    {id:"age",q:{en:"How old are you?",ta:"உங்கள் வயது என்ன?",hi:"आपकी उम्र क्या है?",te:"మీ వయస్సు ఎంత?"},
     opts:[{v:17,l:{en:"Below 18",ta:"18 வயதுக்கு கீழ்",hi:"18 से कम",te:"18 కంటే తక్కువ"}},{v:25,l:{en:"18 to 35",ta:"18 முதல் 35",hi:"18 से 35",te:"18 నుండి 35"}},{v:45,l:{en:"36 to 59",ta:"36 முதல் 59",hi:"36 से 59",te:"36 నుండి 59"}},{v:65,l:{en:"60 or above",ta:"60 அல்லது மேல்",hi:"60 या अधिक",te:"60 లేదా అంతకంటే ఎక్కువ"}}]},
    {id:"occupation",q:{en:"What do you do for work?",ta:"நீங்கள் என்ன வேலை செய்கிறீர்கள்?",hi:"आप क्या काम करते हैं?",te:"మీరు ఏ పని చేస్తారు?"},
     opts:[{v:"farmer",l:{en:"Farmer",ta:"விவசாயி",hi:"किसान",te:"రైతு"}},{v:"agricultural_labourer",l:{en:"Farm Worker",ta:"விவசாய கூலி",hi:"खेत मजदूर",te:"వ్యవసాయ కూలీ"}},{v:"artisan",l:{en:"Craftsperson",ta:"கைவினைஞர்",hi:"कारीगर",te:"చేతివృత్తుల వాడు"}},{v:"other",l:{en:"Homemaker/Other",ta:"இல்லத்தரசி/பிற",hi:"गृहिणी/अन्य",te:"గృహిణి/ఇతర"}}]},
    {id:"income",q:{en:"What is your family's yearly income?",ta:"உங்கள் குடும்பத்தின் ஆண்டு வருமானம்?",hi:"परिवार की सालाना आमदनी कितनी है?",te:"మీ కుటుంబ వార్షిక ఆదాయం ఎంత?"},
     opts:[{v:80000,l:{en:"Below ₹1 Lakh",ta:"₹1 லட்சத்துக்கு கீழ்",hi:"₹1 लाख से कम",te:"₹1 లక్ష కంటే తక్కువ"}},{v:150000,l:{en:"₹1 to ₹2 Lakh",ta:"₹1-₹2 லட்சம்",hi:"₹1-₹2 लाख",te:"₹1-₹2 లక్షలు"}},{v:350000,l:{en:"₹2 to ₹5 Lakh",ta:"₹2-₹5 லட்சம்",hi:"₹2-₹5 लाख",te:"₹2-₹5 లక్షలు"}},{v:600000,l:{en:"Above ₹5 Lakh",ta:"₹5 லட்சத்துக்கு மேல்",hi:"₹5 लाख से अधिक",te:"₹5 లక్షల పైన"}}]},
    {id:"caste",q:{en:"What is your community category?",ta:"உங்கள் சாதி வகை என்ன?",hi:"आपकी जाति श्रेणी क्या है?",te:"మీ కులం వర్గం ఏది?"},
     opts:[{v:"sc",l:{en:"SC",ta:"SC (தாழ்த்தப்பட்ட)",hi:"SC (अनुसूचित जाति)",te:"SC (షెడ్యూల్డ్ కులాలు)"}},{v:"st",l:{en:"ST",ta:"ST (பழங்குடி)",hi:"ST (अनुसूचित जनजाति)",te:"ST (తెగలు)"}},{v:"bc",l:{en:"BC/OBC",ta:"OBC/BC",hi:"BC/OBC",te:"BC/OBC"}},{v:"general",l:{en:"General",ta:"பொது",hi:"सामान्य",te:"సాధారణ"}}]},
    {id:"situation",q:{en:"Any special situation?",ta:"சிறப்பு நிலை ஏதேனும்?",hi:"कोई विशेष स्थिति?",te:"ఏదైనా ప్రత్యేక పరిస్థితి?"},
     opts:[{v:"pregnant",l:{en:"Pregnant/New Mother",ta:"கர்ப்பிணி/புதிய தாய்",hi:"गर्भवती/नई माँ",te:"గర్భవతి/కొత్త తల్లి"}},{v:"disabled",l:{en:"Disability",ta:"மாற்றுத்திறன்",hi:"विकलांगता",te:"వికలాంగత"}},{v:"studying",l:{en:"Student",ta:"மாணவர்",hi:"विद्यार्थी",te:"విద్యార్థి"}},{v:"none",l:{en:"None",ta:"எதுவும் இல்லை",hi:"कोई नहीं",te:"ఏదీ లేదు"}}]},
    {id:"residence",q:{en:"Where do you live?",ta:"நீங்கள் எங்கே வசிக்கிறீர்கள்?",hi:"आप कहाँ रहते हैं?",te:"మీరు ఎక్కడ నివసిస్తున్నారు?"},
     opts:[{v:"rural",l:{en:"Village/Rural",ta:"கிராமம்",hi:"गाँव/ग्रामीण",te:"గ్రామం/గ్రామీణ"}},{v:"urban",l:{en:"Town/City",ta:"நகர்",hi:"शहर",te:"పట్టణం/నగరం"}}]},
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const answer = (qId, val) => {
    const newAns = {...answers,[qId]:val};
    setAnswers(newAns);
    if(step<questions.length-1) setStep(s=>s+1);
    else computeResults(newAns);
  };

  const computeResults = (ans) => {
    const profile = {
      gender:ans.gender, state:ans.state, age:ans.age, occupation:ans.occupation,
      income:ans.income, caste:ans.caste,
      studying:ans.situation==="studying", disabled:ans.situation==="disabled",
      pregnant:ans.situation==="pregnant", residence:ans.residence,
      has_pucca_house:false, has_lpg:false,
    };
    const matched = SCHEMES.filter(s=>{
      const r = checkEligibility(s, profile, uploadedIds||[]);
      return r.eligible;
    });
    setResults({matched, profile});
    onResults(matched, profile);
  };

  const reset=()=>{setStep(0);setAnswers({});setResults(null);};
  const q=questions[step];
  const progress=(step/questions.length)*100;

  if(results){
    const {matched} = results;
    return (
      <div style={{maxWidth:800,margin:"0 auto",padding:"28px 20px"}}>
      <div style={{background:"linear-gradient(135deg,#283618,#606c38)",borderRadius:20,padding:"28px 22px",textAlign:"center",color:"#fefae0",marginBottom:22}}>
          <div style={{fontSize:48,marginBottom:8,animation:"bounce 1s ease"}}></div>
          <h2 style={{fontSize:22,fontWeight:800,fontFamily:"'Baloo 2',sans-serif",marginBottom:8}}>
            {lang==="ta"?`${matched.length} திட்டங்கள் கண்டுபிடிக்கப்பட்டன!`:lang==="hi"?`${matched.length} योजनाएं मिलीं!`:lang==="te"?`${matched.length} పథకాలు కనుగొనబడ్డాయి!`:`${matched.length} Schemes Found For You!`}
          </h2>
          {matched.length>1&&<div style={{background:"rgba(255,255,255,.2)",borderRadius:10,padding:"8px 16px",fontSize:13,fontWeight:600,display:"inline-block",marginBottom:8}}>{t(lang,"multiScheme")}</div>}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:20}}>
          {matched.map(s=>{
            const elig = checkEligibility(s, results.profile, uploadedIds||[]);
            return (
              <div key={s.id} style={{background:"#fff",borderRadius:16,padding:18,boxShadow:"0 4px 16px rgba(0,0,0,.07)",borderLeft:`5px solid ${s.color}`}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10}}>
                  <span style={{fontSize:30}}>{s.emoji}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:15,fontWeight:700,color:"#2d1a0e",marginBottom:3}}>{getSchemeName(s,lang)}</div>
                    <div style={{fontSize:13,color:s.color,fontWeight:600,marginBottom:6}}>{s.benefit}</div>
                    <ReadAloudBtn text={`${getSchemeName(s,lang)}. ${getBenefitSimple(s,lang)}`} lang={lang} color={s.color}/>
                  </div>
                </div>
                <p style={{fontSize:13,color:"#4a3020",lineHeight:1.6,marginBottom:10}}>{getBenefitSimple(s,lang)}</p>
                {uploadedIds&&uploadedIds.length>0&&(
                  <div style={{background:elig.hasAllDocs?"#e8f8e8":"#fff8e8",borderRadius:8,padding:"8px 12px",border:`1px solid ${elig.hasAllDocs?"#d9b0b0":"#f0c0b0"}`}}>
                    {elig.hasAllDocs
                      ? <span style={{fontSize:12,color:"#7a3f44",fontWeight:600}}>All documents ready — you can apply now!</span>
                      : <span style={{fontSize:12,color:"#8a5010",fontWeight:500}}>Missing: {elig.missingDocs.map(d=>DOC_TYPES.find(dt=>dt.id===d)?.label||d).join(", ")}</span>
                    }
                  </div>
                )}
                <div style={{marginTop:10,fontSize:12,color:"#5a7090"}}>{s.apply_at}</div>
              </div>
            );
          })}
          {matched.length===0&&<div style={{textAlign:"center",padding:40,color:"#7a5c3a",fontSize:14}}>No exact matches. Please visit your nearest Gram Panchayat for guidance.</div>}
        </div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <button style={{flex:1,padding:"13px",background:"#fff",border:"2px solid #bc6c25",color:"#bc6c25",borderRadius:12,fontSize:14,fontWeight:600}} onClick={reset}>{lang==="ta"?"மீண்டும்":lang==="hi"?"फिर से":lang==="te"?"మళ్ళీ":"Check Again"}</button>
          <button style={{flex:1,padding:"13px",background:"linear-gradient(135deg,#bc6c25,#dda15e)",color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:600}} onClick={()=>setPage("benefits")}>{t(lang,"benefits")}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{maxWidth:600,margin:"0 auto",padding:"28px 20px"}}>
      {uploadedIds&&uploadedIds.length>0&&(
        <div style={{background:"#e8f8e8",border:"2px solid #b0e0b0",borderRadius:12,padding:"10px 16px",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:20}}></span>
          <span style={{fontSize:13,color:"#2a6a2a",fontWeight:500}}>{uploadedIds.length} documents uploaded — eligibility will be auto-checked!</span>
        </div>
      )}
      <div style={{background:"#fff",borderRadius:24,padding:"28px 24px",boxShadow:"0 8px 40px rgba(0,0,0,.1)"}}>
        <div style={{marginBottom:24}}>
          <div style={{height:8,background:"#f0e8dc",borderRadius:10,overflow:"hidden",marginBottom:6}}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#bc6c25,#dda15e)",borderRadius:10,width:`${progress}%`,transition:"width .4s ease"}}/>
          </div>
          <span style={{fontSize:12,color:"#7a5c3a",fontWeight:500}}>{lang==="ta"?`கேள்வி ${step+1}/${questions.length}`:lang==="hi"?`प्रश्न ${step+1}/${questions.length}`:lang==="te"?`ప్రశ్న ${step+1}/${questions.length}`:`Question ${step+1} of ${questions.length}`}</span>
        </div>
        <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:24}}>
          <span style={{fontSize:40,animation:"bounce 1.5s ease infinite",display:"inline-block",flexShrink:0}}></span>
          <div style={{background:"linear-gradient(135deg,#fdf5e8,#f8ece0)",borderRadius:"0 16px 16px 16px",padding:"14px 16px",fontSize:17,fontWeight:600,color:"#2d1a0e",lineHeight:1.4,flex:1,border:"1px solid rgba(200,160,100,.2)"}}>
            {q.q[lang]||q.q.en}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {q.opts.map((opt,i)=>(
            <button key={opt.v} className="opt-btn" style={{background:"#fff",border:"2px solid #e8d0b0",borderRadius:12,padding:"13px 16px",fontSize:15,fontWeight:500,color:"#2d1a0e",textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all .2s",animationDelay:`${i*0.06}s`}}
              onClick={()=>answer(q.id,opt.v)}>
              <span>{opt.l[lang]||opt.l.en}</span>
              <span style={{color:"#bc6c25",fontWeight:700}}>→</span>
            </button>
          ))}
        </div>
        {step>0&&<button style={{background:"none",border:"none",color:"#aaa",fontSize:13,marginTop:14,cursor:"pointer"}} onClick={()=>setStep(s=>s-1)}>← {lang==="ta"?"பின்னால்":lang==="hi"?"पीछे":lang==="te"?"వెనుకకు":"Back"}</button>}
      </div>
    </div>
  );
}

/* ============================================================
   BENEFITS PAGE
   ============================================================ */
function BenefitsPage({ lang, matchedSchemes, profile, setSelectedScheme, setPage, uploadedIds }) {
  if(!matchedSchemes||matchedSchemes.length===0){
    return (
      <div style={{textAlign:"center",padding:"80px 20px"}}>
        <span style={{fontSize:64}}></span>
        <h2 style={{fontSize:22,fontWeight:800,color:"#2d1a0e",fontFamily:"'Baloo 2',sans-serif",margin:"16px 0 10px"}}>{t(lang,"checker")}</h2>
        <p style={{fontSize:14,color:"#7a5c3a",marginBottom:24,lineHeight:1.6}}>Complete the eligibility checker to see your matched schemes here</p>
        <button style={{background:"linear-gradient(135deg,#bc6c25,#dda15e)",color:"#fff",border:"none",padding:"14px 32px",borderRadius:50,fontSize:15,fontWeight:700}} onClick={()=>setPage("checker")}>{t(lang,"checker")}</button>
      </div>
    );
  }
  const allDocs=[...new Set(matchedSchemes.flatMap(s=>s.documents))];
  const allCenters=[...new Set(matchedSchemes.flatMap(s=>s.helpCenters))];
  const readySchemesCount = matchedSchemes.filter(s=>checkEligibility(s,profile||{},uploadedIds||[]).hasAllDocs).length;

  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 20px"}}>
      <div style={{background:"linear-gradient(135deg,#283618,#606c38)",borderRadius:20,padding:"28px 22px",textAlign:"center",color:"#fefae0",marginBottom:26}}>
        <div style={{fontSize:48,marginBottom:8}}></div>
        <h1 style={{fontSize:26,fontWeight:800,fontFamily:"'Baloo 2',sans-serif",marginBottom:6}}>{t(lang,"benefits")}</h1>
        <p style={{fontSize:15,opacity:.85,marginBottom:10}}>{matchedSchemes.length} {lang==="ta"?"திட்டங்கள் தகுதி":lang==="hi"?"योजनाएं मिलीं":lang==="te"?"పథకాలు అర్హత":"schemes found for you"}</p>
        {matchedSchemes.length>1&&<div style={{background:"rgba(255,255,255,.18)",borderRadius:10,padding:"8px 16px",fontSize:13,fontWeight:600,display:"inline-block",marginBottom:8}}>{t(lang,"multiScheme")}</div>}
        {uploadedIds&&uploadedIds.length>0&&<div style={{marginTop:8,fontSize:13,opacity:.8}}>{readySchemesCount}/{matchedSchemes.length} schemes ready to apply (all docs present)</div>}
      </div>

      {/* Schemes */}
      <h2 style={{fontSize:18,fontWeight:800,color:"#2d1a0e",fontFamily:"'Baloo 2',sans-serif",marginBottom:14}}>{lang==="ta"?"உங்கள் திட்டங்கள்":lang==="hi"?"आपकी योजनाएं":lang==="te"?"మీ పథకాలు":"Your Matched Schemes"}</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:16,marginBottom:28}}>
        {matchedSchemes.map(s=>{
          const elig=checkEligibility(s,profile||{},uploadedIds||[]);
          return <SchemeCard key={s.id} scheme={s} lang={lang} onClick={setSelectedScheme} eligResult={uploadedIds&&uploadedIds.length>0?elig:null}/>;
        })}
      </div>

      {/* Documents needed */}
      <div style={{background:"#fff",borderRadius:20,padding:22,marginBottom:20,boxShadow:"0 4px 16px rgba(0,0,0,.06)"}}>
        <h2 style={{fontSize:17,fontWeight:800,color:"#2d1a0e",fontFamily:"'Baloo 2',sans-serif",marginBottom:5}}>{t(lang,"docsNeeded")}</h2>
        <p style={{fontSize:13,color:"#7a5c3a",marginBottom:14}}>{lang==="ta"?"இவற்றை எல்லா திட்டங்களுக்கும் தயாராக வையுங்கள்":lang==="hi"?"इन्हें सभी योजनाओं के लिए तैयार रखें":lang==="te"?"అన్ని పథకాలకు ఇవి సిద్ధంగా ఉంచుకోండి":"Gather these once for all your schemes"}</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:9}}>
          {allDocs.map((d,i)=>{
            const docId = matchedSchemes.flatMap(s=>s.requiredDocs)[i];
            const uploaded = uploadedIds&&uploadedIds.includes(docId);
            return (
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,background:uploaded?"#e8f8e8":"#faf5ee",borderRadius:9,padding:"9px 12px",border:uploaded?"1px solid #b0e0b0":"none"}}>
                <span style={{fontSize:16}}>{uploaded?"Uploaded":"Doc"}</span>
                <span style={{fontSize:12,color:"#2d1a0e",fontWeight:500}}>{d}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Help centres */}
      <div style={{background:"#edf4ff",borderRadius:20,padding:22}}>
        <h2 style={{fontSize:17,fontWeight:800,color:"#2d1a0e",fontFamily:"'Baloo 2',sans-serif",marginBottom:5}}>{t(lang,"helpCenters")}</h2>
        <p style={{fontSize:13,color:"#7a5c3a",marginBottom:14}}>{lang==="ta"?"இந்த இடங்களில் போய் விண்ணப்பிக்கலாம்":lang==="hi"?"इन जगहों पर जाकर आवेदन करें":lang==="te"?"ఈ చోట్లకు వెళ్ళి దరఖాస్తు చేయవచ్చు":"Visit any of these places to apply"}</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:9}}>
          {allCenters.map((c,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,background:"#fff",borderRadius:9,padding:"10px 13px",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
              <span style={{fontSize:18}}></span>
              <span style={{fontSize:12,color:"#1a4a8a",fontWeight:500}}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   NEW SCHEMES PAGE
   ============================================================ */
function NewSchemesPage({ lang, setSelectedScheme }) {
  const newSchemes = SCHEMES.filter(s=>s.isNew||new Date(s.addedDate)>new Date("2023-01-01")).sort((a,b)=>new Date(b.addedDate)-new Date(a.addedDate));
  const { speak, stop, speaking } = useReadAloud();

  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 20px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:46,marginBottom:10,animation:"bounce 1s ease infinite"}}>✨</div>
        <h1 style={{fontSize:26,fontWeight:800,color:"#2d1a0e",fontFamily:"'Baloo 2',sans-serif",marginBottom:6}}>{t(lang,"newSchemes")}</h1>
        <p style={{fontSize:14,color:"#7a5c3a"}}>{lang==="ta"?"சமீபத்தில் சேர்க்கப்பட்ட திட்டங்கள்":lang==="hi"?"हाल ही में जोड़ी गई योजनाएं":lang==="te"?"ఇటీవల జోడించిన పథకాలు":"Latest government schemes — don't miss out!"}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:18}}>
        {newSchemes.map(s=>(
          <div key={s.id} style={{background:"#fff",borderRadius:18,padding:22,cursor:"pointer",transition:"all .25s",boxShadow:"0 4px 16px rgba(0,0,0,.08)",position:"relative",overflow:"hidden",borderTop:`4px solid ${s.color}`}} onClick={()=>setSelectedScheme(s)}>
            <div style={{position:"absolute",top:12,right:12,background:s.isNew?"#e07b30":"#5aab72",color:"#fff",fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:20}}>
              {s.isNew
                ? (lang==="ta"?"🆕 புதியது":lang==="hi"?"🆕 नया":lang==="te"?"🆕 కొత్త":"🆕 NEW")
                : (lang==="ta"?"சமீபம்":lang==="hi"?"हाल की":lang==="te"?"తాజా":"Recent")}
            </div>
            <div style={{width:58,height:58,background:`${s.color}20`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><span style={{fontSize:30}}>{s.emoji}</span></div>
            <h3 style={{fontSize:14,fontWeight:700,color:"#2d1a0e",marginBottom:5,lineHeight:1.3,paddingRight:60}}>{getSchemeName(s,lang)}</h3>
            <p style={{fontSize:12,color:"#7a5c3a",marginBottom:10,lineHeight:1.4}}>{lang==="en"?s.tagline:getBenefitSimple(s,lang)}</p>
            <div style={{border:`1.5px solid ${s.color}`,borderRadius:8,padding:"7px 10px",fontSize:12,fontWeight:600,color:s.color,background:"#fdf8f0",marginBottom:10}}>{lang==="en"?s.benefit:getBenefitSimple(s,lang)}</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:8}}>
              <ReadAloudBtn text={`${getSchemeName(s,lang)}. ${getBenefitSimple(s,lang)}`} lang={lang} color={s.color}/>
              <div style={{fontSize:11,color:"#aaa"}}>{new Date(s.addedDate).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   LOGIN PAGE (CITIZEN)
   ============================================================ */
function LoginPage({ setUser, setPage, lang }) {
  const [mode, setMode] = useState("login");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSendOtp=()=>{ if(phone.length<10){alert("Enter valid 10-digit number");return;} setLoading(true); setTimeout(()=>{setLoading(false);setStep(2);},1200); };
  const handleVerify=()=>{ setLoading(true); setTimeout(()=>{setUser({name:name||"Citizen",phone});setPage("home");setLoading(false);},1000); };

  return (
    <div style={{minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#fff",borderRadius:24,padding:"34px 30px",width:"100%",maxWidth:400,boxShadow:"0 12px 50px rgba(0,0,0,.12)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,justifyContent:"center",marginBottom:18}}>
          <div style={{fontSize:32,background:"linear-gradient(135deg,#f0d8b0,#e0b870)",borderRadius:"50%",width:52,height:52,display:"flex",alignItems:"center",justifyContent:"center"}}></div>
          <div style={{fontSize:20,fontWeight:800,color:"#283618",fontFamily:"'Baloo 2',sans-serif"}}>YojanaGuru</div>
        </div>
        <h2 style={{fontSize:20,fontWeight:800,color:"#2d1a0e",textAlign:"center",marginBottom:5,fontFamily:"'Baloo 2',sans-serif"}}>{lang==="ta"?"உள்நுழைவு":lang==="hi"?"लॉगिन करें":lang==="te"?"లాగిన్":"Login / Sign Up"}</h2>
        <p style={{fontSize:13,color:"#7a5c3a",textAlign:"center",marginBottom:18}}>Save your schemes and track applications</p>
        <div style={{display:"flex",background:"#f0e8dc",borderRadius:30,padding:4,marginBottom:20}}>
          {["login","signup"].map(m=>(
            <button key={m} style={{flex:1,padding:"9px",borderRadius:26,border:"none",fontSize:13,fontWeight:mode===m?700:500,color:"#283618",background:mode===m?"#fff":"transparent",boxShadow:mode===m?"0 2px 8px rgba(0,0,0,.1)":"none",transition:"all .2s"}} onClick={()=>setMode(m)}>
              {m==="login"?"Login":"Sign Up"}
            </button>
          ))}
        </div>
        {mode==="signup"&&step===1&&(
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,fontWeight:600,color:"#283618",display:"block",marginBottom:5}}>Your Name</label>
            <input style={{width:"100%",padding:"11px 13px",borderRadius:10,border:"2px solid #e8d0b0",fontSize:14,outline:"none",background:"#faf5ee"}} value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name"/>
          </div>
        )}
        {step===1&&(
          <>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:13,fontWeight:600,color:"#283618",display:"block",marginBottom:5}}>Mobile Number</label>
              <div style={{display:"flex",gap:8}}>
                <span style={{background:"#fefae0",border:"2px solid #dda15e",borderRadius:10,padding:"11px 13px",fontSize:13,fontWeight:600,color:"#283618",whiteSpace:"nowrap"}}>+91</span>
                <input style={{flex:1,padding:"11px 13px",borderRadius:10,border:"2px solid #e8d0b0",fontSize:14,outline:"none",background:"#faf5ee"}} value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="10-digit number" type="tel"/>
              </div>
            </div>
            <button style={{width:"100%",padding:"13px",background:"linear-gradient(135deg,#bc6c25,#dda15e)",color:"#fff",border:"none",borderRadius:12,fontSize:15,fontWeight:700,marginTop:4}} onClick={handleSendOtp} disabled={loading}>
              {loading?<span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⏳</span>:"Send OTP"}
            </button>
          </>
        )}
        {step===2&&(
          <>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:13,fontWeight:600,color:"#283618",display:"block",marginBottom:5}}>Enter OTP</label>
              <p style={{fontSize:11,color:"#7a5c3a",marginBottom:6}}>+91 {phone} (Demo: any 4 digits)</p>
              <input style={{width:"100%",padding:"12px",borderRadius:10,border:"2px solid #e8d0b0",fontSize:22,outline:"none",background:"#faf5ee",textAlign:"center",letterSpacing:8}} value={otp} onChange={e=>setOtp(e.target.value.slice(0,4))} placeholder="• • • •" type="tel"/>
            </div>
            <button style={{width:"100%",padding:"13px",background:"linear-gradient(135deg,#bc6c25,#dda15e)",color:"#fff",border:"none",borderRadius:12,fontSize:15,fontWeight:700}} onClick={handleVerify} disabled={loading}>
              {loading?<span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⏳</span>:"Verify & Login"}
            </button>
          </>
        )}
        <div style={{textAlign:"center",marginTop:14}}>
          <button style={{background:"none",border:"none",color:"#aaa",fontSize:13,cursor:"pointer"}} onClick={()=>setPage("home")}>Continue without login →</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   VOLUNTEER LOGIN PAGE (HELPER MODE)
   Reuses the same layout as LoginPage but routes to helper mode
   after verification.
   ============================================================ */
function HelperLoginPage({ setUser, setPage, lang }) {
  const [mode, setMode] = useState("login");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSendOtp=()=>{ if(phone.length<10){alert("Enter valid 10-digit number");return;} setLoading(true); setTimeout(()=>{setLoading(false);setStep(2);},1200); };
  const handleVerify=()=>{ setLoading(true); setTimeout(()=>{setUser({name:name||"Volunteer",phone,role:"helper"});setPage("helper");setLoading(false);},1000); };

  return (
    <div style={{minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#fff",borderRadius:24,padding:"34px 30px",width:"100%",maxWidth:400,boxShadow:"0 12px 50px rgba(0,0,0,.12)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,justifyContent:"center",marginBottom:18}}>
          <div style={{fontSize:32,background:"linear-gradient(135deg,#f0d8b0,#e0b870)",borderRadius:"50%",width:52,height:52,display:"flex",alignItems:"center",justifyContent:"center"}}></div>
          <div style={{fontSize:20,fontWeight:800,color:"#283618",fontFamily:"'Baloo 2',sans-serif"}}>YojanaGuru</div>
        </div>
        <h2 style={{fontSize:20,fontWeight:800,color:"#2d1a0e",textAlign:"center",marginBottom:5,fontFamily:"'Baloo 2',sans-serif"}}>
          {lang==="ta"?"தன்னார்வலர் உள்நுழைவு":lang==="hi"?"स्वयंसेवक लॉगिन":lang==="te"?"సేవకుడు లాగిన్":"Volunteer Login / Sign Up"}
        </h2>
        <p style={{fontSize:13,color:"#7a5c3a",textAlign:"center",marginBottom:18}}>
          Help villagers find schemes and track their applications
        </p>
        <div style={{display:"flex",background:"#f0e8dc",borderRadius:30,padding:4,marginBottom:20}}>
          {["login","signup"].map(m=>(
            <button key={m} style={{flex:1,padding:"9px",borderRadius:26,border:"none",fontSize:13,fontWeight:mode===m?700:500,color:"#283618",background:mode===m?"#fff":"transparent",boxShadow:mode===m?"0 2px 8px rgba(0,0,0,.1)":"none",transition:"all .2s"}} onClick={()=>setMode(m)}>
              {m==="login"?"Login":"Sign Up"}
            </button>
          ))}
        </div>
        {mode==="signup"&&step===1&&(
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,fontWeight:600,color:"#283618",display:"block",marginBottom:5}}>Your Name</label>
            <input style={{width:"100%",padding:"11px 13px",borderRadius:10,border:"2px solid #e8d0b0",fontSize:14,outline:"none",background:"#faf5ee"}} value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name"/>
          </div>
        )}
        {step===1&&(
          <>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:13,fontWeight:600,color:"#283618",display:"block",marginBottom:5}}>Mobile Number</label>
              <div style={{display:"flex",gap:8}}>
                <span style={{background:"#fefae0",border:"2px solid #dda15e",borderRadius:10,padding:"11px 13px",fontSize:13,fontWeight:600,color:"#283618",whiteSpace:"nowrap"}}>+91</span>
                <input style={{flex:1,padding:"11px 13px",borderRadius:10,border:"2px solid #e8d0b0",fontSize:14,outline:"none",background:"#faf5ee"}} value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="10-digit number" type="tel"/>
              </div>
            </div>
            <button style={{width:"100%",padding:"13px",background:"linear-gradient(135deg,#bc6c25,#dda15e)",color:"#fff",border:"none",borderRadius:12,fontSize:15,fontWeight:700,marginTop:4}} onClick={handleSendOtp} disabled={loading}>
              {loading?<span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⏳</span>:"Send OTP"}
            </button>
          </>
        )}
        {step===2&&(
          <>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:13,fontWeight:600,color:"#283618",display:"block",marginBottom:5}}>Enter OTP</label>
              <p style={{fontSize:11,color:"#7a5c3a",marginBottom:6}}>+91 {phone} (Demo: any 4 digits)</p>
              <input style={{width:"100%",padding:"12px",borderRadius:10,border:"2px solid #e8d0b0",fontSize:22,outline:"none",background:"#faf5ee",textAlign:"center",letterSpacing:8}} value={otp} onChange={e=>setOtp(e.target.value.slice(0,4))} placeholder="• • • •" type="tel"/>
            </div>
            <button style={{width:"100%",padding:"13px",background:"linear-gradient(135deg,#bc6c25,#dda15e)",color:"#fff",border:"none",borderRadius:12,fontSize:15,fontWeight:700}} onClick={handleVerify} disabled={loading}>
              {loading?<span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⏳</span>:"Verify & Continue to Helper Mode"}
            </button>
          </>
        )}
        <div style={{textAlign:"center",marginTop:14}}>
          <button style={{background:"none",border:"none",color:"#aaa",fontSize:13,cursor:"pointer"}} onClick={()=>setPage("helper")}>Continue without login →</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   LOGIN MODE SELECTION (SELF vs HELPER)
   ============================================================ */
function LoginModePage({ onSelect }) {
  const cards = [
    {
      id:"self",
      title:"Check for Myself",
      subtitle:"Personal mode",
      desc:"Find government schemes that you personally qualify for and save them to your profile.",
      icon:"👤",
      border:"#dda15e",
      bg:"#fef4e0",
    },
    {
      id:"helper",
      title:"Help Someone Else",
      subtitle:"Village Helper Mode",
      desc:"For NGO workers, volunteers, teachers or CSC operators helping multiple people.",
      icon:"🤝",
      border:"#4caf6a",
      bg:"#e8f5ed",
      badge:"HELPER MODE",
    },
  ];

  return (
    <div style={{minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"32px 20px",background:"#fefae0"}}>
      <div style={{width:"100%",maxWidth:520}}>
        <div style={{textAlign:"center",marginBottom:26}}>
          <div style={{width:64,height:64,borderRadius:"50%",margin:"0 auto 14px",background:"linear-gradient(135deg,#bc6c25,#dda15e)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,boxShadow:"0 8px 26px rgba(0,0,0,.18)"}}>
            🏛️
          </div>
          <div style={{fontSize:24,fontWeight:800,color:"#283618",fontFamily:"'Baloo 2',sans-serif",marginBottom:4}}>YojanaGuru</div>
          <div style={{fontSize:14,color:"#7a5c3a"}}>How do you want to use YojanaGuru today?</div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {cards.map(card=>(
            <button
              key={card.id}
              onClick={()=>onSelect(card.id)}
              style={{
                width:"100%",
                textAlign:"left",
                background:"#fff",
                borderRadius:22,
                padding:"18px 18px",
                border:`2px solid ${card.border}`,
                boxShadow:"0 6px 26px rgba(0,0,0,.10)",
                cursor:"pointer",
                transition:"transform .18s, box-shadow .18s"
              }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 10px 32px rgba(0,0,0,.16)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 6px 26px rgba(0,0,0,.10)";}}
            >
              <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
                <div style={{width:52,height:52,borderRadius:16,flexShrink:0,background:card.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,border:`2px solid ${card.border}`}}>
                  {card.icon}
                </div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                    <span style={{fontSize:17,fontWeight:800,color:"#283618",fontFamily:"'Baloo 2',sans-serif"}}>{card.title}</span>
                    {card.badge&&(
                      <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:999,background:"#e8f5ed",color:"#2d6a3a",border:"1px solid #b5e1c2"}}>{card.badge}</span>
                    )}
                  </div>
                  {card.subtitle&&<div style={{fontSize:12,color:card.border,fontWeight:600,marginBottom:4}}>{card.subtitle}</div>}
                  <div style={{fontSize:13,color:"#7a5c3a",lineHeight:1.5}}>{card.desc}</div>
                </div>
                <div style={{fontSize:20,color:card.border,flexShrink:0,marginTop:4}}>→</div>
              </div>
            </button>
          ))}
        </div>

        <div style={{fontSize:11,color:"#a58a66",textAlign:"center",marginTop:18}}>
          🔒 All data stays on your device • No account required
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   NETA JI CHATBOT
   ============================================================ */
const NETA_PROMPT = (lang) => `You are "Neta Ji", a warm Indian politician-style AI guide for YojanaGuru — a government scheme portal covering Tamil Nadu, Andhra Pradesh, Telangana and Central schemes. Speak in ${lang==="ta"?"Tamil":lang==="hi"?"Hindi":lang==="te"?"Telugu":"simple English"}.

You guide users through the website. If they ask about a scheme, explain it simply. If they need help finding schemes, ask them a few quick questions. Be warm, encouraging, use 1-2 emojis per message. Keep messages short — 2-4 sentences.

Available pages on this website: Home, All Schemes, Eligibility Check, My Benefits, New Schemes, Upload Documents.

Scheme categories: Women, Farmers, Health, Education, Housing, Employment, Elderly, Disability, Artisan.
States covered: Tamil Nadu, Andhra Pradesh, Telangana + Central Government.

Always tell users they can use voice search by pressing the mic button. Always remind them to upload their documents first at the "Upload Documents" page for automatic eligibility checking.`;

function NetaJiChat({ lang, page, setPage, uploadedIdsCount }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [listening, setListening] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(()=>{ chatEndRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs,loading]);

  const startChat = async () => {
    setStarted(true); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,system:NETA_PROMPT(lang),messages:[{role:"user",content:"Hello, I just opened this website."}]})});
      const data = await res.json();
      setMsgs([{role:"assistant",content:data.content?.[0]?.text||"Namaste! I am Neta Ji. How can I help you find your government schemes today?"}]);
    } catch(e){ setMsgs([{role:"assistant",content:"Namaste! I am Neta Ji — your guide to government schemes. Ask me anything! I speak Tamil, Telugu, Hindi and English."}]); }
    setLoading(false);
  };

  const go = (target) => {
    setPage?.(target);
    setOpen(false);
  };

  const GuideActions = () => {
    const needsDocs = (uploadedIdsCount||0) === 0;
    const primary = needsDocs ? "uploadDocs" : "checker";
    return (
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
        <button onClick={()=>go(primary)} style={{gridColumn:"1 / -1",padding:"10px 12px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#bc6c25,#dda15e)",color:"#fff",fontSize:13,fontWeight:600}}>
          {needsDocs ? "Start here: Upload Documents" : "Start here: Check Eligibility"}
        </button>
        <button onClick={()=>go("schemes")} style={{padding:"10px 12px",borderRadius:12,border:"1px solid #dda15e",background:"#fff",color:"#283618",fontSize:13,fontWeight:600}}>
          Browse Schemes
        </button>
        <button onClick={()=>go("newSchemes")} style={{padding:"10px 12px",borderRadius:12,border:"1px solid #dda15e",background:"#fff",color:"#283618",fontSize:13,fontWeight:600}}>
          New Schemes
        </button>
        <button onClick={()=>go("benefits")} style={{padding:"10px 12px",borderRadius:12,border:"1px solid #dda15e",background:"#fff",color:"#283618",fontSize:13,fontWeight:600}}>
          My Benefits
        </button>
        <button onClick={()=>go("home")} style={{padding:"10px 12px",borderRadius:12,border:"1px solid #dda15e",background:"#fff",color:"#283618",fontSize:13,fontWeight:600}}>
          Home
        </button>
      </div>
    );
  };

  const send = async (msg) => {
    if(!msg.trim()||loading) return;
    const m = msg.toLowerCase();
    // Simple non-tech navigation intents
    if(m.includes("upload")||m.includes("document")||m.includes("docs")) { go("uploadDocs"); return; }
    if(m.includes("eligible")||m.includes("eligibility")||m.includes("check")) { go("checker"); return; }
    if(m.includes("benefit")||m.includes("my schemes")||m.includes("matched")) { go("benefits"); return; }
    if(m.includes("new")) { go("newSchemes"); return; }
    if(m.includes("all schemes")||m.includes("schemes")||m.includes("browse")) { go("schemes"); return; }
    if(m.includes("home")) { go("home"); return; }
    const newMsgs=[...msgs,{role:"user",content:msg}];
    setMsgs(newMsgs); setInput(""); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,system:NETA_PROMPT(lang),messages:newMsgs})});
      const data = await res.json();
      setMsgs([...newMsgs,{role:"assistant",content:data.content?.[0]?.text||""}]);
    } catch(e){ setMsgs([...newMsgs,{role:"assistant",content:"Arre! Something went wrong. Please try again"}]); }
    setLoading(false);
  };

  const startVoice = () => {
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){alert("Voice not supported");return;}
    const r=new SR();
    r.lang=LANG_OPTIONS.find(l=>l.code===lang)?.voice||"en-IN";
    r.interimResults=false;
    r.onstart=()=>setListening(true);
    r.onresult=e=>{setInput(e.results[0][0].transcript);setListening(false);};
    r.onerror=()=>setListening(false);
    r.onend=()=>setListening(false);
    r.start();
  };

  return (
    <>
      <button className="neta-toggle" style={{position:"fixed",bottom:24,right:24,zIndex:150,background:"linear-gradient(135deg,#283618,#606c38)",color:"#fefae0",border:"none",borderRadius:50,padding:"12px 18px",display:"flex",alignItems:"center",gap:8,boxShadow:"0 6px 24px rgba(40,54,24,.45)",fontSize:14,fontWeight:600,animation:open?"none":"pulse 2.5s ease infinite"}}
        onClick={()=>{setOpen(!open);if(!open&&!started)startChat();}}>
        <span style={{fontSize:20}}>🧑‍💼</span>
        {!open&&<span>Neta Ji</span>}
      </button>
      {open&&(
        <div className="neta-panel" style={{position:"fixed",bottom:78,right:24,zIndex:150,width:340,maxHeight:500,background:"#fff",borderRadius:20,boxShadow:"0 16px 60px rgba(0,0,0,.2)",display:"flex",flexDirection:"column",animation:"fadeUp .3s ease"}}>
          <div style={{background:"linear-gradient(135deg,#283618,#606c38)",padding:"12px 14px",borderRadius:"20px 20px 0 0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <span style={{fontSize:24,background:"rgba(254,250,224,.22)",borderRadius:"50%",width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center"}}>🧑‍💼</span>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>Neta Ji</div>
                <div style={{fontSize:11,color:"rgba(254,250,224,.92)",display:"flex",alignItems:"center",gap:4}}><span style={{width:6,height:6,borderRadius:"50%",background:"#7fff6a",display:"inline-block"}}/>Your Guide</div>
              </div>
            </div>
            <button style={{background:"rgba(255,255,255,.2)",border:"none",color:"#fff",width:28,height:28,borderRadius:"50%",fontSize:13}} onClick={()=>setOpen(false)}>✕</button>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:13,display:"flex",flexDirection:"column",gap:9,background:"#fefae0"}}>
            {!started&&(
              <div style={{textAlign:"left",padding:"14px 10px"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <span style={{fontSize:28}}>🧑‍💼</span>
                  <div>
                  <div style={{fontSize:14,fontWeight:700,color:"#283618"}}>Neta Ji will guide you</div>
                  <div style={{fontSize:12,color:"#606c38",marginTop:2}}>Just tap a button below. No typing needed.</div>
                  </div>
                </div>
                <div style={{fontSize:12,color:"#bc6c25",lineHeight:1.6}}>
                  {(uploadedIdsCount||0) > 0 ? "I can take you to the right page and help you finish the steps." : "First we upload your documents once. Then I will check all schemes automatically."}
                </div>
                <GuideActions/>
                <button style={{marginTop:10,width:"100%",background:"transparent",color:"#283618",border:"1px solid #dda15e",padding:"9px 12px",borderRadius:12,fontSize:13,fontWeight:600}} onClick={startChat}>
                  Or chat with Neta Ji
                </button>
              </div>
            )}
            {msgs.map((m,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-end",gap:6,justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                {m.role==="assistant"&&<span style={{fontSize:20,background:"#fefae0",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🧑‍💼</span>}
                <div style={{maxWidth:"78%",padding:"9px 12px",borderRadius:14,fontSize:13,lineHeight:1.5,whiteSpace:"pre-wrap",wordBreak:"break-word",animation:"fadeUp .3s ease",...(m.role==="user"?{background:"linear-gradient(135deg,#bc6c25,#dda15e)",color:"#fff",borderBottomRightRadius:4}:{background:"#fff",color:"#283618",borderBottomLeftRadius:4,boxShadow:"0 2px 8px rgba(0,0,0,.07)",border:"1px solid rgba(221,161,94,.55)"})}}>{m.content}</div>
              </div>
            ))}
            {loading&&(
              <div style={{display:"flex",alignItems:"flex-end",gap:6}}>
                <span style={{fontSize:20,background:"#f0e0c8",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center"}}></span>
                <div style={{background:"#fff",padding:"11px 14px",borderRadius:14,borderBottomLeftRadius:4,display:"flex",gap:4,alignItems:"center"}}>
                  {[0,.2,.4].map(d=><span key={d} style={{width:7,height:7,borderRadius:"50%",background:"#c4a882",display:"inline-block",animation:"blink 1.2s ease infinite",animationDelay:`${d}s`}}/>)}
                </div>
              </div>
            )}
            {started && !loading && <div style={{marginTop:6}}><GuideActions/></div>}
            <div ref={chatEndRef}/>
          </div>
          <div style={{display:"flex",gap:6,padding:"9px 11px",background:"#fff",borderTop:"1px solid #f0e0c8",borderRadius:"0 0 20px 20px"}}>
            <input style={{flex:1,padding:"8px 12px",borderRadius:30,border:"2px solid #e8d0b0",fontSize:13,background:"#faf6f0",outline:"none"}} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send(input)} placeholder={lang==="ta"?"கேளுங்கள்...":lang==="hi"?"पूछें...":lang==="te"?"అడగండి...":"Ask anything..."} disabled={loading}/>
            <button style={{width:34,height:34,borderRadius:"50%",border:listening?"2px solid #e05050":"2px solid #e8c898",background:listening?"#ffe0e0":"#fdf0e0",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}} onClick={startVoice}>
              {listening?"":""}
            </button>
            <button style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#bc6c25,#dda15e)",color:"#fff",border:"none",fontSize:15,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>send(input)} disabled={loading}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer style={{background:"#2d1a0e",color:"rgba(255,255,255,.7)",padding:"22px 20px",marginTop:40}}>
      <div style={{maxWidth:1100,margin:"0 auto",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,justifyContent:"center",marginBottom:10}}>
          <span style={{fontSize:22}}></span>
          <div style={{fontSize:17,fontWeight:700,color:"#fff",fontFamily:"'Baloo 2',sans-serif"}}>YojanaGuru</div>
        </div>
        <div style={{fontSize:13,marginBottom:6}}>Voice Search • Read Aloud • Document Upload • 4 Languages</div>
        <div style={{fontSize:11,opacity:.4}}>Hackathon Demo. Verify scheme details at official government portals.</div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */
export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [detectedState, setDetectedState] = useState(null);
  const [matchedSchemes, setMatchedSchemes] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const { uploadedDocs, markUploaded, markRemoved, hasDoc, uploadedIds } = useDocStore();
  const [loginMode, setLoginMode] = useState(null); // 'self' | 'helper'

  useEffect(() => {

  if (!navigator.geolocation) {
    console.log("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );

      const data = await response.json();

      const state = data.address.state;

      console.log("Detected State:", state);

      if(state === "Tamil Nadu") setDetectedState("Tamil Nadu");
      else if(state === "Andhra Pradesh") setDetectedState("Andhra Pradesh");
      else if(state === "Telangana") setDetectedState("Telangana");
      else if(state === "Gujarat") setDetectedState("Gujarat");

    } catch(err){
      console.log("Location detection failed");
    }

  });

}, []);

  const handleResults = (schemes, profile) => {
    setMatchedSchemes(schemes);
    setUserProfile(profile||{});
  };

  // Full-screen helper dashboard mode (no main nav/footer)
  if (page === "helper") {
    return (
      <VillageHelperMode
        onExit={() => setPage("home")}
        schemes={SCHEMES}
      />
    );
  }

  return (
    <div>
      <GlobalStyles/>
      <NavBar page={page} setPage={setPage} lang={lang} setLang={setLang} user={user} setUser={setUser} setLoginMode={setLoginMode}/>
      <main style={{minHeight:"80vh"}} className="page-enter" key={page}>
        {page==="home"       && <HomePage setPage={setPage} lang={lang}/>}
        {page==="schemes"    && <SchemesPage lang={lang} setSelectedScheme={setSelectedScheme} uploadedIds={uploadedIds} profile={userProfile} detectedState={detectedState}/>}
        {page==="checker"    && <CheckerPage lang={lang} setPage={setPage} onResults={handleResults} uploadedIds={uploadedIds}/>}
        {page==="benefits"   && <BenefitsPage lang={lang} matchedSchemes={matchedSchemes} profile={userProfile} setSelectedScheme={setSelectedScheme} setPage={setPage} uploadedIds={uploadedIds}/>}
        {page==="newSchemes" && <NewSchemesPage lang={lang} setSelectedScheme={setSelectedScheme}/>}
        {page==="uploadDocs" && <UploadDocsPage lang={lang} uploadedDocs={uploadedDocs} markUploaded={markUploaded} markRemoved={markRemoved}/>}
        {page==="login"      && (
          <LoginModePage
            onSelect={(mode)=>{
              if (mode === "self") {
                setLoginMode("self");
                setPage("loginSelf");
              } else {
                setLoginMode("helper");
                setPage("helperLogin");
              }
            }}
          />
        )}
        {page==="loginSelf"    && <LoginPage setUser={setUser} setPage={setPage} lang={lang}/>}
        {page==="helperLogin"  && <HelperLoginPage setUser={setUser} setPage={setPage} lang={lang}/>}
      </main>
      <Footer/>
      <SchemeModal scheme={selectedScheme} lang={lang} onClose={()=>setSelectedScheme(null)} uploadedIds={uploadedIds}/>
      <NetaJiChat lang={lang} page={page} setPage={setPage} uploadedIdsCount={uploadedIds.length}/>
    </div>
  );
}