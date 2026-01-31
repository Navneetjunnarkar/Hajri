
import { Episode, Language } from '../types';

export const EPISODES: Episode[] = [
  {
    id: 'farmer-crisis',
    title: { 
      [Language.HINDI]: 'किसान का संकट', 
      [Language.ENGLISH]: 'Farmer Crisis',
      [Language.MARATHI]: 'शेतकऱ्याचे संकट',
      [Language.BENGALI]: 'কৃষকের সংকট',
      [Language.TELUGU]: 'రైతు సంక్షోభం',
      [Language.PUNJABI]: 'ਕਿਸਾਨ ਦਾ ਸੰਕਟ'
    },
    scenario: { 
        [Language.HINDI]: 'राज, आपकी फसल नष्ट हो गई। आपके पास सिर्फ ₹2000 हैं।',
        [Language.ENGLISH]: 'Raj, your crop is destroyed. You only have ₹2000 left.',
        [Language.MARATHI]: 'राज, तुझे पीक नष्ट झाले आहे. तुझ्याकडे फक्त ₹२००० उरले आहेत.',
        [Language.BENGALI]: 'রাজ, আপনার ফসল নষ্ট হয়ে গেছে। আপনার কাছে মাত্র ₹২০০০ আছে।',
        [Language.TELUGU]: 'రాజ్, మీ పంట నాశనమైంది. మీ వద్ద కేవలం ₹2000 మాత్రమే ఉన్నాయి.',
        [Language.PUNJABI]: 'ਰਾਜ, ਤੁਹਾਡੀ ਫਸਲ ਬਰਬਾਦ ਹੋ ਗਈ ਹੈ। ਤੁਹਾਡੇ ਕੋਲ ਸਿਰਫ ₹2000 ਬਚੇ ਹਨ।'
    },
    narrative: {
        [Language.HINDI]: 'बेटी की स्कूल फीस ₹1500 आज देनी है। परिवार को खाने के लिए ₹500 चाहिए। मनीलेंडर ₹5000 @24% ब्याज दे रहा है। क्या करोगे?',
        [Language.ENGLISH]: "Daughter's school fee of ₹1500 is due today. Family needs ₹500 for food. Moneylender offers ₹5000 @ 24% interest. What will you do?",
        [Language.MARATHI]: 'मुलीची शाळेची फी ₹१५०० आज भरायची आहे. कुटुंबाला जेवणासाठी ₹५०० हवे आहेत. सावकार ₹५००० @२४% व्याजाने देत आहे. तू काय करशील?',
        [Language.BENGALI]: 'মেয়ের স্কুলের ফি ₹১৫০০ আজ দিতে হবে। পরিবারের খাবারের জন্য ₹৫০০ দরকার। মহাজন ২৪% সুদে ₹৫০০০ দিচ্ছে। আপনি কি করবেন?',
        [Language.TELUGU]: 'కుమార్తె పాఠశాల ఫీజు ₹1500 ఈరోజే చెల్లించాలి. కుటుంబానికి ఆహారం కోసం ₹500 అవసరం. వడ్డీ వ్యాపారి 24% వడ్డీకి ₹5000 ఇస్తున్నాడు. మీరు ఏం చేస్తారు?',
        [Language.PUNJABI]: 'ਧੀ ਦੀ ਸਕੂਲ ਫੀਸ ₹1500 ਅੱਜ ਦੇਣੀ ਹੈ। ਪਰਿਵਾਰ ਨੂੰ ਖਾਣ ਲਈ ₹500 ਚਾਹੀਦੇ ਹਨ। ਸ਼ਾਹੂਕਾਰ ₹5000 @24% ਵਿਆਜ ਤੇ ਦੇ ਰਿਹਾ ਹੈ। ਤੁਸੀਂ ਕੀ ਕਰੋਗੇ?'
    },
    initialStats: { cash: 2000, debt: 0, stress: 30 },
    choices: [
      {
        id: 'debt',
        label: { 
          [Language.HINDI]: 'मनीलेंडर से कर्ज लूंगा', 
          [Language.ENGLISH]: 'Take Loan from Moneylender',
          [Language.MARATHI]: 'सावकराकडून कर्ज घेईन',
          [Language.BENGALI]: 'মহাজনের কাছ থেকে ঋণ নেব',
          [Language.TELUGU]: 'వడ్డీ వ్యాపారి నుండి రుణం తీసుకుంటాను',
          [Language.PUNJABI]: 'ਸ਼ਾਹੂਕਾਰ ਤੋਂ ਕਰਜ਼ਾ ਲਵਾਂਗਾ'
        },
        keywords: ['karz', 'loan', 'debt', 'money', 'paisa', 'savkar', 'rinn', 'vaddi'],
        impact: {
          debt: 5000,
          savings: -1500,
          stress: 10,
          xp: 50,
          description: { 
            [Language.HINDI]: 'तुरंत राहत, लेकिन भविष्य बोझिल।', 
            [Language.ENGLISH]: 'Instant relief, but future burden.',
            [Language.MARATHI]: 'तात्काळ दिलासा, पण भविष्य कठीण.',
            [Language.BENGALI]: 'তাত্ক্ষণিক স্বস্তি, কিন্তু ভবিষ্যতের বোঝা।',
            [Language.TELUGU]: 'తక్షణ ఉపశమనం, కానీ భవిష్యత్తు భారం.',
            [Language.PUNJABI]: 'ਤੁਰੰਤ ਰਾਹਤ, ਪਰ ਭਵਿੱਖ ਦਾ ਬੋਝ।'
          }
        },
        consequences: [
          { period: { [Language.ENGLISH]: 'Week 1', [Language.HINDI]: 'हफ्ता 1' }, amount: 5000, stress: 10, note: { [Language.ENGLISH]: 'Crisis solved temporarily.', [Language.HINDI]: 'अस्थायी राहत।' } },
          { period: { [Language.ENGLISH]: 'Year 1', [Language.HINDI]: 'साल 1' }, amount: 12000, stress: 100, note: { [Language.ENGLISH]: 'Total paid ₹12,000 (Trap!)', [Language.HINDI]: 'कुल भुगतान ₹12,000 (जाल!)' } },
        ]
      },
      {
        id: 'insurance',
        label: { 
          [Language.HINDI]: 'बीमा और सुरक्षा (₹500)', 
          [Language.ENGLISH]: 'Insurance & Protection (₹500)',
          [Language.MARATHI]: 'विमा आणि संरक्षण (₹५००)',
          [Language.BENGALI]: 'বীমা এবং সুরক্ষা (₹৫০০)',
          [Language.TELUGU]: 'భీమా మరియు రక్షణ (₹500)',
          [Language.PUNJABI]: 'ਬੀਮਾ ਅਤੇ ਸੁਰੱਖਿਆ (₹500)'
        },
        keywords: ['insurance', 'suraksha', 'bima', 'vima', 'protect', 'policy'],
        impact: {
          debt: 0,
          savings: -500,
          stress: 20,
          xp: 200,
          description: { 
            [Language.HINDI]: 'भविष्य सुरक्षित किया।', 
            [Language.ENGLISH]: 'Future secured via insurance.',
            [Language.MARATHI]: 'भविष्य सुरक्षित केले.',
            [Language.BENGALI]: 'ভবিষ্যৎ সুরক্ষিত করেছেন।',
            [Language.TELUGU]: 'భీమాతో భవిష్యత్తు సురక్షితం.',
            [Language.PUNJABI]: 'ਬੀਮਾ ਦੁਆਰਾ ਭਵਿੱਖ ਸੁਰੱਖਿਅਤ।'
          }
        },
        consequences: [
          { period: { [Language.ENGLISH]: 'Year 1', [Language.HINDI]: 'साल 1' }, amount: 0, stress: 0, note: { [Language.ENGLISH]: 'Crop claim covered the loss!', [Language.HINDI]: 'बीमा ने नुकसान कवर किया!' } },
        ]
      }
    ]
  },
  {
    id: 'kamla-business',
    title: {
      [Language.ENGLISH]: "Kamla's Micro-Business",
      [Language.HINDI]: "कमला का छोटा व्यापार",
      [Language.MARATHI]: "कमलाचा छोटा व्यवसाय",
      [Language.BENGALI]: "কমলার ক্ষুদ্র ব্যবসা",
      [Language.TELUGU]: "కమల మైక్రో బిజినెస్",
      [Language.PUNJABI]: "ਕਮਲਾ ਦਾ ਛੋਟਾ ਕਾਰੋਬਾਰ"
    },
    scenario: {
      [Language.ENGLISH]: "Kamla wants to buy a sewing machine to earn money for her family. It costs ₹8,000.",
      [Language.HINDI]: "कमला अपने परिवार के लिए पैसे कमाने के लिए एक सिलाई मशीन खरीदना चाहती है। इसकी कीमत ₹8,000 है।",
      [Language.MARATHI]: "कमलाला तिच्या कुटुंबासाठी पैसे कमवण्यासाठी शिलाई मशीन खरेदी करायची आहे. त्याची किंमत ₹८,००० आहे.",
      [Language.BENGALI]: "কমলা তার পরিবারের জন্য অর্থ উপার্জনের জন্য একটি সেলাই মেশিন কিনতে চায়। এর দাম ₹৮,০০০।",
      [Language.TELUGU]: "కమల తన కుటుంబం కోసం డబ్బు సంపాదించడానికి కుట్టు మిషన్ కొనాలనుకుంటోంది. దీని ధర ₹8,000.",
      [Language.PUNJABI]: "ਕਮਲਾ ਆਪਣੇ ਪਰਿਵਾਰ ਲਈ ਪੈਸੇ ਕਮਾਉਣ ਲਈ ਸਿਲਾਈ ਮਸ਼ੀਨ ਖਰੀਦਣਾ ਚਾਹੁੰਦੀ ਹੈ। ਇਸ ਦੀ ਕੀਮਤ ₹8,000 ਹੈ।"
    },
    narrative: {
      [Language.ENGLISH]: "She has ₹2,000 in savings. A local Self Help Group (SHG) offers a low-interest loan, or she can wait 6 months to save more. What's the plan?",
      [Language.HINDI]: "उसके पास ₹2,000 की बचत है। एक स्थानीय स्वयं सहायता समूह (SHG) कम ब्याज वाले ऋण की पेशकश करता है, या वह अधिक बचत करने के लिए 6 महीने प्रतीक्षा कर सकती है।",
      [Language.MARATHI]: "तिच्याकडे ₹२,००० बचत आहे. स्थानिक स्वयं-सहायता गट (SHG) कमी व्याजाचे कर्ज देतात किंवा ती अधिक बचतीसाठी ६ महिने थांबू शकते.",
      [Language.BENGALI]: "তার কাছে সঞ্চয় আছে ₹২,০০০। একটি স্থানীয় স্বনির্ভর গোষ্ঠী (SHG) কম সুদে ঋণের প্রস্তাব দেয়, অথবা তিনি আরও সঞ্চয় করার জন্য ৬ মাস অপেক্ষা করতে পারেন।",
      [Language.TELUGU]: "ఆమె దగ్గర ₹2,000 పొదుపు ఉంది. స్థానిక స్వయం సహాయక బృందం (SHG) తక్కువ వడ్డీ రుణాన్ని అందిస్తుంది లేదా ఆమె మరిన్ని పొదుపు చేయడానికి 6 నెలలు వేచి ఉండవచ్చు.",
      [Language.PUNJABI]: "ਉਸ ਕੋਲ ₹2,000 ਦੀ ਬਚਤ ਹੈ। ਇੱਕ ਸਥਾਨਕ ਸਵੈ ਸਹਾਇਤਾ ਸਮੂਹ (SHG) ਘੱਟ ਵਿਆਜ ਵਾਲੇ ਕਰਜ਼ੇ ਦੀ ਪੇਸ਼ਕਸ਼ ਕਰਦਾ ਹੈ, ਜਾਂ ਉਹ ਹੋਰ ਬਚਤ ਕਰਨ ਲਈ 6 ਮਹੀਨੇ ਉਡੀਕ ਕਰ ਸਕਦੀ ਹੈ।"
    },
    initialStats: { cash: 2000, debt: 0, stress: 10 },
    choices: [
      {
        id: 'shg-loan',
        label: { [Language.ENGLISH]: "Take SHG Loan (8%)", [Language.HINDI]: "SHG लोन लें (8%)", [Language.MARATHI]: "SHG कर्ज घ्या (८%)", [Language.BENGALI]: "SHG ঋণ নিন (৮%)", [Language.TELUGU]: "SHG రుణం తీసుకోండి (8%)", [Language.PUNJABI]: "SHG ਕਰਜ਼ਾ ਲਓ (8%)" },
        keywords: ['shg', 'group', 'samuh', 'loan', 'business'],
        impact: {
          debt: 6000,
          savings: -2000,
          stress: 15,
          xp: 250,
          description: { [Language.ENGLISH]: "Borrowing to invest in tools. Smart move!", [Language.HINDI]: "उपकरणों में निवेश करने के लिए ऋण। समझदारी भरा कदम!" }
        },
        consequences: [
          { period: { [Language.ENGLISH]: "Month 1" }, amount: 6000, stress: 20, note: { [Language.ENGLISH]: "Machine bought. Work started!" } },
          { period: { [Language.ENGLISH]: "Year 1" }, amount: 2000, stress: 5, note: { [Language.ENGLISH]: "Loan mostly paid from earnings." } }
        ]
      },
      {
        id: 'wait-save',
        label: { [Language.ENGLISH]: "Wait and Save", [Language.HINDI]: "प्रतीक्षा करें और बचत करें", [Language.MARATHI]: "थांबा आणि बचत करा", [Language.BENGALI]: "অপেক্ষা করুন এবং সঞ্চয় করুন", [Language.TELUGU]: "వేచి ఉండి పొదుపు చేయండి", [Language.PUNJABI]: "ਉਡੀਕ ਕਰੋ ਅਤੇ ਬਚਾਓ" },
        keywords: ['wait', 'save', 'bachat', 'thamba'],
        impact: {
          debt: 0,
          savings: 0,
          stress: 30,
          xp: 150,
          description: { [Language.ENGLISH]: "Safety first, but lost 6 months of income.", [Language.HINDI]: "सुरक्षा पहले, लेकिन 6 महीने की आय का नुकसान।" }
        },
        consequences: [
          { period: { [Language.ENGLISH]: "Month 6" }, amount: 0, stress: 20, note: { [Language.ENGLISH]: "Finally bought the machine cash-down." } },
          { period: { [Language.ENGLISH]: "Year 1" }, amount: 0, stress: 10, note: { [Language.ENGLISH]: "No debt, but total earnings are lower." } }
        ]
      }
    ]
  },
  {
    id: 'student-dream',
    title: {
      [Language.ENGLISH]: "Arjun's Student Dilemma",
      [Language.HINDI]: "अर्जुन का छात्र संकट",
      [Language.MARATHI]: "अर्जुनचे शैक्षणिक संकट",
      [Language.BENGALI]: "অর্জুনের ছাত্র সংকট",
      [Language.TELUGU]: "అర్జున్ విద్యార్థి డైలమా",
      [Language.PUNJABI]: "ਅਰਜੁਨ ਦਾ ਵਿਦਿਆਰਥੀ ਸੰਕਟ"
    },
    scenario: {
      [Language.ENGLISH]: "Arjun got admission into a top college, but the fees are ₹3 Lakhs.",
      [Language.HINDI]: "अर्जुन को एक टॉप कॉलेज में प्रवेश मिला, लेकिन फीस ₹3 लाख है।",
      [Language.MARATHI]: "अर्जुनला एका टॉप कॉलेजमध्ये प्रवेश मिळाला, पण फी ₹३ लाख आहे.",
      [Language.BENGALI]: "অর্জুন একটি নামী কলেজে ভর্তির সুযোগ পেয়েছে, কিন্তু ফি ৩ লক্ষ টাকা।",
      [Language.TELUGU]: "అర్జున్‌కు టాప్ కాలేజీలో సీటు వచ్చింది, కానీ ఫీజు ₹3 లక్షలు.",
      [Language.PUNJABI]: "ਅਰਜੁਨ ਨੂੰ ਇੱਕ ਚੋਟੀ ਦੇ ਕਾਲਜ ਵਿੱਚ ਦਾਖਲਾ ਮਿਲਿਆ, ਪਰ ਫੀਸ ₹3 ਲੱਖ ਹੈ।"
    },
    narrative: {
      [Language.ENGLISH]: "His family has ₹50,000. He needs ₹2.5 Lakhs more. The bank offers a student loan, a relative offers a loan with 'no interest' but social strings, or he can work part-time and study later. What should he do?",
      [Language.HINDI]: "उसके परिवार के पास ₹50,000 हैं। उसे ₹2.5 लाख और चाहिए। बैंक छात्र ऋण देता है, एक रिश्तेदार बिना ब्याज के ऋण देता है लेकिन सामाजिक दबाव होगा, या वह पार्ट-टाइम काम कर सकता है।",
      [Language.MARATHI]: "त्याच्या कुटुंबाकडे ₹५०,००० आहेत. त्याला आणखी ₹२.५ लाख हवे आहेत. बँक कर्ज देतेय, एक नातेवाईक बिनव्याजी कर्ज देतोय पण सामाजिक दडपण असेल.",
      [Language.BENGALI]: "ওর পরিবারের কাছে ৫০,০০০ টাকা আছে। আরও ২.৫ লক্ষ টাকা প্রয়োজন। ব্যাঙ্ক লোন নেবে, নাকি আত্মীয়র থেকে নেবে?",
      [Language.TELUGU]: "అతని కుటుంబం వద్ద ₹50,000 ఉన్నాయి. అతనికి ఇంకా ₹2.5 లక్షలు కావాలి. బ్యాంక్ స్టూడెంట్ లోన్ ఇస్తోంది, బంధువు వడ్డీ లేకుండా ఇస్తానంటున్నాడు కానీ కొన్ని షరతులు ఉన్నాయి.",
      [Language.PUNJABI]: "ਉਸਦੇ ਪਰਿਵਾਰ ਕੋਲ ₹50,000 ਹਨ। ਉਸਨੂੰ ₹2.5 ਲੱਖ ਹੋਰ ਚਾਹੀਦੇ ਹਨ। ਬੈਂਕ ਵਿਦਿਆਰਥੀ ਕਰਜ਼ਾ ਦਿੰਦਾ ਹੈ, ਇੱਕ ਰਿਸ਼ਤੇਦਾਰ ਬਿਨਾਂ ਵਿਆਜ ਦੇ ਕਰਜ਼ਾ ਦਿੰਦਾ ਹੈ ਪਰ ਸਮਾਜਿਕ ਦਬਾਅ ਹੋਵੇਗਾ।"
    },
    initialStats: { cash: 50000, debt: 0, stress: 20 },
    choices: [
      {
        id: 'bank-loan',
        label: { [Language.ENGLISH]: "Bank Student Loan (9%)", [Language.HINDI]: "बैंक छात्र ऋण (9%)", [Language.MARATHI]: "बँक शैक्षणिक कर्ज (९%)", [Language.BENGALI]: "ব্যাঙ্ক স্টুডেন্ট লোন (৯%)", [Language.TELUGU]: "బ్యాంక్ స్టూడెంట్ లోన్ (9%)", [Language.PUNJABI]: "ਬੈਂਕ ਵਿਦਿਆਰਥੀ ਕਰਜ਼ਾ (9%)" },
        keywords: ['bank', 'student', 'loan', 'degree'],
        impact: {
          debt: 250000,
          savings: -50000,
          stress: 15,
          xp: 300,
          description: { [Language.ENGLISH]: "Smart! Professional loan builds credit history.", [Language.HINDI]: "समझदारी! प्रोफेशनल लोन क्रेडिट हिस्ट्री बनाता है।" }
        },
        consequences: [
          { period: { [Language.ENGLISH]: "Year 1" }, amount: 250000, stress: 10, note: { [Language.ENGLISH]: "Studying hard. No payments due yet." } },
          { period: { [Language.ENGLISH]: "Year 5" }, amount: 320000, stress: 40, note: { [Language.ENGLISH]: "Jobs started. Repayment begins comfortably." } }
        ]
      },
      {
        id: 'relative-loan',
        label: { [Language.ENGLISH]: "Borrow from Relatives", [Language.HINDI]: "रिश्तेदारों से उधार", [Language.MARATHI]: "नातेवाईकांकडून कर्ज", [Language.BENGALI]: "আত্মীয়দের থেকে ধার", [Language.TELUGU]: "బంధువుల నుండి అప్పు", [Language.PUNJABI]: "ਰਿਸ਼ਤੇਦਾਰਾਂ ਤੋਂ ਉਧਾਰ" },
        keywords: ['relative', 'family', 'chacha', 'mama', 'loan'],
        impact: {
          debt: 250000,
          savings: -50000,
          stress: 60,
          xp: 100,
          description: { [Language.ENGLISH]: "Debt free interest-wise, but high emotional cost.", [Language.HINDI]: "ब्याज मुक्त ऋण, लेकिन उच्च भावनात्मक कीमत।" }
        },
        consequences: [
          { period: { [Language.ENGLISH]: "Year 2" }, amount: 250000, stress: 70, note: { [Language.ENGLISH]: "Relatives asking about results every day." } },
          { period: { [Language.ENGLISH]: "Year 5" }, amount: 250000, stress: 90, note: { [Language.ENGLISH]: "Pressure to work in relative's shop instead of a job." } }
        ]
      },
      {
        id: 'work-study',
        label: { [Language.ENGLISH]: "Work & Study Later", [Language.HINDI]: "काम करें और बाद में पढ़ें", [Language.MARATHI]: "आधी काम मग शिक्षण", [Language.BENGALI]: "আগে কাজ পরে পড়া", [Language.TELUGU]: "పని చేసి తర్వాత చదువు", [Language.PUNJABI]: "ਕੰਮ ਕਰੋ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਪੜ੍ਹੋ" },
        keywords: ['work', 'job', 'part-time', 'wait'],
        impact: {
          debt: 0,
          savings: 10000,
          stress: 40,
          xp: 200,
          description: { [Language.ENGLISH]: "Self-reliant, but delayed career by years.", [Language.HINDI]: "आत्मनिर्भर, लेकिन करियर में वर्षों की देरी।" }
        },
        consequences: [
          { period: { [Language.ENGLISH]: "Year 3" }, amount: 0, stress: 30, note: { [Language.ENGLISH]: "Saved enough for 1st year fees. Still working." } },
          { period: { [Language.ENGLISH]: "Year 10" }, amount: 0, stress: 10, note: { [Language.ENGLISH]: "Finally graduated, but peers are far ahead." } }
        ]
      }
    ]
  },
  {
    id: 'retirement-plan',
    title: {
      [Language.ENGLISH]: "Ravi's Future Fund",
      [Language.HINDI]: "रवि का भविष्य कोष",
      [Language.MARATHI]: "रवीचा भविष्य निधी",
      [Language.BENGALI]: "রবির ভবিষ্যৎ তহবিল",
      [Language.TELUGU]: "రవి ఫ్యూచర్ ఫండ్",
      [Language.PUNJABI]: "ਰਵੀ ਦਾ ਭਵਿੱਖ ਫੰਡ"
    },
    scenario: {
      [Language.ENGLISH]: "Ravi is 40. He has ₹50,000 surplus this year. He needs to save for retirement.",
      [Language.HINDI]: "रवि 40 वर्ष का है। उसके पास इस साल ₹50,000 अतिरिक्त हैं। उसे रिटायरमेंट के लिए बचत करनी है।",
      [Language.MARATHI]: "रवी ४० वर्षांचा आहे. त्याच्याकडे या वर्षी ₹५०,००० जास्तीचे आहेत. त्याला निवृत्तीसाठी बचत करायची आहे.",
      [Language.BENGALI]: "রবির বয়স ৪০। ওর কাছে এই বছর ৫০,০০০ টাকা অতিরিক্ত আছে। ওকে রিটায়ারমেন্টের জন্য সঞ্চয় করতে হবে।",
      [Language.TELUGU]: "రవి వయస్సు 40. ఈ సంవత్సరం అతని వద్ద ₹50,000 అదనంగా ఉన్నాయి. అతను పదవీ విరమణ కోసం పొదుపు చేయాలి.",
      [Language.PUNJABI]: "ਰਵੀ 40 ਸਾਲ ਦਾ ਹੈ। ਉਸ ਕੋਲ ਇਸ ਸਾਲ ₹50,000 ਵਾਧੂ ਹਨ। ਉਸਨੂੰ ਰਿਟਾਇਰਮੈਂਟ ਲਈ ਬਚਤ ਕਰਨੀ ਪਵੇਗੀ।"
    },
    narrative: {
      [Language.ENGLISH]: "He can put it in a PPF (Safe, 7%), invest in Stocks (Risky, 12%), or buy Gold (Traditional). What is his choice?",
      [Language.HINDI]: "वह इसे PPF (सुरक्षित, 7%) में डाल सकता है, स्टॉक (जोखिम भरा, 12%) में निवेश कर सकता है, या सोना (पारंपरिक) खरीद सकता है।",
      [Language.MARATHI]: "तो PPF (सुरक्षित, ७%), शेअर्स (जोखिम, १२%) किंवा सोने (पारंपारिक) मध्ये गुंतवणूक करू शकतो.",
      [Language.BENGALI]: "ও পিপিএফ (নিরাপদ, ৭%), শেয়ার (ঝুঁকিপূর্ণ, ১২%) নাকি সোনা কিনবে?",
      [Language.TELUGU]: "అతను దానిని PPF (సురక్షితం, 7%), స్టాక్స్‌లో (రిస్క్, 12%) పెట్టుబడి పెట్టవచ్చు లేదా బంగారం (సాంప్రదాయం) కొనవచ్చు. అతని ఎంపిక ఏమిటి?",
      [Language.PUNJABI]: "ਉਹ ਇਸਨੂੰ PPF (ਸੁਰੱਖਿਅਤ, 7%), ਸਟਾਕ (ਜੋਖਮ ਭਰਿਆ, 12%) ਵਿੱਚ ਨਿਵੇਸ਼ ਕਰ ਸਕਦਾ ਹੈ, ਜਾਂ ਸੋਨਾ (ਰਵਾਇਤੀ) ਖਰੀਦ ਸਕਦਾ ਹੈ।"
    },
    initialStats: { cash: 50000, debt: 0, stress: 5 },
    choices: [
      {
        id: 'ppf-safe',
        label: { [Language.ENGLISH]: "Public Provident Fund (PPF)", [Language.HINDI]: "लोक भविष्य निधि (PPF)", [Language.MARATHI]: "पीपीएफ (PPF)", [Language.BENGALI]: "পিপিএফ (PPF)", [Language.TELUGU]: "PPF", [Language.PUNJABI]: "PPF" },
        keywords: ['ppf', 'government', 'safe', 'fund'],
        impact: {
          debt: 0,
          savings: -50000,
          stress: 5,
          xp: 350,
          description: { [Language.ENGLISH]: "Excellent! Compounding is the 8th wonder of the world.", [Language.HINDI]: "बहुत बढ़िया! चक्रवृद्धि ब्याज दुनिया का 8वां अजूबा है।" }
        },
        consequences: [
          { period: { [Language.ENGLISH]: "Year 10" }, amount: 100000, stress: 2, note: { [Language.ENGLISH]: "Money doubled safely. Relaxing future." } },
          { period: { [Language.ENGLISH]: "Year 20" }, amount: 250000, stress: 0, note: { [Language.ENGLISH]: "Retirement is looking very bright." } }
        ]
      },
      {
        id: 'gold-buy',
        label: { [Language.ENGLISH]: "Buy Physical Gold", [Language.HINDI]: "सोना खरीदें", [Language.MARATHI]: "सोने खरेदी करा", [Language.BENGALI]: "সোনা কেনা", [Language.TELUGU]: "బంగారం కొనండి", [Language.PUNJABI]: "ਸੋਨਾ ਖਰੀਦੋ" },
        keywords: ['gold', 'sona', 'jewelry', 'coins'],
        impact: {
          debt: 0,
          savings: -50000,
          stress: 10,
          xp: 200,
          description: { [Language.ENGLISH]: "Classic choice, stable value but hard to liquidate.", [Language.HINDI]: "क्लासिक पसंद, स्थिर मूल्य लेकिन बेचना कठिन।" }
        },
        consequences: [
          { period: { [Language.ENGLISH]: "Year 10" }, amount: 80000, stress: 15, note: { [Language.ENGLISH]: "Gold value rose, but storage is a concern." } },
          { period: { [Language.ENGLISH]: "Year 20" }, amount: 180000, stress: 10, note: { [Language.ENGLISH]: "Good hedge against inflation." } }
        ]
      },
      {
        id: 'crypto-gamble',
        label: { [Language.ENGLISH]: "High-Risk Gamble", [Language.HINDI]: "उच्च जोखिम वाला दांव", [Language.MARATHI]: "मोठी जोखिम", [Language.BENGALI]: "অত্যধিক ঝুঁকি", [Language.TELUGU]: "హై రిస్క్ గ్యాంబుల్", [Language.PUNJABI]: "ਉੱਚ ਜੋਖਮ ਵਾਲਾ ਜੂਆ" },
        keywords: ['crypto', 'stocks', 'gamble', 'quick'],
        impact: {
          debt: 0,
          savings: -50000,
          stress: 50,
          xp: 50,
          description: { [Language.ENGLISH]: "High risk! You might lose it all.", [Language.HINDI]: "उच्च जोखिम! आप सब कुछ खो सकते हैं।" }
        },
        consequences: [
          { period: { [Language.ENGLISH]: "Year 2" }, amount: 10000, stress: 80, note: { [Language.ENGLISH]: "Market crashed. 80% loss. Heartbreaking." } },
          { period: { [Language.ENGLISH]: "Year 20" }, amount: 5000, stress: 100, note: { [Language.ENGLISH]: "No retirement fund left. Forced to work at 60." } }
        ]
      }
    ]
  },
  {
    id: 'aman-credit',
    title: {
      [Language.ENGLISH]: "Aman's Credit Card Trap",
      [Language.HINDI]: "अमन का क्रेडिट कार्ड जाल",
      [Language.MARATHI]: "अमनचा क्रेडिट कार्ड ट्रॅप",
      [Language.BENGALI]: "অমনের ক্রেডিট কার্ডের ফাঁদ",
      [Language.TELUGU]: "అమన్ క్రెడిట్ కార్డ్ ట్రాప్",
      [Language.PUNJABI]: "ਅਮਨ ਦਾ ਕ੍ਰੈਡਿਟ ਕਾਰਡ ਜਾਲ"
    },
    scenario: {
      [Language.ENGLISH]: "Aman just got his first job. He wants a new smartphone costing ₹25,000.",
      [Language.HINDI]: "अमन को अभी अपनी पहली नौकरी मिली है। वह ₹25,000 की कीमत वाला एक नया स्मार्टफोन चाहता है।",
      [Language.MARATHI]: "अमनला नुकतीच त्याची पहिली नोकरी मिळाली आहे. त्याला ₹२५,००० किमतीचा नवीन स्मार्टफोन हवा आहे.",
      [Language.BENGALI]: "অমন মাত্র তার প্রথম চাকরি পেয়েছে। তিনি ₹২৫,০০০ মূল্যের একটি নতুন স্মার্টফোন চান।",
      [Language.TELUGU]: "అమన్ ఇప్పుడే తన మొదటి ఉద్యోగం పొందాడు. అతను ₹25,000 ఖరీదు చేసే కొత్త స్మార్ట్‌ఫోన్ కావాలనుకుంటున్నాడు.",
      [Language.PUNJABI]: "ਅਮਨ ਨੂੰ ਹੁਣੇ ਹੀ ਆਪਣੀ ਪਹਿਲੀ ਨੌਕਲੀ ਮਿਲੀ ਹੈ। ਉਹ ₹25,000 ਦੀ ਕੀਮਤ ਵਾਲਾ ਨਵਾਂ ਸਮਾਰਟਫੋਨ ਚਾਹੁੰਦਾ ਹੈ।"
    },
    narrative: {
      [Language.ENGLISH]: "A bank offers a credit card with 'easy' EMIs. The interest is 3% per month if he misses a payment. Or he can save for 4 months. What's the choice?",
      [Language.HINDI]: "एक बैंक 'आसान' ईएमआई के साथ क्रेडिट कार्ड प्रदान करता है। यदि वह भुगतान चूक जाता है तो ब्याज 3% प्रति माह है। या वह 4 महीने तक बचत कर सकता है।",
      [Language.MARATHI]: "एक बँक 'सुलभ' EMI सह क्रेडिट कार्ड ऑफर करते. त्याने पेमेंट चुकवल्यास व्याज दरमह्या ३% आहे. किंवा तो ४ महिने बचत करू शकतो.",
      [Language.BENGALI]: "একটি ব্যাঙ্ক 'সহজ' ইএমআই সহ একটি ক্রেডিট কার্ড অফার করে। পেমেন্ট মিস করলে সুদ প্রতি মাসে ৩%। অথবা তিনি ৪ মাস সঞ্চয় করতে পারেন।",
      [Language.TELUGU]: "ఒక బ్యాంక్ 'సులభమైన' EMIలతో క్రెడిట్ కార్డ్‌ని అందిస్తుంది. అతను చెల్లింపును కోల్పోతే వడ్డీ నెలకు 3%. లేదా అతను 4 నెలల పాటు పొదుపు చేయవచ్చు.",
      [Language.PUNJABI]: "ਇੱਕ ਬੈਂਕ 'ਆਸਾਨ' EMI ਦੇ ਨਾਲ ਇੱਕ ਕ੍ਰੈਡਿਟ ਕਾਰਡ ਦੀ ਪੇਸ਼ਕਸ਼ ਕਰਦਾ ਹੈ। ਜੇਕਰ ਉਹ ਭੁਗਤਾਨ ਖੁੰਝ ਜਾਂਦਾ ਹੈ ਤਾਂ ਵਿਆਜ 3% ਪ੍ਰਤੀ ਮਹੀਨਾ ਹੁੰਦਾ ਹੈ।"
    },
    initialStats: { cash: 5000, debt: 0, stress: 5 },
    choices: [
      {
        id: 'credit-card',
        label: { [Language.ENGLISH]: "Buy on Credit Card", [Language.HINDI]: "क्रेडिट कार्ड पर खरीदें", [Language.MARATHI]: "क्रेडिट कार्डवर खरेदी करा", [Language.BENGALI]: "ক্রেডিট কার্ডে কিনুন", [Language.TELUGU]: "క్రెడిట్ కార్డ్‌పై కొనండి", [Language.PUNJABI]: "ਕ੍ਰੈਡਿਟ ਕਾਰਡ 'ਤੇ ਖਰੀਦੋ" },
        keywords: ['card', 'credit', 'emi', 'buy', 'phone'],
        impact: {
          debt: 25000,
          savings: -5000,
          stress: 20,
          xp: 100,
          description: { [Language.ENGLISH]: "Instant gratification. But high interest if you slip!", [Language.HINDI]: "तुरंत खुशी। लेकिन अगर आप चूक गए तो उच्च ब्याज!" }
        },
        consequences: [
          { period: { [Language.ENGLISH]: "Month 1" }, amount: 25000, stress: 20, note: { [Language.ENGLISH]: "Happy with phone. EMI started." } },
          { period: { [Language.ENGLISH]: "Year 1" }, amount: 35000, stress: 80, note: { [Language.ENGLISH]: "Missed 2 payments. Interest exploded!" } }
        ]
      },
      {
        id: 'save-up',
        label: { [Language.ENGLISH]: "Save & Buy Later", [Language.HINDI]: "बचत करें और बाद में खरीदें", [Language.MARATHI]: "बचत करा आणि नंतर खरेदी करा", [Language.BENGALI]: "সঞ্চয় করুন এবং পরে কিনুন", [Language.TELUGU]: "పొదుపు చేసి తర్వాత కొనండి", [Language.PUNJABI]: "ਬਚਾਓ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਖਰੀਦੋ" },
        keywords: ['save', 'later', 'wait', 'bachat'],
        impact: {
          debt: 0,
          savings: 0,
          stress: 10,
          xp: 300,
          description: { [Language.ENGLISH]: "Discipline leads to freedom. No interest paid!", [Language.HINDI]: "अनुशासन से आजादी मिलती है। कोई ब्याज नहीं!" }
        },
        consequences: [
          { period: { [Language.ENGLISH]: "Month 4" }, amount: 0, stress: 5, note: { [Language.ENGLISH]: "Bought phone with full payment. Zero debt." } },
          { period: { [Language.ENGLISH]: "Year 1" }, amount: 0, stress: 0, note: { [Language.ENGLISH]: "Phone is yours. Financial peace." } }
        ]
      }
    ]
  }
];
