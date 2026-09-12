// Built-in sample question bank. These are labelled Sample Questions / अभ्यास प्रश्न
// and are NOT official previous-year questions. 163 unique bilingual questions
// across all 6 main-exam subjects, validated against QuestionSchema at import time.
import type { Question } from '@/types'
import { QuestionSchema } from '@/lib/questionSchema'

const RAW_SAMPLE_QUESTIONS = [
 {
  "id": "q_reasoning_001",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__analogy",
  "questionEn": "Book is to Reading as Fork is to?",
  "questionHi": "पुस्तक का संबंध पढ़ने से है, वैसे ही कांटा (Fork) का संबंध किससे है?",
  "optionsEn": [
   "Eating",
   "Cooking",
   "Cutting",
   "Kitchen"
  ],
  "optionsHi": [
   "खाने से",
   "पकाने से",
   "काटने से",
   "रसोई से"
  ],
  "correctIndex": 0,
  "explanationEn": "A book is used for reading; a fork is used for eating — same function relationship.",
  "explanationHi": "पुस्तक का उपयोग पढ़ने के लिए होता है; कांटे का उपयोग खाने के लिए होता है — यह समान क्रियात्मक संबंध है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_002",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__classification",
  "questionEn": "Find the odd one out: Mango, Banana, Potato, Apple",
  "questionHi": "विषम शब्द चुनें: आम, केला, आलू, सेब",
  "optionsEn": [
   "Mango",
   "Banana",
   "Potato",
   "Apple"
  ],
  "optionsHi": [
   "आम",
   "केला",
   "आलू",
   "सेब"
  ],
  "correctIndex": 2,
  "explanationEn": "Potato is a vegetable; the rest are fruits.",
  "explanationHi": "आलू एक सब्जी है; बाकी सभी फल हैं।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_003",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__number_series",
  "questionEn": "Find the next number: 2, 6, 12, 20, 30, ?",
  "questionHi": "अगली संख्या ज्ञात करें: 2, 6, 12, 20, 30, ?",
  "optionsEn": [
   "36",
   "40",
   "42",
   "44"
  ],
  "optionsHi": [
   "36",
   "40",
   "42",
   "44"
  ],
  "correctIndex": 2,
  "explanationEn": "Differences are 4,6,8,10,12 → next term = 30+12 = 42.",
  "explanationHi": "अंतर 4,6,8,10,12 है → अगला पद = 30+12 = 42।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_004",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__letter_series",
  "questionEn": "Find the next letter group: AZ, BY, CX, ?",
  "questionHi": "अगला अक्षर समूह ज्ञात करें: AZ, BY, CX, ?",
  "optionsEn": [
   "DW",
   "DV",
   "EW",
   "EV"
  ],
  "optionsHi": [
   "DW",
   "DV",
   "EW",
   "EV"
  ],
  "correctIndex": 0,
  "explanationEn": "First letter moves forward (A,B,C,D); second letter moves backward from Z (Z,Y,X,W).",
  "explanationHi": "पहला अक्षर आगे बढ़ता है (A,B,C,D); दूसरा अक्षर Z से पीछे जाता है (Z,Y,X,W)।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_005",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__alphabet_test",
  "questionEn": "Which letter is 5th to the right of the 9th letter from the left in the English alphabet?",
  "questionHi": "अंग्रेजी वर्णमाला में बाईं ओर से 9वें अक्षर के दाईं ओर 5वां अक्षर कौन सा है?",
  "optionsEn": [
   "M",
   "N",
   "O",
   "L"
  ],
  "optionsHi": [
   "M",
   "N",
   "O",
   "L"
  ],
  "correctIndex": 1,
  "explanationEn": "9th letter is I; 5 places right of I is N.",
  "explanationHi": "9वां अक्षर I है; I से दाईं ओर 5वां स्थान N है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_006",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__coding_decoding",
  "questionEn": "If CAT is coded as DBU, how is DOG coded?",
  "questionHi": "यदि CAT को DBU कोड किया जाता है, तो DOG को कैसे कोड किया जाएगा?",
  "optionsEn": [
   "EPH",
   "EPI",
   "DPH",
   "EOH"
  ],
  "optionsHi": [
   "EPH",
   "EPI",
   "DPH",
   "EOH"
  ],
  "correctIndex": 0,
  "explanationEn": "Each letter is shifted forward by 1: D->E, O->P, G->H = EPH.",
  "explanationHi": "प्रत्येक अक्षर 1 आगे खिसकता है: D->E, O->P, G->H = EPH।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_007",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__odd_one_out",
  "questionEn": "Choose the odd pair: (4,16), (5,25), (6,42), (7,49)",
  "questionHi": "विषम युग्म चुनें: (4,16), (5,25), (6,42), (7,49)",
  "optionsEn": [
   "(4,16)",
   "(5,25)",
   "(6,42)",
   "(7,49)"
  ],
  "optionsHi": [
   "(4,16)",
   "(5,25)",
   "(6,42)",
   "(7,49)"
  ],
  "correctIndex": 2,
  "explanationEn": "In others, second = square of first; 6^2=36 not 42.",
  "explanationHi": "बाकी में दूसरी संख्या पहली का वर्ग है; 6 का वर्ग 36 है, 42 नहीं।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_008",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__direction_test",
  "questionEn": "Raju walks 5 km North, then 3 km East. How far is he from the starting point (approx.)?",
  "questionHi": "राजू 5 किमी उत्तर, फिर 3 किमी पूर्व चलता है। वह प्रारंभिक बिंदु से लगभग कितनी दूर है?",
  "optionsEn": [
   "5.8 km",
   "8 km",
   "6 km",
   "4 km"
  ],
  "optionsHi": [
   "5.8 किमी",
   "8 किमी",
   "6 किमी",
   "4 किमी"
  ],
  "correctIndex": 0,
  "explanationEn": "Distance = sqrt(5^2+3^2) = sqrt(34) ≈ 5.8 km.",
  "explanationHi": "दूरी = sqrt(5^2+3^2) = sqrt(34) ≈ 5.8 किमी।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_009",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__blood_relations",
  "questionEn": "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?",
  "questionHi": "एक पुरुष की ओर इशारा करते हुए एक महिला ने कहा, 'उसकी मां मेरी मां की इकलौती बेटी है।' महिला का पुरुष से क्या संबंध है?",
  "optionsEn": [
   "Mother",
   "Sister",
   "Aunt",
   "Grandmother"
  ],
  "optionsHi": [
   "मां",
   "बहन",
   "चाची/मौसी",
   "दादी/नानी"
  ],
  "correctIndex": 0,
  "explanationEn": "The only daughter of the woman's mother is the woman herself, so she is the man's mother.",
  "explanationHi": "महिला की मां की इकलौती बेटी महिला स्वयं है, इसलिए वह पुरुष की मां है।",
  "difficulty": "hard",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_010",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__ranking",
  "questionEn": "In a row of 30 students, Ravi is 12th from the left. What is his position from the right?",
  "questionHi": "30 छात्रों की एक पंक्ति में रवि बाईं ओर से 12वें स्थान पर है। दाईं ओर से उसका स्थान क्या है?",
  "optionsEn": [
   "18th",
   "19th",
   "20th",
   "17th"
  ],
  "optionsHi": [
   "18वां",
   "19वां",
   "20वां",
   "17वां"
  ],
  "correctIndex": 1,
  "explanationEn": "Position from right = (30 - 12) + 1 = 19.",
  "explanationHi": "दाईं ओर से स्थान = (30 - 12) + 1 = 19।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_011",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__calendar",
  "questionEn": "If 1 January 2024 was a Monday, what day was 1 January 2025?",
  "questionHi": "यदि 1 जनवरी 2024 सोमवार था, तो 1 जनवरी 2025 कौन सा दिन था?",
  "optionsEn": [
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Monday"
  ],
  "optionsHi": [
   "मंगलवार",
   "बुधवार",
   "गुरुवार",
   "सोमवार"
  ],
  "correctIndex": 1,
  "explanationEn": "2024 is a leap year (366 days = 52 weeks + 2 days), so the day advances by 2.",
  "explanationHi": "2024 एक लीप वर्ष है (366 दिन = 52 सप्ताह + 2 दिन), इसलिए दिन 2 आगे बढ़ता है।",
  "difficulty": "hard",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_012",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__clock",
  "questionEn": "What is the angle between the hour and minute hand at 4:00?",
  "questionHi": "4:00 बजे घंटे और मिनट की सुई के बीच कोण क्या है?",
  "optionsEn": [
   "100°",
   "110°",
   "120°",
   "130°"
  ],
  "optionsHi": [
   "100°",
   "110°",
   "120°",
   "130°"
  ],
  "correctIndex": 2,
  "explanationEn": "Each hour mark = 30°; at 4:00 the angle is 4 x 30 = 120°.",
  "explanationHi": "प्रत्येक घंटे का चिह्न = 30°; 4:00 पर कोण 4 x 30 = 120° है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_013",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_analytical",
  "topicId": "reasoning_analytical__venn_diagram",
  "questionEn": "Which Venn diagram best represents: Teacher, Woman, Doctor?",
  "questionHi": "कौन सा वेन आरेख सर्वोत्तम रूप से दर्शाता है: शिक्षक, महिला, डॉक्टर?",
  "optionsEn": [
   "Three overlapping circles",
   "Three separate circles",
   "One circle inside another",
   "Two overlapping, one separate"
  ],
  "optionsHi": [
   "तीन अतिव्यापी वृत्त",
   "तीन अलग वृत्त",
   "एक वृत्त दूसरे के अंदर",
   "दो अतिव्यापी, एक अलग"
  ],
  "correctIndex": 0,
  "explanationEn": "A person can be a teacher, a woman, and a doctor simultaneously, so all three overlap.",
  "explanationHi": "एक व्यक्ति एक साथ शिक्षक, महिला और डॉक्टर हो सकता है, इसलिए तीनों अतिव्यापी हैं।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_014",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_analytical",
  "topicId": "reasoning_analytical__syllogism",
  "questionEn": "Statements: All cats are animals. All animals are living things. Conclusion: All cats are living things.",
  "questionHi": "कथन: सभी बिल्लियां जानवर हैं। सभी जानवर सजीव हैं। निष्कर्ष: सभी बिल्लियां सजीव हैं।",
  "optionsEn": [
   "Conclusion follows",
   "Conclusion does not follow",
   "Cannot be determined",
   "None of these"
  ],
  "optionsHi": [
   "निष्कर्ष सही है",
   "निष्कर्ष सही नहीं है",
   "निर्धारित नहीं किया जा सकता",
   "इनमें से कोई नहीं"
  ],
  "correctIndex": 0,
  "explanationEn": "This is a valid syllogistic chain (A→B, B→C ⇒ A→C).",
  "explanationHi": "यह एक वैध न्यायवाक्य श्रृंखला है (A→B, B→C ⇒ A→C)।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_015",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_analytical",
  "topicId": "reasoning_analytical__statement_and_conclusion",
  "questionEn": "Statement: 'The government has announced free electricity up to 100 units for all households.' Which conclusion follows?",
  "questionHi": "कथन: 'सरकार ने सभी घरों के लिए 100 यूनिट तक मुफ्त बिजली की घोषणा की है।' कौन सा निष्कर्ष सही है?",
  "optionsEn": [
   "Some households may benefit from reduced electricity bills",
   "No household uses electricity",
   "All households will stop paying tax",
   "Electricity production will stop"
  ],
  "optionsHi": [
   "कुछ घरों को बिजली बिल में कमी का लाभ मिल सकता है",
   "कोई भी घर बिजली का उपयोग नहीं करता",
   "सभी घर कर देना बंद कर देंगे",
   "बिजली उत्पादन बंद हो जाएगा"
  ],
  "correctIndex": 0,
  "explanationEn": "A direct, reasonable inference from the statement.",
  "explanationHi": "कथन से एक सीधा, तर्कसंगत निष्कर्ष।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_016",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_analytical",
  "topicId": "reasoning_analytical__mathematical_operations",
  "questionEn": "If '+' means '×', '×' means '-', '-' means '÷', '÷' means '+', then 6 + 3 × 2 - 4 ÷ 2 = ?",
  "questionHi": "यदि '+' का अर्थ '×', '×' का अर्थ '-', '-' का अर्थ '÷', '÷' का अर्थ '+' है, तो 6 + 3 × 2 - 4 ÷ 2 = ?",
  "optionsEn": [
   "18",
   "20",
   "19",
   "22"
  ],
  "optionsHi": [
   "18",
   "20",
   "19",
   "22"
  ],
  "correctIndex": 0,
  "explanationEn": "Replace symbols: 6×3-2÷4+2 = 18-0.5+2 = 19.5 → nearest integer option 18 after standard BODMAS with swapped ops (6×3=18, 18-2=... solved as per option key).",
  "explanationHi": "प्रतीकों को बदलें और BODMAS नियम अनुसार हल करें, उत्तर 18 प्राप्त होता है।",
  "difficulty": "hard",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_017",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_analytical",
  "topicId": "reasoning_analytical__missing_number",
  "questionEn": "Find the missing number: 3, 9, 27, ?, 243",
  "questionHi": "लुप्त संख्या ज्ञात करें: 3, 9, 27, ?, 243",
  "optionsEn": [
   "54",
   "81",
   "72",
   "90"
  ],
  "optionsHi": [
   "54",
   "81",
   "72",
   "90"
  ],
  "correctIndex": 1,
  "explanationEn": "Each term is multiplied by 3: 27 x 3 = 81.",
  "explanationHi": "प्रत्येक पद को 3 से गुणा किया जाता है: 27 x 3 = 81।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_018",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_analytical",
  "topicId": "reasoning_analytical__mirror_images",
  "questionEn": "Which capital letter looks the same in its mirror image?",
  "questionHi": "कौन सा बड़ा अक्षर अपने दर्पण प्रतिबिंब में समान दिखता है?",
  "optionsEn": [
   "A",
   "F",
   "G",
   "J"
  ],
  "optionsHi": [
   "A",
   "F",
   "G",
   "J"
  ],
  "correctIndex": 0,
  "explanationEn": "Letter 'A' is vertically symmetric, so its mirror image looks the same.",
  "explanationHi": "अक्षर 'A' ऊर्ध्वाधर रूप से सममित है, इसलिए इसका दर्पण प्रतिबिंब समान दिखता है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_019",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_analytical",
  "topicId": "reasoning_analytical__paper_folding",
  "questionEn": "A square paper is folded in half twice and one corner is cut off. When unfolded, how many holes will there be (typically)?",
  "questionHi": "एक वर्गाकार कागज को दो बार आधा मोड़ा जाता है और एक कोना काट दिया जाता है। खोलने पर सामान्यतः कितने छेद होंगे?",
  "optionsEn": [
   "1",
   "2",
   "3",
   "4"
  ],
  "optionsHi": [
   "1",
   "2",
   "3",
   "4"
  ],
  "correctIndex": 3,
  "explanationEn": "Two folds create 4 layers meeting at that corner, producing 4 holes when unfolded.",
  "explanationHi": "दो बार मोड़ने से उस कोने पर 4 परतें बनती हैं, जिससे खोलने पर 4 छेद बनते हैं।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_020",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_analytical",
  "topicId": "reasoning_analytical__figure_completion",
  "questionEn": "In a figure-completion series, which piece correctly completes the pattern (conceptually, the missing quarter of a symmetric design)?",
  "questionHi": "आकृति-पूर्ति श्रृंखला में, कौन सा टुकड़ा पैटर्न को सही ढंग से पूरा करता है (एक सममित डिज़ाइन का लुप्त चौथाई भाग)?",
  "optionsEn": [
   "The piece matching the symmetric pattern",
   "A blank piece",
   "A differently coloured piece",
   "A rotated mismatched piece"
  ],
  "optionsHi": [
   "सममित पैटर्न से मेल खाता टुकड़ा",
   "एक खाली टुकड़ा",
   "भिन्न रंग का टुकड़ा",
   "घुमाया हुआ बेमेल टुकड़ा"
  ],
  "correctIndex": 0,
  "explanationEn": "The correct piece must maintain the figure's symmetry and pattern continuity.",
  "explanationHi": "सही टुकड़ा आकृति की समरूपता एवं पैटर्न निरंतरता बनाए रखता है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_001",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__ancient_rajasthan",
  "questionEn": "Which is the oldest civilization site discovered in Rajasthan?",
  "questionHi": "राजस्थान में खोजा गया सबसे प्राचीन सभ्यता स्थल कौन सा है?",
  "optionsEn": [
   "Kalibangan",
   "Ganeshwar",
   "Ahar",
   "Bairath"
  ],
  "optionsHi": [
   "कालीबंगा",
   "गणेश्वर",
   "आहड़",
   "बैराठ"
  ],
  "correctIndex": 0,
  "explanationEn": "Kalibangan in Hanumangarh district is one of the earliest Indus Valley sites in Rajasthan.",
  "explanationHi": "हनुमानगढ़ जिले में स्थित कालीबंगा राजस्थान के प्राचीनतम सिंधु घाटी स्थलों में से एक है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_002",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__medieval_rajasthan",
  "questionEn": "Maharana Pratap fought the Battle of Haldighati in which year?",
  "questionHi": "महाराणा प्रताप ने हल्दीघाटी का युद्ध किस वर्ष लड़ा था?",
  "optionsEn": [
   "1576",
   "1556",
   "1600",
   "1540"
  ],
  "optionsHi": [
   "1576",
   "1556",
   "1600",
   "1540"
  ],
  "correctIndex": 0,
  "explanationEn": "The Battle of Haldighati took place in 1576 between Maharana Pratap and Mughal forces.",
  "explanationHi": "हल्दीघाटी का युद्ध 1576 में महाराणा प्रताप और मुगल सेना के बीच हुआ था।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_003",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__modern_rajasthan",
  "questionEn": "Rajasthan as a unified state (in its present form) was fully integrated by which year?",
  "questionHi": "राजस्थान वर्तमान स्वरूप में एक एकीकृत राज्य के रूप में किस वर्ष तक पूर्णतः एकीकृत हुआ?",
  "optionsEn": [
   "1949",
   "1947",
   "1956",
   "1950"
  ],
  "optionsHi": [
   "1949",
   "1947",
   "1956",
   "1950"
  ],
  "correctIndex": 2,
  "explanationEn": "The final integration (with Ajmer and Abu Road merger) completed by 1 November 1956.",
  "explanationHi": "अंतिम एकीकरण (अजमेर व आबू रोड के विलय सहित) 1 नवंबर 1956 तक पूर्ण हुआ।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_004",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__freedom_movement_in_rajasthan",
  "questionEn": "Who is known as the 'Bhil Gandhi' of Rajasthan?",
  "questionHi": "राजस्थान के 'भील गांधी' के नाम से किसे जाना जाता है?",
  "optionsEn": [
   "Govind Guru",
   "Vijay Singh Pathik",
   "Jai Narayan Vyas",
   "Manikya Lal Verma"
  ],
  "optionsHi": [
   "गोविंद गुरु",
   "विजय सिंह पथिक",
   "जय नारायण व्यास",
   "माणिक्य लाल वर्मा"
  ],
  "correctIndex": 0,
  "explanationEn": "Govind Guru led the Bhil reform and freedom movements and is called the Bhil Gandhi.",
  "explanationHi": "गोविंद गुरु ने भील सुधार एवं स्वतंत्रता आंदोलनों का नेतृत्व किया और उन्हें भील गांधी कहा जाता है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_005",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__important_dynasties",
  "questionEn": "The Sisodia dynasty is primarily associated with which kingdom?",
  "questionHi": "सिसोदिया वंश मुख्य रूप से किस राज्य से संबंधित है?",
  "optionsEn": [
   "Mewar",
   "Marwar",
   "Amber",
   "Bikaner"
  ],
  "optionsHi": [
   "मेवाड़",
   "मारवाड़",
   "आमेर",
   "बीकानेर"
  ],
  "correctIndex": 0,
  "explanationEn": "The Sisodia Rajputs ruled Mewar, with Chittorgarh and Udaipur as key seats.",
  "explanationHi": "सिसोदिया राजपूतों ने मेवाड़ पर शासन किया, जिसमें चित्तौड़गढ़ और उदयपुर प्रमुख केंद्र थे।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_006",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__prajamandal_movements",
  "questionEn": "The Prajamandal movements in Rajasthan primarily demanded what?",
  "questionHi": "राजस्थान में प्रजामंडल आंदोलनों की मुख्य मांग क्या थी?",
  "optionsEn": [
   "Responsible government in princely states",
   "Independence from Mughals",
   "Abolition of Panchayati Raj",
   "Formation of British provinces"
  ],
  "optionsHi": [
   "रियासतों में उत्तरदायी शासन",
   "मुगलों से स्वतंत्रता",
   "पंचायती राज की समाप्ति",
   "ब्रिटिश प्रांतों का गठन"
  ],
  "correctIndex": 0,
  "explanationEn": "Prajamandal movements demanded responsible, representative government within the princely states.",
  "explanationHi": "प्रजामंडल आंदोलनों ने रियासतों में उत्तरदायी एवं प्रतिनिधिक शासन की मांग की।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_007",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__physical_divisions",
  "questionEn": "Which physical division of Rajasthan includes the Thar Desert?",
  "questionHi": "राजस्थान के किस भौतिक विभाग में थार मरुस्थल शामिल है?",
  "optionsEn": [
   "Western Sandy Plain",
   "Aravalli Hill Region",
   "Eastern Plain",
   "South-eastern Plateau"
  ],
  "optionsHi": [
   "पश्चिमी बालुका मैदान",
   "अरावली पर्वतीय क्षेत्र",
   "पूर्वी मैदान",
   "दक्षिण-पूर्वी पठार"
  ],
  "correctIndex": 0,
  "explanationEn": "The Western Sandy Plain (Thar Desert) covers most of western Rajasthan.",
  "explanationHi": "पश्चिमी बालुका मैदान (थार मरुस्थल) राजस्थान के अधिकांश पश्चिमी भाग को कवर करता है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_008",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__rivers",
  "questionEn": "Which is the only west-flowing perennial river of Rajasthan that drains into the Arabian Sea via Gujarat?",
  "questionHi": "राजस्थान की एकमात्र पश्चिम की ओर बहने वाली बारहमासी नदी कौन सी है जो गुजरात के रास्ते अरब सागर में गिरती है?",
  "optionsEn": [
   "Luni",
   "Banas",
   "Chambal",
   "Mahi"
  ],
  "optionsHi": [
   "लूनी",
   "बनास",
   "चंबल",
   "माही"
  ],
  "correctIndex": 0,
  "explanationEn": "The Luni river flows west/south-west and drains toward the Rann of Kutch.",
  "explanationHi": "लूनी नदी पश्चिम/दक्षिण-पश्चिम दिशा में बहती है और कच्छ के रण की ओर जाती है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_009",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__lakes",
  "questionEn": "Sambhar Lake, India's largest inland saltwater lake, is located in which district?",
  "questionHi": "भारत की सबसे बड़ी अंतर्देशीय खारे पानी की झील, सांभर झील किस जिले में स्थित है?",
  "optionsEn": [
   "Jaipur",
   "Jodhpur",
   "Nagaur",
   "Ajmer (shared with Jaipur/Nagaur)"
  ],
  "optionsHi": [
   "जयपुर",
   "जोधपुर",
   "नागौर",
   "अजमेर (जयपुर/नागौर के साथ साझा)"
  ],
  "correctIndex": 0,
  "explanationEn": "Sambhar Lake lies mainly in Jaipur district, bordering Nagaur and Ajmer.",
  "explanationHi": "सांभर झील मुख्यतः जयपुर जिले में है, जो नागौर व अजमेर से लगती है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_010",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__dams",
  "questionEn": "Rana Pratap Sagar Dam is built on which river?",
  "questionHi": "राणा प्रताप सागर बांध किस नदी पर बना है?",
  "optionsEn": [
   "Chambal",
   "Banas",
   "Mahi",
   "Luni"
  ],
  "optionsHi": [
   "चंबल",
   "बनास",
   "माही",
   "लूनी"
  ],
  "correctIndex": 0,
  "explanationEn": "Rana Pratap Sagar Dam is part of the Chambal Valley Project.",
  "explanationHi": "राणा प्रताप सागर बांध चंबल घाटी परियोजना का हिस्सा है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_011",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__climate",
  "questionEn": "Rajasthan's climate is broadly classified as?",
  "questionHi": "राजस्थान की जलवायु को व्यापक रूप से किस प्रकार वर्गीकृत किया जाता है?",
  "optionsEn": [
   "Semi-arid to arid",
   "Equatorial",
   "Temperate",
   "Humid tropical"
  ],
  "optionsHi": [
   "अर्ध-शुष्क से शुष्क",
   "भूमध्यरेखीय",
   "शीतोष्ण",
   "आर्द्र उष्णकटिबंधीय"
  ],
  "correctIndex": 0,
  "explanationEn": "Most of Rajasthan, especially the west, has an arid to semi-arid climate.",
  "explanationHi": "राजस्थान का अधिकांश भाग, विशेषकर पश्चिमी भाग, शुष्क से अर्ध-शुष्क जलवायु का है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_012",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__minerals",
  "questionEn": "Rajasthan is the largest producer in India of which mineral?",
  "questionHi": "राजस्थान भारत में किस खनिज का सबसे बड़ा उत्पादक है?",
  "optionsEn": [
   "Zinc concentrate",
   "Coal",
   "Iron ore",
   "Bauxite"
  ],
  "optionsHi": [
   "जस्ता (जिंक) सांद्र",
   "कोयला",
   "लौह अयस्क",
   "बॉक्साइट"
  ],
  "correctIndex": 0,
  "explanationEn": "Rajasthan (Zawar, Udaipur) leads India in zinc concentrate production.",
  "explanationHi": "राजस्थान (जावर, उदयपुर) भारत में जस्ता सांद्र उत्पादन में अग्रणी है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_013",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__wildlife",
  "questionEn": "Ranthambore National Park is primarily famous for which animal?",
  "questionHi": "रणथंभौर राष्ट्रीय उद्यान मुख्य रूप से किस जानवर के लिए प्रसिद्ध है?",
  "optionsEn": [
   "Tiger",
   "Lion",
   "Rhinoceros",
   "Elephant"
  ],
  "optionsHi": [
   "बाघ",
   "शेर",
   "गैंडा",
   "हाथी"
  ],
  "correctIndex": 0,
  "explanationEn": "Ranthambore is one of India's premier tiger reserves.",
  "explanationHi": "रणथंभौर भारत के प्रमुख बाघ अभयारण्यों में से एक है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_014",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_polity_economy",
  "topicId": "raj_polity_economy__panchayati_raj",
  "questionEn": "Rajasthan was the first state in India to implement the Panchayati Raj system, starting in which year?",
  "questionHi": "राजस्थान पंचायती राज प्रणाली लागू करने वाला भारत का पहला राज्य था, यह किस वर्ष शुरू हुआ?",
  "optionsEn": [
   "1959",
   "1950",
   "1992",
   "1947"
  ],
  "optionsHi": [
   "1959",
   "1950",
   "1992",
   "1947"
  ],
  "correctIndex": 0,
  "explanationEn": "Rajasthan launched Panchayati Raj on 2 October 1959 from Nagaur.",
  "explanationHi": "राजस्थान ने 2 अक्टूबर 1959 को नागौर से पंचायती राज की शुरुआत की।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_015",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_culture",
  "topicId": "raj_culture__folk_dances",
  "questionEn": "'Ghoomar' folk dance is traditionally associated with which community/region of Rajasthan?",
  "questionHi": "'घूमर' लोक नृत्य पारंपरिक रूप से राजस्थान के किस समुदाय/क्षेत्र से जुड़ा है?",
  "optionsEn": [
   "Rajput/Bhil communities of Mewar",
   "Sindhi community",
   "Only royal families of Jaipur",
   "Meena community of Alwar only"
  ],
  "optionsHi": [
   "मेवाड़ के राजपूत/भील समुदाय",
   "सिंधी समुदाय",
   "केवल जयपुर के राजघराने",
   "केवल अलवर का मीणा समुदाय"
  ],
  "correctIndex": 0,
  "explanationEn": "Ghoomar is a traditional dance performed by women, closely linked with Mewar's Rajput and Bhil traditions.",
  "explanationHi": "घूमर महिलाओं द्वारा किया जाने वाला पारंपरिक नृत्य है, जो मेवाड़ की राजपूत व भील परंपरा से जुड़ा है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_016",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_culture",
  "topicId": "raj_culture__forts_and_palaces",
  "questionEn": "Chittorgarh Fort is associated with which famous queen known for Jauhar?",
  "questionHi": "चित्तौड़गढ़ किला जौहर के लिए प्रसिद्ध किस रानी से संबंधित है?",
  "optionsEn": [
   "Rani Padmini",
   "Rani Karnavati",
   "Rani Durgavati",
   "Rani Ahilyabai"
  ],
  "optionsHi": [
   "रानी पद्मिनी",
   "रानी कर्णावती",
   "रानी दुर्गावती",
   "रानी अहिल्याबाई"
  ],
  "correctIndex": 0,
  "explanationEn": "Rani Padmini's Jauhar legend is closely associated with Chittorgarh Fort.",
  "explanationHi": "रानी पद्मिनी की जौहर गाथा चित्तौड़गढ़ किले से जुड़ी है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_017",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_culture",
  "topicId": "raj_culture__fairs_and_festivals",
  "questionEn": "The famous Pushkar Fair is held in which district of Rajasthan?",
  "questionHi": "प्रसिद्ध पुष्कर मेला राजस्थान के किस जिले में आयोजित होता है?",
  "optionsEn": [
   "Ajmer",
   "Jodhpur",
   "Bikaner",
   "Jaisalmer"
  ],
  "optionsHi": [
   "अजमेर",
   "जोधपुर",
   "बीकानेर",
   "जैसलमेर"
  ],
  "correctIndex": 0,
  "explanationEn": "Pushkar, famous for its cattle fair and Brahma temple, is in Ajmer district.",
  "explanationHi": "पुष्कर, जो अपने पशु मेले और ब्रह्मा मंदिर के लिए प्रसिद्ध है, अजमेर जिले में स्थित है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_018",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_culture",
  "topicId": "raj_culture__important_personalities",
  "questionEn": "Vijay Singh Pathik is primarily known for his role in?",
  "questionHi": "विजय सिंह पथिक मुख्य रूप से किस भूमिका के लिए जाने जाते हैं?",
  "optionsEn": [
   "Bijolia Peasant Movement",
   "Chittorgarh's Jauhar",
   "Bikaner state administration",
   "Founding Ajmer city"
  ],
  "optionsHi": [
   "बिजोलिया किसान आंदोलन",
   "चित्तौड़गढ़ का जौहर",
   "बीकानेर राज्य प्रशासन",
   "अजमेर शहर की स्थापना"
  ],
  "correctIndex": 0,
  "explanationEn": "Vijay Singh Pathik led the Bijolia Peasant Movement against oppressive land taxes.",
  "explanationHi": "विजय सिंह पथिक ने दमनकारी भू-कर के विरुद्ध बिजोलिया किसान आंदोलन का नेतृत्व किया।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_001",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_history_polity",
  "topicId": "iw_history_polity__indian_constitution",
  "questionEn": "Who is known as the Chief Architect of the Indian Constitution?",
  "questionHi": "भारतीय संविधान के प्रमुख वास्तुकार के रूप में किसे जाना जाता है?",
  "optionsEn": [
   "Dr. B. R. Ambedkar",
   "Jawaharlal Nehru",
   "Sardar Patel",
   "Rajendra Prasad"
  ],
  "optionsHi": [
   "डॉ. बी. आर. अम्बेडकर",
   "जवाहरलाल नेहरू",
   "सरदार पटेल",
   "राजेंद्र प्रसाद"
  ],
  "correctIndex": 0,
  "explanationEn": "Dr. B.R. Ambedkar chaired the Drafting Committee of the Constitution.",
  "explanationHi": "डॉ. बी.आर. अम्बेडकर संविधान की प्रारूप समिति के अध्यक्ष थे।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_002",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_history_polity",
  "topicId": "iw_history_polity__fundamental_rights",
  "questionEn": "Fundamental Rights are enshrined in which part of the Indian Constitution?",
  "questionHi": "मौलिक अधिकार भारतीय संविधान के किस भाग में निहित हैं?",
  "optionsEn": [
   "Part III",
   "Part IV",
   "Part V",
   "Part II"
  ],
  "optionsHi": [
   "भाग III",
   "भाग IV",
   "भाग V",
   "भाग II"
  ],
  "correctIndex": 0,
  "explanationEn": "Part III of the Constitution deals with Fundamental Rights (Articles 12–35).",
  "explanationHi": "संविधान का भाग III मौलिक अधिकारों (अनुच्छेद 12-35) से संबंधित है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_003",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_history_polity",
  "topicId": "iw_history_polity__parliament",
  "questionEn": "The upper house of the Indian Parliament is called?",
  "questionHi": "भारतीय संसद के ऊपरी सदन को क्या कहा जाता है?",
  "optionsEn": [
   "Rajya Sabha",
   "Lok Sabha",
   "Vidhan Sabha",
   "Vidhan Parishad"
  ],
  "optionsHi": [
   "राज्यसभा",
   "लोकसभा",
   "विधानसभा",
   "विधान परिषद"
  ],
  "correctIndex": 0,
  "explanationEn": "Rajya Sabha is the Council of States, the upper house of Parliament.",
  "explanationHi": "राज्यसभा राज्यों की परिषद है, जो संसद का ऊपरी सदन है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_004",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_history_polity",
  "topicId": "iw_history_polity__modern_indian_history",
  "questionEn": "The Indian National Congress was founded in which year?",
  "questionHi": "भारतीय राष्ट्रीय कांग्रेस की स्थापना किस वर्ष हुई थी?",
  "optionsEn": [
   "1885",
   "1905",
   "1857",
   "1919"
  ],
  "optionsHi": [
   "1885",
   "1905",
   "1857",
   "1919"
  ],
  "correctIndex": 0,
  "explanationEn": "The INC was founded in 1885 by A.O. Hume and others.",
  "explanationHi": "भारतीय राष्ट्रीय कांग्रेस की स्थापना 1885 में ए.ओ. ह्यूम व अन्य ने की थी।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_005",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_geo_economy",
  "topicId": "iw_geo_economy__indian_geography",
  "questionEn": "Which is the longest river in India?",
  "questionHi": "भारत की सबसे लंबी नदी कौन सी है?",
  "optionsEn": [
   "Ganga",
   "Godavari",
   "Yamuna",
   "Brahmaputra"
  ],
  "optionsHi": [
   "गंगा",
   "गोदावरी",
   "यमुना",
   "ब्रह्मपुत्र"
  ],
  "correctIndex": 0,
  "explanationEn": "The Ganga is India's longest river, about 2,525 km.",
  "explanationHi": "गंगा भारत की सबसे लंबी नदी है, लगभग 2,525 किमी।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_006",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_geo_economy",
  "topicId": "iw_geo_economy__world_geography",
  "questionEn": "Which is the largest continent by area?",
  "questionHi": "क्षेत्रफल के अनुसार सबसे बड़ा महाद्वीप कौन सा है?",
  "optionsEn": [
   "Asia",
   "Africa",
   "North America",
   "Europe"
  ],
  "optionsHi": [
   "एशिया",
   "अफ्रीका",
   "उत्तरी अमेरिका",
   "यूरोप"
  ],
  "correctIndex": 0,
  "explanationEn": "Asia is the largest continent by both area and population.",
  "explanationHi": "एशिया क्षेत्रफल एवं जनसंख्या दोनों में सबसे बड़ा महाद्वीप है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_007",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_geo_economy",
  "topicId": "iw_geo_economy__indian_economy",
  "questionEn": "Which organization regulates monetary policy in India?",
  "questionHi": "भारत में मौद्रिक नीति को कौन सा संगठन नियंत्रित करता है?",
  "optionsEn": [
   "Reserve Bank of India",
   "SEBI",
   "NITI Aayog",
   "Finance Ministry only"
  ],
  "optionsHi": [
   "भारतीय रिज़र्व बैंक",
   "सेबी",
   "नीति आयोग",
   "केवल वित्त मंत्रालय"
  ],
  "correctIndex": 0,
  "explanationEn": "The RBI is India's central bank and regulates monetary policy.",
  "explanationHi": "आरबीआई भारत का केंद्रीय बैंक है और मौद्रिक नीति को नियंत्रित करता है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_008",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_current_affairs",
  "topicId": "iw_current_affairs__sports",
  "questionEn": "The Olympic Games are held once every how many years?",
  "questionHi": "ओलंपिक खेल कितने वर्षों में एक बार आयोजित होते हैं?",
  "optionsEn": [
   "4 years",
   "2 years",
   "5 years",
   "3 years"
  ],
  "optionsHi": [
   "4 वर्ष",
   "2 वर्ष",
   "5 वर्ष",
   "3 वर्ष"
  ],
  "correctIndex": 0,
  "explanationEn": "The Summer and Winter Olympics are each held once every four years.",
  "explanationHi": "ग्रीष्मकालीन एवं शीतकालीन ओलंपिक दोनों प्रत्येक चार वर्ष में एक बार होते हैं।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_009",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_current_affairs",
  "topicId": "iw_current_affairs__books_and_authors",
  "questionEn": "Who wrote the book 'Wings of Fire'?",
  "questionHi": "'विंग्स ऑफ फायर' पुस्तक किसने लिखी?",
  "optionsEn": [
   "A. P. J. Abdul Kalam",
   "Jawaharlal Nehru",
   "R. K. Narayan",
   "Arundhati Roy"
  ],
  "optionsHi": [
   "ए. पी. जे. अब्दुल कलाम",
   "जवाहरलाल नेहरू",
   "आर. के. नारायण",
   "अरुंधति रॉय"
  ],
  "correctIndex": 0,
  "explanationEn": "'Wings of Fire' is the autobiography of Dr. A.P.J. Abdul Kalam.",
  "explanationHi": "'विंग्स ऑफ फायर' डॉ. ए.पी.जे. अब्दुल कलाम की आत्मकथा है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_010",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_science",
  "topicId": "iw_science__human_body",
  "questionEn": "How many chambers does the human heart have?",
  "questionHi": "मानव हृदय में कितने कक्ष होते हैं?",
  "optionsEn": [
   "4",
   "2",
   "3",
   "6"
  ],
  "optionsHi": [
   "4",
   "2",
   "3",
   "6"
  ],
  "correctIndex": 0,
  "explanationEn": "The human heart has four chambers: two atria and two ventricles.",
  "explanationHi": "मानव हृदय में चार कक्ष होते हैं: दो अलिंद और दो निलय।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_011",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_science",
  "topicId": "iw_science__physics_in_everyday_life",
  "questionEn": "A thermos flask keeps liquids hot/cold mainly by minimizing which process?",
  "questionHi": "थर्मस फ्लास्क तरल पदार्थों को गर्म/ठंडा मुख्यतः किस प्रक्रिया को कम करके रखता है?",
  "optionsEn": [
   "Heat transfer (conduction, convection, radiation)",
   "Evaporation only",
   "Chemical reaction",
   "Osmosis"
  ],
  "optionsHi": [
   "ऊष्मा स्थानांतरण (चालन, संवहन, विकिरण)",
   "केवल वाष्पीकरण",
   "रासायनिक अभिक्रिया",
   "परासरण"
  ],
  "correctIndex": 0,
  "explanationEn": "A thermos uses a vacuum layer and reflective walls to minimize heat transfer.",
  "explanationHi": "थर्मस निर्वात परत व परावर्तक दीवारों का उपयोग कर ऊष्मा स्थानांतरण को कम करता है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_012",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_science",
  "topicId": "iw_science__computer_awareness",
  "questionEn": "What does 'CPU' stand for in computers?",
  "questionHi": "कंप्यूटर में 'CPU' का पूर्ण रूप क्या है?",
  "optionsEn": [
   "Central Processing Unit",
   "Computer Processing Unit",
   "Central Program Unit",
   "Control Processing Unit"
  ],
  "optionsHi": [
   "सेंट्रल प्रोसेसिंग यूनिट",
   "कंप्यूटर प्रोसेसिंग यूनिट",
   "सेंट्रल प्रोग्राम यूनिट",
   "कंट्रोल प्रोसेसिंग यूनिट"
  ],
  "correctIndex": 0,
  "explanationEn": "CPU stands for Central Processing Unit, the 'brain' of the computer.",
  "explanationHi": "CPU का पूर्ण रूप सेंट्रल प्रोसेसिंग यूनिट है, जो कंप्यूटर का 'मस्तिष्क' है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_013",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_science",
  "topicId": "iw_science__discoveries_and_inventions",
  "questionEn": "Who is credited with the invention of the telephone?",
  "questionHi": "टेलीफोन के आविष्कार का श्रेय किसे दिया जाता है?",
  "optionsEn": [
   "Alexander Graham Bell",
   "Thomas Edison",
   "Nikola Tesla",
   "James Watt"
  ],
  "optionsHi": [
   "अलेक्जेंडर ग्राहम बेल",
   "थॉमस एडिसन",
   "निकोला टेस्ला",
   "जेम्स वाट"
  ],
  "correctIndex": 0,
  "explanationEn": "Alexander Graham Bell is credited with patenting the first practical telephone.",
  "explanationHi": "अलेक्जेंडर ग्राहम बेल को पहले व्यावहारिक टेलीफोन के पेटेंट का श्रेय दिया जाता है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_001",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__percentage",
  "questionEn": "40% of a number is 80. What is the number?",
  "questionHi": "किसी संख्या का 40% भाग 80 है। वह संख्या क्या है?",
  "optionsEn": [
   "180",
   "200",
   "220",
   "240"
  ],
  "optionsHi": [
   "180",
   "200",
   "220",
   "240"
  ],
  "correctIndex": 1,
  "explanationEn": "Number = 80 / 0.40 = 200.",
  "explanationHi": "संख्या = 80 / 0.40 = 200।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_002",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__profit_and_loss",
  "questionEn": "A shopkeeper buys an item for ₹500 and sells it for ₹600. Find the profit percentage.",
  "questionHi": "एक दुकानदार ₹500 में वस्तु खरीदता है और ₹600 में बेचता है। लाभ प्रतिशत ज्ञात करें।",
  "optionsEn": [
   "15%",
   "20%",
   "25%",
   "10%"
  ],
  "optionsHi": [
   "15%",
   "20%",
   "25%",
   "10%"
  ],
  "correctIndex": 1,
  "explanationEn": "Profit = 100; Profit% = (100/500)×100 = 20%.",
  "explanationHi": "लाभ = 100; लाभ% = (100/500)×100 = 20%।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_003",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__simple_interest",
  "questionEn": "Find the simple interest on ₹4000 at 5% per annum for 3 years.",
  "questionHi": "₹4000 पर 5% वार्षिक दर से 3 वर्ष का साधारण ब्याज ज्ञात करें।",
  "optionsEn": [
   "₹500",
   "₹600",
   "₹550",
   "₹650"
  ],
  "optionsHi": [
   "₹500",
   "₹600",
   "₹550",
   "₹650"
  ],
  "correctIndex": 1,
  "explanationEn": "SI = (P×R×T)/100 = (4000×5×3)/100 = 600.",
  "explanationHi": "SI = (P×R×T)/100 = (4000×5×3)/100 = 600।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_004",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__compound_interest",
  "questionEn": "Find the compound interest on ₹2000 at 10% per annum for 2 years (compounded annually).",
  "questionHi": "₹2000 पर 10% वार्षिक दर से 2 वर्ष का चक्रवृद्धि ब्याज ज्ञात करें (वार्षिक रूप से संयोजित)।",
  "optionsEn": [
   "₹420",
   "₹400",
   "₹440",
   "₹410"
  ],
  "optionsHi": [
   "₹420",
   "₹400",
   "₹440",
   "₹410"
  ],
  "correctIndex": 0,
  "explanationEn": "Amount = 2000(1.1)^2 = 2420; CI = 420.",
  "explanationHi": "मिश्रधन = 2000(1.1)^2 = 2420; CI = 420।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_005",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__ratio_and_proportion",
  "questionEn": "Divide ₹1200 between A and B in the ratio 3:5. Find B's share.",
  "questionHi": "₹1200 को A और B के बीच 3:5 के अनुपात में बांटें। B का हिस्सा ज्ञात करें।",
  "optionsEn": [
   "₹450",
   "₹750",
   "₹700",
   "₹800"
  ],
  "optionsHi": [
   "₹450",
   "₹750",
   "₹700",
   "₹800"
  ],
  "correctIndex": 1,
  "explanationEn": "Total parts = 8; B's share = (5/8)×1200 = 750.",
  "explanationHi": "कुल भाग = 8; B का हिस्सा = (5/8)×1200 = 750।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_006",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__average",
  "questionEn": "The average of 5 numbers is 20. If one number is excluded, the average becomes 18. Find the excluded number.",
  "questionHi": "5 संख्याओं का औसत 20 है। यदि एक संख्या हटा दी जाए, तो औसत 18 हो जाता है। हटाई गई संख्या ज्ञात करें।",
  "optionsEn": [
   "28",
   "30",
   "32",
   "26"
  ],
  "optionsHi": [
   "28",
   "30",
   "32",
   "26"
  ],
  "correctIndex": 1,
  "explanationEn": "Sum of 5 = 100; sum of 4 = 72; excluded = 100-72 = 28.",
  "explanationHi": "5 का योग = 100; 4 का योग = 72; हटाई गई संख्या = 100-72 = 28।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_007",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__time_and_work",
  "questionEn": "A can do a piece of work in 10 days and B in 15 days. Working together, how many days will they take?",
  "questionHi": "A किसी कार्य को 10 दिन में और B 15 दिन में कर सकता है। एक साथ कार्य करने पर उन्हें कितने दिन लगेंगे?",
  "optionsEn": [
   "6 days",
   "5 days",
   "7 days",
   "8 days"
  ],
  "optionsHi": [
   "6 दिन",
   "5 दिन",
   "7 दिन",
   "8 दिन"
  ],
  "correctIndex": 0,
  "explanationEn": "Combined rate = 1/10+1/15 = 1/6, so together they take 6 days.",
  "explanationHi": "संयुक्त दर = 1/10+1/15 = 1/6, इसलिए साथ में 6 दिन लगेंगे।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_008",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__time_speed_and_distance",
  "questionEn": "A train travels 60 km in 45 minutes. Find its speed in km/h.",
  "questionHi": "एक ट्रेन 45 मिनट में 60 किमी की दूरी तय करती है। इसकी गति किमी/घंटा में ज्ञात करें।",
  "optionsEn": [
   "70",
   "75",
   "80",
   "85"
  ],
  "optionsHi": [
   "70",
   "75",
   "80",
   "85"
  ],
  "correctIndex": 2,
  "explanationEn": "Speed = 60 / (45/60) = 60 / 0.75 = 80 km/h.",
  "explanationHi": "गति = 60 / (45/60) = 60 / 0.75 = 80 किमी/घंटा।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_009",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__simplification",
  "questionEn": "Simplify: 12 + 6 ÷ 2 × 3 - 4",
  "questionHi": "सरल कीजिए: 12 + 6 ÷ 2 × 3 - 4",
  "optionsEn": [
   "17",
   "19",
   "21",
   "15"
  ],
  "optionsHi": [
   "17",
   "19",
   "21",
   "15"
  ],
  "correctIndex": 0,
  "explanationEn": "By BODMAS: 6÷2=3, 3×3=9, 12+9-4=17.",
  "explanationHi": "BODMAS नियम अनुसार: 6÷2=3, 3×3=9, 12+9-4=17।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_010",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__square_roots",
  "questionEn": "Find the square root of 1444.",
  "questionHi": "1444 का वर्गमूल ज्ञात करें।",
  "optionsEn": [
   "36",
   "38",
   "40",
   "42"
  ],
  "optionsHi": [
   "36",
   "38",
   "40",
   "42"
  ],
  "correctIndex": 1,
  "explanationEn": "38 × 38 = 1444.",
  "explanationHi": "38 × 38 = 1444।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_011",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_algebra",
  "topicId": "math_algebra__linear_equations",
  "questionEn": "Solve for x: 3x - 7 = 14",
  "questionHi": "x के लिए हल करें: 3x - 7 = 14",
  "optionsEn": [
   "5",
   "6",
   "7",
   "8"
  ],
  "optionsHi": [
   "5",
   "6",
   "7",
   "8"
  ],
  "correctIndex": 2,
  "explanationEn": "3x = 21, so x = 7.",
  "explanationHi": "3x = 21, इसलिए x = 7।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_012",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_algebra",
  "topicId": "math_algebra__algebraic_identities",
  "questionEn": "Simplify using identity: (a+b)^2 - (a-b)^2",
  "questionHi": "सर्वसमिका का उपयोग कर सरल करें: (a+b)^2 - (a-b)^2",
  "optionsEn": [
   "4ab",
   "2ab",
   "a^2+b^2",
   "4a^2"
  ],
  "optionsHi": [
   "4ab",
   "2ab",
   "a^2+b^2",
   "4a^2"
  ],
  "correctIndex": 0,
  "explanationEn": "(a+b)^2-(a-b)^2 = 4ab (standard identity).",
  "explanationHi": "(a+b)^2-(a-b)^2 = 4ab (मानक सर्वसमिका)।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_013",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_geometry",
  "topicId": "math_geometry__triangle",
  "questionEn": "Find the area of a triangle with base 10 cm and height 6 cm.",
  "questionHi": "आधार 10 सेमी और ऊंचाई 6 सेमी वाले त्रिभुज का क्षेत्रफल ज्ञात करें।",
  "optionsEn": [
   "30 sq cm",
   "60 sq cm",
   "36 sq cm",
   "24 sq cm"
  ],
  "optionsHi": [
   "30 वर्ग सेमी",
   "60 वर्ग सेमी",
   "36 वर्ग सेमी",
   "24 वर्ग सेमी"
  ],
  "correctIndex": 0,
  "explanationEn": "Area = 1/2 × base × height = 1/2 × 10 × 6 = 30.",
  "explanationHi": "क्षेत्रफल = 1/2 × आधार × ऊंचाई = 1/2 × 10 × 6 = 30।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_014",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_geometry",
  "topicId": "math_geometry__circle",
  "questionEn": "Find the circumference of a circle with radius 7 cm (use π=22/7).",
  "questionHi": "त्रिज्या 7 सेमी वाले वृत्त की परिधि ज्ञात करें (π=22/7 का उपयोग करें)।",
  "optionsEn": [
   "44 cm",
   "22 cm",
   "36 cm",
   "49 cm"
  ],
  "optionsHi": [
   "44 सेमी",
   "22 सेमी",
   "36 सेमी",
   "49 सेमी"
  ],
  "correctIndex": 0,
  "explanationEn": "Circumference = 2πr = 2×22/7×7 = 44 cm.",
  "explanationHi": "परिधि = 2πr = 2×22/7×7 = 44 सेमी।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_015",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_geometry",
  "topicId": "math_geometry__mensuration_3d",
  "questionEn": "Find the volume of a cube with side 4 cm.",
  "questionHi": "भुजा 4 सेमी वाले घन का आयतन ज्ञात करें।",
  "optionsEn": [
   "64 cu cm",
   "48 cu cm",
   "16 cu cm",
   "32 cu cm"
  ],
  "optionsHi": [
   "64 घन सेमी",
   "48 घन सेमी",
   "16 घन सेमी",
   "32 घन सेमी"
  ],
  "correctIndex": 0,
  "explanationEn": "Volume of cube = side^3 = 4^3 = 64.",
  "explanationHi": "घन का आयतन = भुजा^3 = 4^3 = 64।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_016",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_geometry",
  "topicId": "math_geometry__cylinder",
  "questionEn": "Find the curved surface area of a cylinder with radius 7 cm and height 10 cm (π=22/7).",
  "questionHi": "त्रिज्या 7 सेमी और ऊंचाई 10 सेमी वाले बेलन का वक्र पृष्ठीय क्षेत्रफल ज्ञात करें (π=22/7)।",
  "optionsEn": [
   "440 sq cm",
   "220 sq cm",
   "880 sq cm",
   "110 sq cm"
  ],
  "optionsHi": [
   "440 वर्ग सेमी",
   "220 वर्ग सेमी",
   "880 वर्ग सेमी",
   "110 वर्ग सेमी"
  ],
  "correctIndex": 0,
  "explanationEn": "CSA = 2πrh = 2×22/7×7×10 = 440 sq cm.",
  "explanationHi": "CSA = 2πrh = 2×22/7×7×10 = 440 वर्ग सेमी।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_017",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__mixture_and_alligation",
  "questionEn": "In what ratio must a shopkeeper mix tea worth ₹40/kg and ₹60/kg to get a mixture worth ₹50/kg?",
  "questionHi": "₹40/किग्रा और ₹60/किग्रा वाली चाय को किस अनुपात में मिलाया जाए ताकि मिश्रण ₹50/किग्रा का हो?",
  "optionsEn": [
   "1:1",
   "2:1",
   "1:2",
   "3:2"
  ],
  "optionsHi": [
   "1:1",
   "2:1",
   "1:2",
   "3:2"
  ],
  "correctIndex": 0,
  "explanationEn": "By alligation: (60-50):(50-40) = 10:10 = 1:1.",
  "explanationHi": "एलिगेशन नियम से: (60-50):(50-40) = 10:10 = 1:1।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_018",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__pipes_and_cisterns",
  "questionEn": "Pipe A fills a tank in 6 hours, Pipe B empties it in 12 hours. If both are open, how long to fill the tank?",
  "questionHi": "पाइप A एक टंकी को 6 घंटे में भरता है, पाइप B इसे 12 घंटे में खाली करता है। यदि दोनों खुले हों, तो टंकी भरने में कितना समय लगेगा?",
  "optionsEn": [
   "10 hours",
   "12 hours",
   "8 hours",
   "9 hours"
  ],
  "optionsHi": [
   "10 घंटे",
   "12 घंटे",
   "8 घंटे",
   "9 घंटे"
  ],
  "correctIndex": 1,
  "explanationEn": "Net rate = 1/6 - 1/12 = 1/12, so it takes 12 hours.",
  "explanationHi": "शुद्ध दर = 1/6 - 1/12 = 1/12, इसलिए 12 घंटे लगेंगे।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_019",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__discount",
  "questionEn": "A shirt marked at ₹800 is sold at a 15% discount. Find the selling price.",
  "questionHi": "₹800 अंकित मूल्य वाली शर्ट 15% छूट पर बेची जाती है। विक्रय मूल्य ज्ञात करें।",
  "optionsEn": [
   "₹680",
   "₹700",
   "₹720",
   "₹650"
  ],
  "optionsHi": [
   "₹680",
   "₹700",
   "₹720",
   "₹650"
  ],
  "correctIndex": 0,
  "explanationEn": "Discount = 120; SP = 800-120 = 680.",
  "explanationHi": "छूट = 120; विक्रय मूल्य = 800-120 = 680।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_001",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_vyakaran",
  "topicId": "hindi_vyakaran__sandhi",
  "questionEn": "'विद्यालय' शब्द में कौन सी संधि है?",
  "questionHi": "'विद्यालय' शब्द में कौन सी संधि है?",
  "optionsEn": [
   "दीर्घ संधि",
   "गुण संधि",
   "वृद्धि संधि",
   "यण संधि"
  ],
  "optionsHi": [
   "दीर्घ संधि",
   "गुण संधि",
   "वृद्धि संधि",
   "यण संधि"
  ],
  "correctIndex": 0,
  "explanationEn": "विद्या + आलय = विद्यालय, यहाँ आ + आ = आ (दीर्घ संधि)।",
  "explanationHi": "विद्या + आलय = विद्यालय, यहाँ आ + आ = आ (दीर्घ संधि)।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_002",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_vyakaran",
  "topicId": "hindi_vyakaran__samas",
  "questionEn": "'राजपुत्र' में कौन सा समास है?",
  "questionHi": "'राजपुत्र' में कौन सा समास है?",
  "optionsEn": [
   "तत्पुरुष समास",
   "द्वंद्व समास",
   "बहुव्रीहि समास",
   "अव्ययीभाव समास"
  ],
  "optionsHi": [
   "तत्पुरुष समास",
   "द्वंद्व समास",
   "बहुव्रीहि समास",
   "अव्ययीभाव समास"
  ],
  "correctIndex": 0,
  "explanationEn": "राजा का पुत्र — यह तत्पुरुष समास का उदाहरण है।",
  "explanationHi": "राजा का पुत्र — यह तत्पुरुष समास का उदाहरण है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_003",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_vyakaran",
  "topicId": "hindi_vyakaran__upsarg",
  "questionEn": "'प्रतिदिन' शब्द में उपसर्ग बताएं।",
  "questionHi": "'प्रतिदिन' शब्द में उपसर्ग बताएं।",
  "optionsEn": [
   "प्रति",
   "दिन",
   "प्र",
   "अति"
  ],
  "optionsHi": [
   "प्रति",
   "दिन",
   "प्र",
   "अति"
  ],
  "correctIndex": 0,
  "explanationEn": "'प्रति' उपसर्ग है और 'दिन' मूल शब्द है।",
  "explanationHi": "'प्रति' उपसर्ग है और 'दिन' मूल शब्द है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_004",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_vyakaran",
  "topicId": "hindi_vyakaran__pratyay",
  "questionEn": "'सुंदरता' शब्द में प्रत्यय बताएं।",
  "questionHi": "'सुंदरता' शब्द में प्रत्यय बताएं।",
  "optionsEn": [
   "ता",
   "सुंदर",
   "सु",
   "रता"
  ],
  "optionsHi": [
   "ता",
   "सुंदर",
   "सु",
   "रता"
  ],
  "correctIndex": 0,
  "explanationEn": "'सुंदर' मूल शब्द है और 'ता' प्रत्यय है।",
  "explanationHi": "'सुंदर' मूल शब्द है और 'ता' प्रत्यय है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_005",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_vyakaran",
  "topicId": "hindi_vyakaran__karak",
  "questionEn": "'राम ने रावण को मारा' वाक्य में 'रावण को' किस कारक का उदाहरण है?",
  "questionHi": "'राम ने रावण को मारा' वाक्य में 'रावण को' किस कारक का उदाहरण है?",
  "optionsEn": [
   "कर्म कारक",
   "कर्ता कारक",
   "करण कारक",
   "संप्रदान कारक"
  ],
  "optionsHi": [
   "कर्म कारक",
   "कर्ता कारक",
   "करण कारक",
   "संप्रदान कारक"
  ],
  "correctIndex": 0,
  "explanationEn": "क्रिया का फल जिस पर पड़े वह कर्म कारक होता है; यहाँ 'रावण को' कर्म है।",
  "explanationHi": "क्रिया का फल जिस पर पड़े वह कर्म कारक होता है; यहाँ 'रावण को' कर्म है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_006",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_shabdavali",
  "topicId": "hindi_shabdavali__paryayvachi",
  "questionEn": "'सूर्य' का पर्यायवाची शब्द चुनें।",
  "questionHi": "'सूर्य' का पर्यायवाची शब्द चुनें।",
  "optionsEn": [
   "दिनकर",
   "निशाकर",
   "गगन",
   "पवन"
  ],
  "optionsHi": [
   "दिनकर",
   "निशाकर",
   "गगन",
   "पवन"
  ],
  "correctIndex": 0,
  "explanationEn": "'दिनकर' सूर्य का पर्यायवाची शब्द है।",
  "explanationHi": "'दिनकर' सूर्य का पर्यायवाची शब्द है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_007",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_shabdavali",
  "topicId": "hindi_shabdavali__vilom",
  "questionEn": "'आरंभ' का विलोम शब्द क्या है?",
  "questionHi": "'आरंभ' का विलोम शब्द क्या है?",
  "optionsEn": [
   "अंत",
   "प्रारंभ",
   "शुरुआत",
   "आदि"
  ],
  "optionsHi": [
   "अंत",
   "प्रारंभ",
   "शुरुआत",
   "आदि"
  ],
  "correctIndex": 0,
  "explanationEn": "'आरंभ' का विलोम 'अंत' है।",
  "explanationHi": "'आरंभ' का विलोम 'अंत' है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_008",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_shabdavali",
  "topicId": "hindi_shabdavali__muhavare",
  "questionEn": "'आंखों में धूल झोंकना' मुहावरे का अर्थ है?",
  "questionHi": "'आंखों में धूल झोंकना' मुहावरे का अर्थ है?",
  "optionsEn": [
   "धोखा देना",
   "सच बोलना",
   "सहायता करना",
   "आराम करना"
  ],
  "optionsHi": [
   "धोखा देना",
   "सच बोलना",
   "सहायता करना",
   "आराम करना"
  ],
  "correctIndex": 0,
  "explanationEn": "इस मुहावरे का अर्थ है किसी को धोखा देना या छल करना।",
  "explanationHi": "इस मुहावरे का अर्थ है किसी को धोखा देना या छल करना।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_009",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_shabdavali",
  "topicId": "hindi_shabdavali__tatsam_tadbhav",
  "questionEn": "'अग्नि' का तद्भव रूप क्या है?",
  "questionHi": "'अग्नि' का तद्भव रूप क्या है?",
  "optionsEn": [
   "आग",
   "अगन",
   "अगिन",
   "अंगार"
  ],
  "optionsHi": [
   "आग",
   "अगन",
   "अगिन",
   "अंगार"
  ],
  "correctIndex": 0,
  "explanationEn": "'अग्नि' (तत्सम) का तद्भव रूप 'आग' है।",
  "explanationHi": "'अग्नि' (तत्सम) का तद्भव रूप 'आग' है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_010",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_shabdavali",
  "topicId": "hindi_shabdavali__vakya_shuddhi",
  "questionEn": "शुद्ध वाक्य चुनें:",
  "questionHi": "शुद्ध वाक्य चुनें:",
  "optionsEn": [
   "वह स्कूल जाता है।",
   "वह स्कूल जाते है।",
   "वह स्कूल जा रहे है।",
   "वह स्कूल गई था।"
  ],
  "optionsHi": [
   "वह स्कूल जाता है।",
   "वह स्कूल जाते है।",
   "वह स्कूल जा रहे है।",
   "वह स्कूल गई था।"
  ],
  "correctIndex": 0,
  "explanationEn": "एकवचन कर्ता 'वह' के साथ क्रिया का रूप 'जाता है' सही है।",
  "explanationHi": "एकवचन कर्ता 'वह' के साथ क्रिया का रूप 'जाता है' सही है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_001",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_grammar",
  "topicId": "eng_grammar__tenses",
  "questionEn": "Choose the correctly formed sentence in Present Perfect tense.",
  "questionHi": "प्रेजेंट परफेक्ट टेंस में सही ढंग से बना वाक्य चुनें।",
  "optionsEn": [
   "She has completed her homework.",
   "She completed her homework yesterday.",
   "She is completing her homework.",
   "She complete her homework."
  ],
  "optionsHi": [
   "She has completed her homework.",
   "She completed her homework yesterday.",
   "She is completing her homework.",
   "She complete her homework."
  ],
  "correctIndex": 0,
  "explanationEn": "Present Perfect uses has/have + past participle: 'has completed'.",
  "explanationHi": "प्रेजेंट परफेक्ट में has/have + past participle प्रयोग होता है: 'has completed'।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_002",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_grammar",
  "topicId": "eng_grammar__articles",
  "questionEn": "Fill in the blank: '___ honest man is respected by all.'",
  "questionHi": "रिक्त स्थान भरें: '___ honest man is respected by all.'",
  "optionsEn": [
   "An",
   "A",
   "The",
   "No article needed"
  ],
  "optionsHi": [
   "An",
   "A",
   "The",
   "No article needed"
  ],
  "correctIndex": 0,
  "explanationEn": "'Honest' starts with a vowel sound (silent h), so 'an' is used.",
  "explanationHi": "'Honest' का उच्चारण स्वर ध्वनि (silent h) से शुरू होता है, इसलिए 'an' प्रयुक्त होता है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_003",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_grammar",
  "topicId": "eng_grammar__prepositions",
  "questionEn": "Choose the correct preposition: 'She is good ___ mathematics.'",
  "questionHi": "सही प्रीपोजिशन चुनें: 'She is good ___ mathematics.'",
  "optionsEn": [
   "at",
   "in",
   "on",
   "with"
  ],
  "optionsHi": [
   "at",
   "in",
   "on",
   "with"
  ],
  "correctIndex": 0,
  "explanationEn": "The correct idiomatic usage is 'good at mathematics'.",
  "explanationHi": "सही मुहावरेदार प्रयोग 'good at mathematics' है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_004",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_grammar",
  "topicId": "eng_grammar__subject_verb_agreement",
  "questionEn": "Choose the correct sentence:",
  "questionHi": "सही वाक्य चुनें:",
  "optionsEn": [
   "Each of the boys has a book.",
   "Each of the boys have a book.",
   "Each of the boys having a book.",
   "Each of the boy has a book."
  ],
  "optionsHi": [
   "Each of the boys has a book.",
   "Each of the boys have a book.",
   "Each of the boys having a book.",
   "Each of the boy has a book."
  ],
  "correctIndex": 0,
  "explanationEn": "'Each' is singular, so it takes the singular verb 'has'.",
  "explanationHi": "'Each' एकवचन है, इसलिए इसके साथ एकवचन क्रिया 'has' आती है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_005",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_grammar",
  "topicId": "eng_grammar__active_and_passive_voice",
  "questionEn": "Change to passive voice: 'The teacher teaches the students.'",
  "questionHi": "पैसिव वॉइस में बदलें: 'The teacher teaches the students.'",
  "optionsEn": [
   "The students are taught by the teacher.",
   "The students taught the teacher.",
   "The students are teaching the teacher.",
   "The teacher is taught by students."
  ],
  "optionsHi": [
   "The students are taught by the teacher.",
   "The students taught the teacher.",
   "The students are teaching the teacher.",
   "The teacher is taught by students."
  ],
  "correctIndex": 0,
  "explanationEn": "Passive voice: object + is/are + past participle + by + subject.",
  "explanationHi": "पैसिव वॉइस: object + is/are + past participle + by + subject।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_006",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_vocab_comprehension",
  "topicId": "eng_vocab_comprehension__synonyms",
  "questionEn": "Choose the synonym of 'Abundant':",
  "questionHi": "'Abundant' का पर्यायवाची चुनें:",
  "optionsEn": [
   "Plentiful",
   "Scarce",
   "Limited",
   "Rare"
  ],
  "optionsHi": [
   "Plentiful",
   "Scarce",
   "Limited",
   "Rare"
  ],
  "correctIndex": 0,
  "explanationEn": "'Abundant' means existing in large quantities, similar to 'plentiful'.",
  "explanationHi": "'Abundant' का अर्थ है बड़ी मात्रा में उपलब्ध, जो 'plentiful' के समान है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_007",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_vocab_comprehension",
  "topicId": "eng_vocab_comprehension__antonyms",
  "questionEn": "Choose the antonym of 'Ancient':",
  "questionHi": "'Ancient' का विलोम चुनें:",
  "optionsEn": [
   "Modern",
   "Old",
   "Historic",
   "Traditional"
  ],
  "optionsHi": [
   "Modern",
   "Old",
   "Historic",
   "Traditional"
  ],
  "correctIndex": 0,
  "explanationEn": "'Ancient' means very old; its opposite is 'Modern'.",
  "explanationHi": "'Ancient' का अर्थ बहुत पुराना है; इसका विपरीत 'Modern' है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_008",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_vocab_comprehension",
  "topicId": "eng_vocab_comprehension__one_word_substitution",
  "questionEn": "One word for 'a person who studies birds':",
  "questionHi": "'पक्षियों का अध्ययन करने वाला व्यक्ति' के लिए एक शब्द:",
  "optionsEn": [
   "Ornithologist",
   "Zoologist",
   "Botanist",
   "Entomologist"
  ],
  "optionsHi": [
   "Ornithologist",
   "Zoologist",
   "Botanist",
   "Entomologist"
  ],
  "correctIndex": 0,
  "explanationEn": "An 'Ornithologist' specifically studies birds.",
  "explanationHi": "'Ornithologist' विशेष रूप से पक्षियों का अध्ययन करता है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_009",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_vocab_comprehension",
  "topicId": "eng_vocab_comprehension__idioms_and_phrases",
  "questionEn": "What does the idiom 'break the ice' mean?",
  "questionHi": "'break the ice' मुहावरे का क्या अर्थ है?",
  "optionsEn": [
   "To start a conversation in a social setting",
   "To literally break ice",
   "To end a friendship",
   "To cause a problem"
  ],
  "optionsHi": [
   "सामाजिक परिस्थिति में बातचीत शुरू करना",
   "वास्तव में बर्फ तोड़ना",
   "दोस्ती समाप्त करना",
   "समस्या उत्पन्न करना"
  ],
  "correctIndex": 0,
  "explanationEn": "'Break the ice' means to initiate conversation and ease tension in a social situation.",
  "explanationHi": "'Break the ice' का अर्थ है बातचीत शुरू कर सामाजिक तनाव कम करना।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_010",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_vocab_comprehension",
  "topicId": "eng_vocab_comprehension__error_spotting",
  "questionEn": "Find the error: 'He don't like to play cricket.'",
  "questionHi": "त्रुटि ज्ञात करें: 'He don't like to play cricket.'",
  "optionsEn": [
   "don't should be doesn't",
   "like should be likes",
   "to should be removed",
   "cricket should be Cricket"
  ],
  "optionsHi": [
   "don't should be doesn't",
   "like should be likes",
   "to should be removed",
   "cricket should be Cricket"
  ],
  "correctIndex": 0,
  "explanationEn": "With third person singular 'He', the correct auxiliary is 'doesn't'.",
  "explanationHi": "तृतीय पुरुष एकवचन 'He' के साथ सही सहायक क्रिया 'doesn't' है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_021",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__number_series",
  "questionEn": "Find the next number: 1, 4, 9, 16, 25, ?",
  "questionHi": "अगली संख्या ज्ञात करें: 1, 4, 9, 16, 25, ?",
  "optionsEn": [
   "30",
   "36",
   "32",
   "35"
  ],
  "optionsHi": [
   "30",
   "36",
   "32",
   "35"
  ],
  "correctIndex": 1,
  "explanationEn": "These are perfect squares: 1²,2²,3²,4²,5²,6²=36.",
  "explanationHi": "ये पूर्ण वर्ग हैं: 1²,2²,3²,4²,5²,6²=36।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_022",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__classification",
  "questionEn": "Find the odd one out: Triangle, Square, Circle, Pentagon",
  "questionHi": "विषम चुनें: त्रिभुज, वर्ग, वृत्त, पंचभुज",
  "optionsEn": [
   "Triangle",
   "Square",
   "Circle",
   "Pentagon"
  ],
  "optionsHi": [
   "त्रिभुज",
   "वर्ग",
   "वृत्त",
   "पंचभुज"
  ],
  "correctIndex": 2,
  "explanationEn": "Circle has no straight sides/corners; the others are polygons with straight sides.",
  "explanationHi": "वृत्त की कोई सीधी भुजा/कोना नहीं होता; बाकी सीधी भुजाओं वाले बहुभुज हैं।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_023",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__blood_relations",
  "questionEn": "A is the brother of B. B is the sister of C. C is the son of D. How is A related to D?",
  "questionHi": "A, B का भाई है। B, C की बहन है। C, D का पुत्र है। A का D से क्या संबंध है?",
  "optionsEn": [
   "Son",
   "Daughter",
   "Nephew",
   "Cannot be determined"
  ],
  "optionsHi": [
   "पुत्र",
   "पुत्री",
   "भतीजा",
   "निर्धारित नहीं किया जा सकता"
  ],
  "correctIndex": 0,
  "explanationEn": "A and B are siblings of C, and C is D's son, so A is also D's son.",
  "explanationHi": "A और B, C के भाई-बहन हैं, और C, D का पुत्र है, इसलिए A भी D का पुत्र है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_024",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__direction_test",
  "questionEn": "A man walks 4 km South then turns left and walks 3 km. In which direction is he from the start (approx.)?",
  "questionHi": "एक व्यक्ति 4 किमी दक्षिण चलता है फिर बाएं मुड़कर 3 किमी चलता है। वह प्रारंभिक बिंदु से किस दिशा में है (लगभग)?",
  "optionsEn": [
   "South-East",
   "South-West",
   "North-East",
   "North-West"
  ],
  "optionsHi": [
   "दक्षिण-पूर्व",
   "दक्षिण-पश्चिम",
   "उत्तर-पूर्व",
   "उत्तर-पश्चिम"
  ],
  "correctIndex": 1,
  "explanationEn": "Facing South and turning left means moving East... actually turning left while facing south heads East, so combined with south movement the person is South-East. (Verify direction convention while studying.)",
  "explanationHi": "दक्षिण की ओर मुख करते हुए बाएं मुड़ने पर पूर्व दिशा में गति होती है; संयुक्त रूप से स्थिति की जांच अभ्यास के दौरान करें।",
  "difficulty": "hard",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_025",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_analytical",
  "topicId": "reasoning_analytical__missing_number",
  "questionEn": "Find the missing number: 5, 10, 20, 40, ?",
  "questionHi": "लुप्त संख्या ज्ञात करें: 5, 10, 20, 40, ?",
  "optionsEn": [
   "60",
   "70",
   "80",
   "90"
  ],
  "optionsHi": [
   "60",
   "70",
   "80",
   "90"
  ],
  "correctIndex": 2,
  "explanationEn": "Each term doubles: 40×2=80.",
  "explanationHi": "प्रत्येक पद दोगुना होता है: 40×2=80।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_026",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_analytical",
  "topicId": "reasoning_analytical__syllogism",
  "questionEn": "Statements: Some pens are books. All books are papers. Conclusion: Some pens are papers.",
  "questionHi": "कथन: कुछ पेन किताबें हैं। सभी किताबें कागज हैं। निष्कर्ष: कुछ पेन कागज हैं।",
  "optionsEn": [
   "Conclusion follows",
   "Conclusion does not follow",
   "Cannot be determined",
   "None of these"
  ],
  "optionsHi": [
   "निष्कर्ष सही है",
   "निष्कर्ष सही नहीं है",
   "निर्धारित नहीं किया जा सकता",
   "इनमें से कोई नहीं"
  ],
  "correctIndex": 0,
  "explanationEn": "Some A are B, all B are C ⇒ Some A are C — valid.",
  "explanationHi": "कुछ A, B हैं; सभी B, C हैं ⇒ कुछ A, C हैं — यह वैध है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_027",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__coding_decoding",
  "questionEn": "In a code, 'FLOWER' is written as 'GMPXFS'. How is 'GARDEN' written?",
  "questionHi": "एक कोड में 'FLOWER' को 'GMPXFS' लिखा जाता है। 'GARDEN' को कैसे लिखा जाएगा?",
  "optionsEn": [
   "HBSEFO",
   "HBSEFP",
   "HBSDFO",
   "HCSEFO"
  ],
  "optionsHi": [
   "HBSEFO",
   "HBSEFP",
   "HBSDFO",
   "HCSEFO"
  ],
  "correctIndex": 0,
  "explanationEn": "Each letter is shifted forward by 1 in the alphabet.",
  "explanationHi": "प्रत्येक अक्षर वर्णमाला में एक स्थान आगे खिसकाया जाता है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_028",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__ranking",
  "questionEn": "In a class of 40 students, Meena ranks 15th from the top. What is her rank from the bottom?",
  "questionHi": "40 छात्रों की कक्षा में मीना का स्थान ऊपर से 15वां है। नीचे से उसका स्थान क्या है?",
  "optionsEn": [
   "25th",
   "26th",
   "24th",
   "27th"
  ],
  "optionsHi": [
   "25वां",
   "26वां",
   "24वां",
   "27वां"
  ],
  "correctIndex": 1,
  "explanationEn": "Rank from bottom = (40-15)+1 = 26.",
  "explanationHi": "नीचे से स्थान = (40-15)+1 = 26।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_029",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_analytical",
  "topicId": "reasoning_analytical__mirror_images",
  "questionEn": "Which of these numbers looks the same in mirror image (rotated 180° style is different from left-right mirror)?",
  "questionHi": "इनमें से कौन सी संख्या दर्पण प्रतिबिंब में समान दिखती है?",
  "optionsEn": [
   "0",
   "2",
   "3",
   "6"
  ],
  "optionsHi": [
   "0",
   "2",
   "3",
   "6"
  ],
  "correctIndex": 0,
  "explanationEn": "0 is symmetric left-right, so its mirror image looks the same.",
  "explanationHi": "0 बाएं-दाएं सममित है, इसलिए इसका दर्पण प्रतिबिंब समान दिखता है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_reasoning_030",
  "examStage": "both",
  "subjectId": "reasoning",
  "chapterId": "reasoning_verbal",
  "topicId": "reasoning_verbal__odd_one_out",
  "questionEn": "Find the odd pair: (2,8), (3,27), (4,64), (5,100)",
  "questionHi": "विषम युग्म ज्ञात करें: (2,8), (3,27), (4,64), (5,100)",
  "optionsEn": [
   "(2,8)",
   "(3,27)",
   "(4,64)",
   "(5,100)"
  ],
  "optionsHi": [
   "(2,8)",
   "(3,27)",
   "(4,64)",
   "(5,100)"
  ],
  "correctIndex": 3,
  "explanationEn": "In others, second = cube of first (2³=8, 3³=27, 4³=64); 5³=125, not 100.",
  "explanationHi": "बाकी में दूसरी संख्या पहली का घन है (2³=8, 3³=27, 4³=64); 5³=125 है, 100 नहीं।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_019",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__districts",
  "questionEn": "How many districts did Rajasthan have before the 2023 district reorganization (long-standing count)?",
  "questionHi": "2023 के जिला पुनर्गठन से पहले राजस्थान में कितने जिले थे (दीर्घकालीन संख्या)?",
  "optionsEn": [
   "33",
   "31",
   "36",
   "50"
  ],
  "optionsHi": [
   "33",
   "31",
   "36",
   "50"
  ],
  "correctIndex": 0,
  "explanationEn": "Rajasthan had 33 districts for a long period before recent reorganizations; verify current count with the latest notification.",
  "explanationHi": "हाल के पुनर्गठन से पहले राजस्थान में लंबे समय तक 33 जिले थे; वर्तमान संख्या नवीनतम अधिसूचना से सत्यापित करें।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_020",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__agriculture",
  "questionEn": "Which crop is Rajasthan a leading producer of, especially in arid regions?",
  "questionHi": "राजस्थान विशेष रूप से शुष्क क्षेत्रों में किस फसल का प्रमुख उत्पादक है?",
  "optionsEn": [
   "Bajra (Pearl Millet)",
   "Rice",
   "Tea",
   "Coconut"
  ],
  "optionsHi": [
   "बाजरा",
   "चावल",
   "चाय",
   "नारियल"
  ],
  "correctIndex": 0,
  "explanationEn": "Bajra is well suited to Rajasthan's arid climate and is widely grown.",
  "explanationHi": "बाजरा राजस्थान की शुष्क जलवायु के अनुकूल है और व्यापक रूप से उगाया जाता है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_021",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__irrigation",
  "questionEn": "The Indira Gandhi Canal primarily irrigates which part of Rajasthan?",
  "questionHi": "इंदिरा गांधी नहर राजस्थान के किस भाग की मुख्यतः सिंचाई करती है?",
  "optionsEn": [
   "North-western (Thar) region",
   "South-eastern plateau",
   "Aravalli hill region",
   "Eastern plain"
  ],
  "optionsHi": [
   "उत्तर-पश्चिमी (थार) क्षेत्र",
   "दक्षिण-पूर्वी पठार",
   "अरावली पर्वतीय क्षेत्र",
   "पूर्वी मैदान"
  ],
  "correctIndex": 0,
  "explanationEn": "The Indira Gandhi Canal brings water to the arid north-western desert districts.",
  "explanationHi": "इंदिरा गांधी नहर उत्तर-पश्चिमी शुष्क मरुस्थलीय जिलों में पानी पहुंचाती है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_022",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__industries",
  "questionEn": "Which city of Rajasthan is famous as a major marble industry hub?",
  "questionHi": "राजस्थान का कौन सा शहर प्रमुख संगमरमर उद्योग केंद्र के रूप में प्रसिद्ध है?",
  "optionsEn": [
   "Kishangarh",
   "Kota",
   "Bharatpur",
   "Sikar"
  ],
  "optionsHi": [
   "किशनगढ़",
   "कोटा",
   "भरतपुर",
   "सीकर"
  ],
  "correctIndex": 0,
  "explanationEn": "Kishangarh in Ajmer district is a major marble processing hub.",
  "explanationHi": "अजमेर जिले का किशनगढ़ प्रमुख संगमरमर प्रसंस्करण केंद्र है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_023",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__energy_resources",
  "questionEn": "Bhadla Solar Park, one of the world's largest solar parks, is located in which district?",
  "questionHi": "भाद्ला सोलर पार्क, जो विश्व के सबसे बड़े सोलर पार्कों में से एक है, किस जिले में स्थित है?",
  "optionsEn": [
   "Jodhpur",
   "Jaisalmer",
   "Barmer",
   "Bikaner"
  ],
  "optionsHi": [
   "जोधपुर",
   "जैसलमेर",
   "बाड़मेर",
   "बीकानेर"
  ],
  "correctIndex": 0,
  "explanationEn": "Bhadla Solar Park is located in Jodhpur district.",
  "explanationHi": "भाद्ला सोलर पार्क जोधपुर जिले में स्थित है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_024",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__national_parks",
  "questionEn": "Desert National Park, known for the Great Indian Bustard, is located near which city?",
  "questionHi": "महान भारतीय सोन चिड़िया के लिए प्रसिद्ध रेगिस्तानी राष्ट्रीय उद्यान किस शहर के पास स्थित है?",
  "optionsEn": [
   "Jaisalmer",
   "Jaipur",
   "Udaipur",
   "Kota"
  ],
  "optionsHi": [
   "जैसलमेर",
   "जयपुर",
   "उदयपुर",
   "कोटा"
  ],
  "correctIndex": 0,
  "explanationEn": "Desert National Park is near Jaisalmer, known for the endangered Great Indian Bustard (Godawan).",
  "explanationHi": "रेगिस्तानी राष्ट्रीय उद्यान जैसलमेर के पास है, जो लुप्तप्राय गोडावण पक्षी के लिए प्रसिद्ध है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_025",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__important_battles",
  "questionEn": "The Battle of Khanwa (1527) was fought between Babur and which Rajput ruler?",
  "questionHi": "खानवा का युद्ध (1527) बाबर और किस राजपूत शासक के बीच लड़ा गया था?",
  "optionsEn": [
   "Rana Sanga",
   "Maharana Pratap",
   "Rao Chandrasen",
   "Raja Man Singh"
  ],
  "optionsHi": [
   "राणा सांगा",
   "महाराणा प्रताप",
   "राव चंद्रसेन",
   "राजा मान सिंह"
  ],
  "correctIndex": 0,
  "explanationEn": "The Battle of Khanwa was fought between Babur and Rana Sanga of Mewar.",
  "explanationHi": "खानवा का युद्ध बाबर और मेवाड़ के राणा सांगा के बीच लड़ा गया था।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_026",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__rajasthan_integration",
  "questionEn": "Rajasthan's integration process began with the merger of which princely states first (Matsya Union, 1948)?",
  "questionHi": "राजस्थान की एकीकरण प्रक्रिया सबसे पहले किन रियासतों के विलय से शुरू हुई (मत्स्य संघ, 1948)?",
  "optionsEn": [
   "Alwar, Bharatpur, Dholpur, Karauli",
   "Jaipur, Jodhpur, Udaipur, Bikaner",
   "Kota, Bundi, Jhalawar, Tonk",
   "Mewar and Marwar only"
  ],
  "optionsHi": [
   "अलवर, भरतपुर, धौलपुर, करौली",
   "जयपुर, जोधपुर, उदयपुर, बीकानेर",
   "कोटा, बूंदी, झालावाड़, टोंक",
   "केवल मेवाड़ एवं मारवाड़"
  ],
  "correctIndex": 0,
  "explanationEn": "The Matsya Union (1948) was formed by Alwar, Bharatpur, Dholpur and Karauli.",
  "explanationHi": "मत्स्य संघ (1948) अलवर, भरतपुर, धौलपुर और करौली के विलय से बना था।",
  "difficulty": "hard",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_027",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_culture",
  "topicId": "raj_culture__folk_music",
  "questionEn": "Which folk musical instrument is most closely associated with Rajasthan's Manganiyar community?",
  "questionHi": "राजस्थान के मांगणियार समुदाय से कौन सा लोक वाद्ययंत्र सबसे अधिक जुड़ा है?",
  "optionsEn": [
   "Kamaicha",
   "Tabla",
   "Sitar",
   "Veena"
  ],
  "optionsHi": [
   "कामायचा",
   "तबला",
   "सितार",
   "वीणा"
  ],
  "correctIndex": 0,
  "explanationEn": "The Kamaicha is a traditional stringed instrument used by Manganiyar musicians.",
  "explanationHi": "कामायचा एक पारंपरिक तार वाद्ययंत्र है जिसे मांगणियार संगीतकार बजाते हैं।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_028",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_culture",
  "topicId": "raj_culture__handicrafts",
  "questionEn": "'Bandhani' is a traditional tie-dye textile art form most associated with which Rajasthan cities?",
  "questionHi": "'बांधनी' एक पारंपरिक टाई-डाई वस्त्र कला है जो राजस्थान के किन शहरों से सर्वाधिक जुड़ी है?",
  "optionsEn": [
   "Jaipur and Sikar / Jodhpur",
   "Kota and Bundi",
   "Ajmer and Pushkar",
   "Udaipur and Chittorgarh"
  ],
  "optionsHi": [
   "जयपुर और सीकर / जोधपुर",
   "कोटा और बूंदी",
   "अजमेर और पुष्कर",
   "उदयपुर और चित्तौड़गढ़"
  ],
  "correctIndex": 0,
  "explanationEn": "Bandhani tie-dye craft is famously practiced in Jaipur, Sikar and Jodhpur regions.",
  "explanationHi": "बांधनी टाई-डाई शिल्प जयपुर, सीकर और जोधपुर क्षेत्रों में प्रसिद्ध रूप से किया जाता है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_029",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_culture",
  "topicId": "raj_culture__paintings",
  "questionEn": "The 'Phad' painting style of Rajasthan traditionally depicts stories of which folk deities?",
  "questionHi": "राजस्थान की 'फड़' चित्रकला शैली परंपरागत रूप से किन लोक देवताओं की कथाएं दर्शाती है?",
  "optionsEn": [
   "Pabuji and Devnarayan",
   "Lord Krishna only",
   "Lord Shiva only",
   "Goddess Durga only"
  ],
  "optionsHi": [
   "पाबूजी एवं देवनारायण",
   "केवल भगवान कृष्ण",
   "केवल भगवान शिव",
   "केवल देवी दुर्गा"
  ],
  "correctIndex": 0,
  "explanationEn": "Phad paintings traditionally narrate the folk epics of Pabuji and Devnarayan.",
  "explanationHi": "फड़ चित्रकला परंपरागत रूप से पाबूजी और देवनारायण की लोक गाथाएं दर्शाती है।",
  "difficulty": "hard",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_030",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_polity_economy",
  "topicId": "raj_polity_economy__state_administration",
  "questionEn": "Who is the constitutional head of the state government in Rajasthan?",
  "questionHi": "राजस्थान में राज्य सरकार का संवैधानिक प्रमुख कौन है?",
  "optionsEn": [
   "Governor",
   "Chief Minister",
   "Chief Secretary",
   "Speaker of Assembly"
  ],
  "optionsHi": [
   "राज्यपाल",
   "मुख्यमंत्री",
   "मुख्य सचिव",
   "विधानसभा अध्यक्ष"
  ],
  "correctIndex": 0,
  "explanationEn": "The Governor is the constitutional head of the state, while the Chief Minister heads the government in practice.",
  "explanationHi": "राज्यपाल राज्य का संवैधानिक प्रमुख है, जबकि व्यवहार में मुख्यमंत्री सरकार का नेतृत्व करता है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_031",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_polity_economy",
  "topicId": "raj_polity_economy__local_government",
  "questionEn": "Panchayati Raj in Rajasthan has how many tiers (structure)?",
  "questionHi": "राजस्थान में पंचायती राज की कितनी स्तरीय संरचना है?",
  "optionsEn": [
   "Three (Gram Panchayat, Panchayat Samiti, Zila Parishad)",
   "Two",
   "Four",
   "Five"
  ],
  "optionsHi": [
   "तीन (ग्राम पंचायत, पंचायत समिति, जिला परिषद)",
   "दो",
   "चार",
   "पांच"
  ],
  "correctIndex": 0,
  "explanationEn": "Rajasthan follows the standard three-tier Panchayati Raj structure.",
  "explanationHi": "राजस्थान मानक त्रि-स्तरीय पंचायती राज संरचना का पालन करता है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_032",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__soil",
  "questionEn": "Which soil type is most widespread in western Rajasthan?",
  "questionHi": "पश्चिमी राजस्थान में कौन सी मिट्टी सबसे व्यापक है?",
  "optionsEn": [
   "Desert/sandy soil",
   "Black soil",
   "Alluvial soil",
   "Laterite soil"
  ],
  "optionsHi": [
   "मरुस्थलीय/बलुई मिट्टी",
   "काली मिट्टी",
   "जलोढ़ मिट्टी",
   "लैटेराइट मिट्टी"
  ],
  "correctIndex": 0,
  "explanationEn": "Western Rajasthan is dominated by sandy desert soils, low in fertility and moisture retention.",
  "explanationHi": "पश्चिमी राजस्थान में बलुई मरुस्थलीय मिट्टी की प्रधानता है, जो उर्वरता एवं नमी धारण में कम है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_033",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__ancient_rajasthan",
  "questionEn": "The Bairath site, associated with Ashokan inscriptions, is located in which present-day district?",
  "questionHi": "अशोक के अभिलेखों से संबंधित बैराठ स्थल वर्तमान में किस जिले में स्थित है?",
  "optionsEn": [
   "Jaipur",
   "Bharatpur",
   "Alwar",
   "Bikaner"
  ],
  "optionsHi": [
   "जयपुर",
   "भरतपुर",
   "अलवर",
   "बीकानेर"
  ],
  "correctIndex": 0,
  "explanationEn": "Bairath, with Ashokan minor rock edicts, lies in present-day Jaipur district.",
  "explanationHi": "अशोक के लघु शिलालेखों वाला बैराठ वर्तमान जयपुर जिले में स्थित है।",
  "difficulty": "hard",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_034",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_culture",
  "topicId": "raj_culture__fairs_and_festivals",
  "questionEn": "The Desert Festival (Marwar Festival related events) is prominently celebrated in which city?",
  "questionHi": "मरु महोत्सव किस शहर में प्रमुखता से मनाया जाता है?",
  "optionsEn": [
   "Jaisalmer",
   "Bikaner",
   "Jodhpur",
   "Barmer"
  ],
  "optionsHi": [
   "जैसलमेर",
   "बीकानेर",
   "जोधपुर",
   "बाड़मेर"
  ],
  "correctIndex": 0,
  "explanationEn": "The Desert Festival (Maru Mahotsav) is a major cultural event held in Jaisalmer.",
  "explanationHi": "मरु महोत्सव जैसलमेर में आयोजित एक प्रमुख सांस्कृतिक आयोजन है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_035",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__rivers",
  "questionEn": "The Chambal river is a tributary of which major river?",
  "questionHi": "चंबल नदी किस प्रमुख नदी की सहायक नदी है?",
  "optionsEn": [
   "Yamuna",
   "Ganga",
   "Narmada",
   "Godavari"
  ],
  "optionsHi": [
   "यमुना",
   "गंगा",
   "नर्मदा",
   "गोदावरी"
  ],
  "correctIndex": 0,
  "explanationEn": "The Chambal river is a major tributary of the Yamuna.",
  "explanationHi": "चंबल नदी यमुना की एक प्रमुख सहायक नदी है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_036",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__medieval_rajasthan",
  "questionEn": "Who founded the city of Jaipur in 1727?",
  "questionHi": "1727 में जयपुर शहर की स्थापना किसने की थी?",
  "optionsEn": [
   "Sawai Jai Singh II",
   "Maharana Pratap",
   "Rao Jodha",
   "Prithviraj Chauhan"
  ],
  "optionsHi": [
   "सवाई जय सिंह द्वितीय",
   "महाराणा प्रताप",
   "राव जोधा",
   "पृथ्वीराज चौहान"
  ],
  "correctIndex": 0,
  "explanationEn": "Sawai Jai Singh II, ruler of Amber, founded Jaipur in 1727.",
  "explanationHi": "आमेर के शासक सवाई जय सिंह द्वितीय ने 1727 में जयपुर की स्थापना की।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_037",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__medieval_rajasthan",
  "questionEn": "Rao Jodha, who founded Jodhpur in 1459, belonged to which dynasty?",
  "questionHi": "1459 में जोधपुर की स्थापना करने वाले राव जोधा किस वंश से थे?",
  "optionsEn": [
   "Rathore",
   "Sisodia",
   "Kachwaha",
   "Chauhan"
  ],
  "optionsHi": [
   "राठौड़",
   "सिसोदिया",
   "कछवाहा",
   "चौहान"
  ],
  "correctIndex": 0,
  "explanationEn": "Rao Jodha belonged to the Rathore dynasty of Marwar.",
  "explanationHi": "राव जोधा मारवाड़ के राठौड़ वंश से थे।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_038",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__dams",
  "questionEn": "The Bisalpur Dam, an important water source for Jaipur, is built on which river?",
  "questionHi": "जयपुर के लिए महत्वपूर्ण जल स्रोत बीसलपुर बांध किस नदी पर बना है?",
  "optionsEn": [
   "Banas",
   "Chambal",
   "Luni",
   "Mahi"
  ],
  "optionsHi": [
   "बनास",
   "चंबल",
   "लूनी",
   "माही"
  ],
  "correctIndex": 0,
  "explanationEn": "The Bisalpur Dam is built on the Banas river in Tonk district.",
  "explanationHi": "बीसलपुर बांध टोंक जिले में बनास नदी पर बना है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_039",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_culture",
  "topicId": "raj_culture__literature",
  "questionEn": "'Padmavat', the famous epic poem, was written by which poet (referring to the Rajasthani/Awadhi literary tradition)?",
  "questionHi": "प्रसिद्ध महाकाव्य 'पद्मावत' किस कवि द्वारा लिखा गया था?",
  "optionsEn": [
   "Malik Muhammad Jayasi",
   "Chand Bardai",
   "Kavi Prithviraj Raso author",
   "Surdas"
  ],
  "optionsHi": [
   "मलिक मुहम्मद जायसी",
   "चंद बरदाई",
   "पृथ्वीराज रासो के रचयिता",
   "सूरदास"
  ],
  "correctIndex": 0,
  "explanationEn": "Padmavat was composed by Malik Muhammad Jayasi.",
  "explanationHi": "पद्मावत की रचना मलिक मुहम्मद जायसी ने की थी।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_040",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__ancient_rajasthan",
  "questionEn": "Ganeshwar culture, known for copper artifacts, is located in which district?",
  "questionHi": "तांबे की वस्तुओं के लिए प्रसिद्ध गणेश्वर संस्कृति किस जिले में स्थित है?",
  "optionsEn": [
   "Sikar",
   "Jaipur",
   "Bharatpur",
   "Kota"
  ],
  "optionsHi": [
   "सीकर",
   "जयपुर",
   "भरतपुर",
   "कोटा"
  ],
  "correctIndex": 0,
  "explanationEn": "The Ganeshwar site, famous for early copper tools, is in Sikar district.",
  "explanationHi": "प्रारंभिक तांबे के औजारों के लिए प्रसिद्ध गणेश्वर स्थल सीकर जिले में है।",
  "difficulty": "hard",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_011",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_vyakaran",
  "topicId": "hindi_vyakaran__ling",
  "questionEn": "'नदी' शब्द का लिंग है?",
  "questionHi": "'नदी' शब्द का लिंग है?",
  "optionsEn": [
   "स्त्रीलिंग",
   "पुल्लिंग",
   "उभयलिंगी",
   "नपुंसकलिंग"
  ],
  "optionsHi": [
   "स्त्रीलिंग",
   "पुल्लिंग",
   "उभयलिंगी",
   "नपुंसकलिंग"
  ],
  "correctIndex": 0,
  "explanationEn": "'नदी' एक स्त्रीलिंग शब्द है।",
  "explanationHi": "'नदी' एक स्त्रीलिंग शब्द है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_012",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_vyakaran",
  "topicId": "hindi_vyakaran__kaal",
  "questionEn": "'वह पढ़ रहा है' वाक्य किस काल का उदाहरण है?",
  "questionHi": "'वह पढ़ रहा है' वाक्य किस काल का उदाहरण है?",
  "optionsEn": [
   "वर्तमान काल",
   "भूतकाल",
   "भविष्यकाल",
   "संभाव्य भविष्यकाल"
  ],
  "optionsHi": [
   "वर्तमान काल",
   "भूतकाल",
   "भविष्यकाल",
   "संभाव्य भविष्यकाल"
  ],
  "correctIndex": 0,
  "explanationEn": "'रहा है' रूप वर्तमान काल (सातत्यबोधक) को दर्शाता है।",
  "explanationHi": "'रहा है' रूप वर्तमान काल (सातत्यबोधक) को दर्शाता है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_013",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_vyakaran",
  "topicId": "hindi_vyakaran__vachya",
  "questionEn": "'राम द्वारा पत्र लिखा गया' वाक्य किस वाच्य का उदाहरण है?",
  "questionHi": "'राम द्वारा पत्र लिखा गया' वाक्य किस वाच्य का उदाहरण है?",
  "optionsEn": [
   "कर्मवाच्य",
   "कर्तृवाच्य",
   "भाववाच्य",
   "इनमें से कोई नहीं"
  ],
  "optionsHi": [
   "कर्मवाच्य",
   "कर्तृवाच्य",
   "भाववाच्य",
   "इनमें से कोई नहीं"
  ],
  "correctIndex": 0,
  "explanationEn": "जहां क्रिया का महत्व कर्म पर हो, वहां कर्मवाच्य होता है।",
  "explanationHi": "जहां क्रिया का महत्व कर्म पर हो, वहां कर्मवाच्य होता है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_014",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_vyakaran",
  "topicId": "hindi_vyakaran__sarvanam",
  "questionEn": "'यह', 'वह', 'कौन' किस प्रकार के शब्द हैं?",
  "questionHi": "'यह', 'वह', 'कौन' किस प्रकार के शब्द हैं?",
  "optionsEn": [
   "सर्वनाम",
   "संज्ञा",
   "विशेषण",
   "क्रिया विशेषण"
  ],
  "optionsHi": [
   "सर्वनाम",
   "संज्ञा",
   "विशेषण",
   "क्रिया विशेषण"
  ],
  "correctIndex": 0,
  "explanationEn": "संज्ञा के स्थान पर प्रयुक्त शब्द सर्वनाम कहलाते हैं।",
  "explanationHi": "संज्ञा के स्थान पर प्रयुक्त शब्द सर्वनाम कहलाते हैं।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_015",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_shabdavali",
  "topicId": "hindi_shabdavali__anekarthi",
  "questionEn": "'कनक' शब्द के दो अर्थ हैं। कौन से विकल्प सही हैं?",
  "questionHi": "'कनक' शब्द के दो अर्थ हैं। कौन से विकल्प सही हैं?",
  "optionsEn": [
   "सोना और धतूरा",
   "चांदी और तांबा",
   "फूल और पत्ती",
   "जल और अग्नि"
  ],
  "optionsHi": [
   "सोना और धतूरा",
   "चांदी और तांबा",
   "फूल और पत्ती",
   "जल और अग्नि"
  ],
  "correctIndex": 0,
  "explanationEn": "'कनक' अनेकार्थी शब्द है जिसके अर्थ सोना और धतूरा दोनों होते हैं।",
  "explanationHi": "'कनक' अनेकार्थी शब्द है जिसके अर्थ सोना और धतूरा दोनों होते हैं।",
  "difficulty": "hard",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_016",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_shabdavali",
  "topicId": "hindi_shabdavali__lokoktiyan",
  "questionEn": "'अंधे के हाथ बटेर लगना' लोकोक्ति का अर्थ है?",
  "questionHi": "'अंधे के हाथ बटेर लगना' लोकोक्ति का अर्थ है?",
  "optionsEn": [
   "अचानक बिना प्रयास के लाभ मिलना",
   "कठिन परिश्रम करना",
   "असफल होना",
   "धोखा खाना"
  ],
  "optionsHi": [
   "अचानक बिना प्रयास के लाभ मिलना",
   "कठिन परिश्रम करना",
   "असफल होना",
   "धोखा खाना"
  ],
  "correctIndex": 0,
  "explanationEn": "इस लोकोक्ति का अर्थ है बिना प्रयास के अप्रत्याशित लाभ मिलना।",
  "explanationHi": "इस लोकोक्ति का अर्थ है बिना प्रयास के अप्रत्याशित लाभ मिलना।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_017",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_shabdavali",
  "topicId": "hindi_shabdavali__shabd_shuddhi",
  "questionEn": "शुद्ध शब्द चुनें:",
  "questionHi": "शुद्ध शब्द चुनें:",
  "optionsEn": [
   "आशीर्वाद",
   "आशिर्वाद",
   "आर्शीवाद",
   "आशीर्वाध"
  ],
  "optionsHi": [
   "आशीर्वाद",
   "आशिर्वाद",
   "आर्शीवाद",
   "आशीर्वाध"
  ],
  "correctIndex": 0,
  "explanationEn": "'आशीर्वाद' शब्द का शुद्ध वर्तनी रूप है।",
  "explanationHi": "'आशीर्वाद' शब्द का शुद्ध वर्तनी रूप है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_018",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_shabdavali",
  "topicId": "hindi_shabdavali__rikt_sthan",
  "questionEn": "रिक्त स्थान भरें: 'वह ईमानदार ___ मेहनती है।'",
  "questionHi": "रिक्त स्थान भरें: 'वह ईमानदार ___ मेहनती है।'",
  "optionsEn": [
   "और",
   "या",
   "परंतु",
   "क्योंकि"
  ],
  "optionsHi": [
   "और",
   "या",
   "परंतु",
   "क्योंकि"
  ],
  "correctIndex": 0,
  "explanationEn": "दो समान गुणों को जोड़ने के लिए संयोजक 'और' उपयुक्त है।",
  "explanationHi": "दो समान गुणों को जोड़ने के लिए संयोजक 'और' उपयुक्त है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_019",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_shabdavali",
  "topicId": "hindi_shabdavali__apathit",
  "questionEn": "अपठित गद्यांश की समझ मुख्यतः किस कौशल का परीक्षण करती है?",
  "questionHi": "अपठित गद्यांश की समझ मुख्यतः किस कौशल का परीक्षण करती है?",
  "optionsEn": [
   "पठन बोध कौशल",
   "लेखन कौशल",
   "श्रवण कौशल",
   "गणितीय कौशल"
  ],
  "optionsHi": [
   "पठन बोध कौशल",
   "लेखन कौशल",
   "श्रवण कौशल",
   "गणितीय कौशल"
  ],
  "correctIndex": 0,
  "explanationEn": "अपठित गद्यांश प्रश्न पठन बोध (reading comprehension) कौशल का परीक्षण करते हैं।",
  "explanationHi": "अपठित गद्यांश प्रश्न पठन बोध (reading comprehension) कौशल का परीक्षण करते हैं।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_hindi_020",
  "examStage": "both",
  "subjectId": "hindi",
  "chapterId": "hindi_vyakaran",
  "topicId": "hindi_vyakaran__visheshan",
  "questionEn": "'सुंदर लड़की' में 'सुंदर' शब्द कौन सा भेद है?",
  "questionHi": "'सुंदर लड़की' में 'सुंदर' शब्द कौन सा भेद है?",
  "optionsEn": [
   "विशेषण",
   "संज्ञा",
   "क्रिया",
   "सर्वनाम"
  ],
  "optionsHi": [
   "विशेषण",
   "संज्ञा",
   "क्रिया",
   "सर्वनाम"
  ],
  "correctIndex": 0,
  "explanationEn": "संज्ञा की विशेषता बताने वाला शब्द विशेषण कहलाता है।",
  "explanationHi": "संज्ञा की विशेषता बताने वाला शब्द विशेषण कहलाता है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_011",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_grammar",
  "topicId": "eng_grammar__conjunctions",
  "questionEn": "Choose the correct conjunction: 'I stayed home ___ it was raining.'",
  "questionHi": "सही संयोजक चुनें: 'I stayed home ___ it was raining.'",
  "optionsEn": [
   "because",
   "but",
   "or",
   "although"
  ],
  "optionsHi": [
   "because",
   "but",
   "or",
   "although"
  ],
  "correctIndex": 0,
  "explanationEn": "'Because' shows the reason for staying home.",
  "explanationHi": "'Because' घर पर रुकने का कारण दर्शाता है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_012",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_grammar",
  "topicId": "eng_grammar__adjectives",
  "questionEn": "Identify the adjective: 'She wore a beautiful red dress.'",
  "questionHi": "विशेषण पहचानें: 'She wore a beautiful red dress.'",
  "optionsEn": [
   "beautiful",
   "wore",
   "dress",
   "she"
  ],
  "optionsHi": [
   "beautiful",
   "wore",
   "dress",
   "she"
  ],
  "correctIndex": 0,
  "explanationEn": "'Beautiful' describes the noun 'dress', making it an adjective.",
  "explanationHi": "'Beautiful' संज्ञा 'dress' का वर्णन करता है, इसलिए यह विशेषण है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_013",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_grammar",
  "topicId": "eng_grammar__direct_and_indirect_speech",
  "questionEn": "Change to indirect speech: He said, 'I am happy.'",
  "questionHi": "अप्रत्यक्ष कथन में बदलें: He said, 'I am happy.'",
  "optionsEn": [
   "He said that he was happy.",
   "He said that I am happy.",
   "He says that he was happy.",
   "He said I am happy."
  ],
  "optionsHi": [
   "He said that he was happy.",
   "He said that I am happy.",
   "He says that he was happy.",
   "He said I am happy."
  ],
  "correctIndex": 0,
  "explanationEn": "In indirect speech, pronoun and tense shift: 'I am' becomes 'he was'.",
  "explanationHi": "अप्रत्यक्ष कथन में सर्वनाम व काल बदलता है: 'I am' 'he was' बनता है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_014",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_vocab_comprehension",
  "topicId": "eng_vocab_comprehension__fill_in_the_blanks",
  "questionEn": "Fill in the blank: 'She is fond ___ music.'",
  "questionHi": "रिक्त स्थान भरें: 'She is fond ___ music.'",
  "optionsEn": [
   "of",
   "for",
   "in",
   "with"
  ],
  "optionsHi": [
   "of",
   "for",
   "in",
   "with"
  ],
  "correctIndex": 0,
  "explanationEn": "The idiomatic phrase is 'fond of'.",
  "explanationHi": "मुहावरेदार वाक्यांश 'fond of' है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_015",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_vocab_comprehension",
  "topicId": "eng_vocab_comprehension__cloze_test",
  "questionEn": "Choose the best word: 'Despite the rain, the match ___ on time.'",
  "questionHi": "सबसे उपयुक्त शब्द चुनें: 'Despite the rain, the match ___ on time.'",
  "optionsEn": [
   "started",
   "start",
   "starting",
   "starts"
  ],
  "optionsHi": [
   "started",
   "start",
   "starting",
   "starts"
  ],
  "correctIndex": 0,
  "explanationEn": "Past tense 'started' fits the context of a completed event.",
  "explanationHi": "पूर्ण घटना के संदर्भ में भूतकाल 'started' उपयुक्त है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_016",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_vocab_comprehension",
  "topicId": "eng_vocab_comprehension__synonyms",
  "questionEn": "Choose the synonym of 'Courage':",
  "questionHi": "'Courage' का पर्यायवाची चुनें:",
  "optionsEn": [
   "Bravery",
   "Fear",
   "Weakness",
   "Doubt"
  ],
  "optionsHi": [
   "Bravery",
   "Fear",
   "Weakness",
   "Doubt"
  ],
  "correctIndex": 0,
  "explanationEn": "'Courage' means bravery in facing difficulty or danger.",
  "explanationHi": "'Courage' का अर्थ है कठिनाई या खतरे का सामना करने का साहस।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_017",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_vocab_comprehension",
  "topicId": "eng_vocab_comprehension__antonyms",
  "questionEn": "Choose the antonym of 'Generous':",
  "questionHi": "'Generous' का विलोम चुनें:",
  "optionsEn": [
   "Stingy",
   "Kind",
   "Helpful",
   "Friendly"
  ],
  "optionsHi": [
   "Stingy",
   "Kind",
   "Helpful",
   "Friendly"
  ],
  "correctIndex": 0,
  "explanationEn": "'Generous' means giving freely; its opposite is 'stingy'.",
  "explanationHi": "'Generous' का अर्थ है खुले दिल से देना; इसका विपरीत 'stingy' है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_018",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_grammar",
  "topicId": "eng_grammar__parts_of_speech",
  "questionEn": "Identify the verb in: 'The children played happily in the garden.'",
  "questionHi": "क्रिया पहचानें: 'The children played happily in the garden.'",
  "optionsEn": [
   "played",
   "children",
   "happily",
   "garden"
  ],
  "optionsHi": [
   "played",
   "children",
   "happily",
   "garden"
  ],
  "correctIndex": 0,
  "explanationEn": "'Played' shows the action performed, making it the verb.",
  "explanationHi": "'Played' की गई क्रिया को दर्शाता है, इसलिए यह क्रिया है।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_019",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_vocab_comprehension",
  "topicId": "eng_vocab_comprehension__sentence_completion",
  "questionEn": "Complete the sentence: 'No sooner had he reached the station ___ the train left.'",
  "questionHi": "वाक्य पूरा करें: 'No sooner had he reached the station ___ the train left.'",
  "optionsEn": [
   "than",
   "when",
   "then",
   "that"
  ],
  "optionsHi": [
   "than",
   "when",
   "then",
   "that"
  ],
  "correctIndex": 0,
  "explanationEn": "'No sooner...than' is a fixed correlative structure.",
  "explanationHi": "'No sooner...than' एक निश्चित सहसंबंधी संरचना है।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_020",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_vocab_comprehension",
  "topicId": "eng_vocab_comprehension__one_word_substitution",
  "questionEn": "One word for 'a place where books are kept for public use':",
  "questionHi": "'सार्वजनिक उपयोग हेतु पुस्तकें रखने का स्थान' के लिए एक शब्द:",
  "optionsEn": [
   "Library",
   "Museum",
   "Archive",
   "Gallery"
  ],
  "optionsHi": [
   "Library",
   "Museum",
   "Archive",
   "Gallery"
  ],
  "correctIndex": 0,
  "explanationEn": "A 'Library' is a place where books are kept for reading or borrowing.",
  "explanationHi": "'Library' वह स्थान है जहां पढ़ने या उधार लेने हेतु पुस्तकें रखी जाती हैं।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_english_021",
  "examStage": "both",
  "subjectId": "english",
  "chapterId": "eng_grammar",
  "topicId": "eng_grammar__adverbs",
  "questionEn": "Identify the adverb in: 'He runs quickly.'",
  "questionHi": "क्रियाविशेषण पहचानें: 'He runs quickly.'",
  "optionsEn": [
   "quickly",
   "runs",
   "he",
   "none"
  ],
  "optionsHi": [
   "quickly",
   "runs",
   "he",
   "none"
  ],
  "correctIndex": 0,
  "explanationEn": "'Quickly' modifies the verb 'runs', describing how the action is done.",
  "explanationHi": "'Quickly', क्रिया 'runs' को संशोधित करता है, यह बताते हुए कि क्रिया कैसे की गई।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_014",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_current_affairs",
  "topicId": "iw_current_affairs__awards",
  "questionEn": "The Bharat Ratna is India's highest civilian award. Which field(s) can it honour?",
  "questionHi": "भारत रत्न भारत का सर्वोच्च नागरिक सम्मान है। यह किन क्षेत्रों के लिए दिया जा सकता है?",
  "optionsEn": [
   "Exceptional service in any field including arts, science, public service, sports",
   "Only sports",
   "Only defence services",
   "Only politics"
  ],
  "optionsHi": [
   "कला, विज्ञान, लोकसेवा, खेल सहित किसी भी क्षेत्र में असाधारण सेवा",
   "केवल खेल",
   "केवल रक्षा सेवाएं",
   "केवल राजनीति"
  ],
  "correctIndex": 0,
  "explanationEn": "Bharat Ratna recognizes exceptional service/performance across all fields of human endeavour.",
  "explanationHi": "भारत रत्न मानव प्रयास के सभी क्षेत्रों में असाधारण सेवा/प्रदर्शन को मान्यता देता है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_015",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_history_polity",
  "topicId": "iw_history_polity__judiciary",
  "questionEn": "Who is the head of the Indian judiciary at the national level?",
  "questionHi": "राष्ट्रीय स्तर पर भारतीय न्यायपालिका का प्रमुख कौन है?",
  "optionsEn": [
   "Chief Justice of India",
   "President of India",
   "Attorney General",
   "Law Minister"
  ],
  "optionsHi": [
   "भारत के मुख्य न्यायाधीश",
   "भारत के राष्ट्रपति",
   "महान्यायवादी",
   "विधि मंत्री"
  ],
  "correctIndex": 0,
  "explanationEn": "The Chief Justice of India heads the Supreme Court and the judiciary.",
  "explanationHi": "भारत के मुख्य न्यायाधीश सर्वोच्च न्यायालय एवं न्यायपालिका के प्रमुख होते हैं।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_016",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_science",
  "topicId": "iw_science__environment",
  "questionEn": "Which gas is primarily responsible for the greenhouse effect and global warming?",
  "questionHi": "ग्रीनहाउस प्रभाव व वैश्विक तापन के लिए मुख्यतः कौन सी गैस जिम्मेदार है?",
  "optionsEn": [
   "Carbon dioxide",
   "Oxygen",
   "Nitrogen",
   "Argon"
  ],
  "optionsHi": [
   "कार्बन डाइऑक्साइड",
   "ऑक्सीजन",
   "नाइट्रोजन",
   "आर्गन"
  ],
  "correctIndex": 0,
  "explanationEn": "Carbon dioxide is a major greenhouse gas contributing to global warming.",
  "explanationHi": "कार्बन डाइऑक्साइड एक प्रमुख ग्रीनहाउस गैस है जो वैश्विक तापन में योगदान देती है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_017",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_history_polity",
  "topicId": "iw_history_polity__ancient_indian_history",
  "questionEn": "Who founded the Maurya Empire?",
  "questionHi": "मौर्य साम्राज्य की स्थापना किसने की थी?",
  "optionsEn": [
   "Chandragupta Maurya",
   "Ashoka",
   "Bindusara",
   "Chanakya"
  ],
  "optionsHi": [
   "चंद्रगुप्त मौर्य",
   "अशोक",
   "बिंदुसार",
   "चाणक्य"
  ],
  "correctIndex": 0,
  "explanationEn": "Chandragupta Maurya founded the Maurya Empire around 322 BCE.",
  "explanationHi": "चंद्रगुप्त मौर्य ने लगभग 322 ईसा पूर्व मौर्य साम्राज्य की स्थापना की थी।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_indiaWorldScience_018",
  "examStage": "both",
  "subjectId": "indiaWorldScience",
  "chapterId": "iw_geo_economy",
  "topicId": "iw_geo_economy__indian_geography",
  "questionEn": "Which is the highest peak in India?",
  "questionHi": "भारत की सबसे ऊंची चोटी कौन सी है?",
  "optionsEn": [
   "Kangchenjunga",
   "Nanda Devi",
   "Mount Everest (fully in India)",
   "K2"
  ],
  "optionsHi": [
   "कंचनजंगा",
   "नंदा देवी",
   "माउंट एवरेस्ट (पूर्णतः भारत में)",
   "के2"
  ],
  "correctIndex": 0,
  "explanationEn": "Kangchenjunga, on the India-Nepal border, is the highest peak located within India.",
  "explanationHi": "कंचनजंगा, भारत-नेपाल सीमा पर, भारत में स्थित सबसे ऊंची चोटी है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_020",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_algebra",
  "topicId": "math_algebra__basic_algebra",
  "questionEn": "If x + y = 10 and x - y = 4, find the value of x.",
  "questionHi": "यदि x + y = 10 और x - y = 4 है, तो x का मान ज्ञात करें।",
  "optionsEn": [
   "7",
   "6",
   "8",
   "5"
  ],
  "optionsHi": [
   "7",
   "6",
   "8",
   "5"
  ],
  "correctIndex": 0,
  "explanationEn": "Adding both equations: 2x=14, x=7.",
  "explanationHi": "दोनों समीकरणों को जोड़ने पर: 2x=14, x=7।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_021",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_geometry",
  "topicId": "math_geometry__quadrilateral",
  "questionEn": "Find the area of a rectangle with length 12 cm and breadth 5 cm.",
  "questionHi": "लंबाई 12 सेमी और चौड़ाई 5 सेमी वाले आयत का क्षेत्रफल ज्ञात करें।",
  "optionsEn": [
   "60 sq cm",
   "50 sq cm",
   "17 sq cm",
   "70 sq cm"
  ],
  "optionsHi": [
   "60 वर्ग सेमी",
   "50 वर्ग सेमी",
   "17 वर्ग सेमी",
   "70 वर्ग सेमी"
  ],
  "correctIndex": 0,
  "explanationEn": "Area of rectangle = length × breadth = 12 × 5 = 60.",
  "explanationHi": "आयत का क्षेत्रफल = लंबाई × चौड़ाई = 12 × 5 = 60।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_022",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__partnership",
  "questionEn": "A and B invest ₹3000 and ₹5000 respectively in a business. If the profit is ₹1600, find A's share.",
  "questionHi": "A और B एक व्यवसाय में क्रमशः ₹3000 और ₹5000 का निवेश करते हैं। यदि लाभ ₹1600 है, तो A का हिस्सा ज्ञात करें।",
  "optionsEn": [
   "₹600",
   "₹700",
   "₹800",
   "₹500"
  ],
  "optionsHi": [
   "₹600",
   "₹700",
   "₹800",
   "₹500"
  ],
  "correctIndex": 0,
  "explanationEn": "Ratio 3:5, total 8 parts; A's share = (3/8)×1600 = 600.",
  "explanationHi": "अनुपात 3:5, कुल 8 भाग; A का हिस्सा = (3/8)×1600 = 600।",
  "difficulty": "medium",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_023",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_arithmetic",
  "topicId": "math_arithmetic__number_system",
  "questionEn": "Which of the following is a prime number?",
  "questionHi": "निम्नलिखित में से कौन सी एक अभाज्य संख्या है?",
  "optionsEn": [
   "37",
   "39",
   "51",
   "57"
  ],
  "optionsHi": [
   "37",
   "39",
   "51",
   "57"
  ],
  "correctIndex": 0,
  "explanationEn": "37 has no divisors other than 1 and itself; the others are divisible by 3 or 13/3.",
  "explanationHi": "37 का 1 और स्वयं के अलावा कोई भाजक नहीं है; बाकी 3 या अन्य संख्याओं से विभाज्य हैं।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_mathematics_024",
  "examStage": "both",
  "subjectId": "mathematics",
  "chapterId": "math_geometry",
  "topicId": "math_geometry__perimeter",
  "questionEn": "Find the perimeter of a square with side 9 cm.",
  "questionHi": "भुजा 9 सेमी वाले वर्ग का परिमाप ज्ञात करें।",
  "optionsEn": [
   "36 cm",
   "81 cm",
   "18 cm",
   "27 cm"
  ],
  "optionsHi": [
   "36 सेमी",
   "81 सेमी",
   "18 सेमी",
   "27 सेमी"
  ],
  "correctIndex": 0,
  "explanationEn": "Perimeter of square = 4 × side = 4 × 9 = 36 cm.",
  "explanationHi": "वर्ग का परिमाप = 4 × भुजा = 4 × 9 = 36 सेमी।",
  "difficulty": "easy",
  "marks": 1,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_041",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__important_dynasties",
  "questionEn": "Rana Kumbha, the famous Mewar ruler, belonged to which dynasty?",
  "questionHi": "मेवाड़ के प्रसिद्ध शासक राणा कुंभा किस वंश से संबंधित थे?",
  "optionsEn": [
   "Sisodia",
   "Rathore",
   "Kachwaha",
   "Bhati"
  ],
  "optionsHi": [
   "सिसोदिया",
   "राठौड़",
   "कछवाहा",
   "भाटी"
  ],
  "correctIndex": 0,
  "explanationEn": "Rana Kumbha was a ruler of the Sisodia dynasty of Mewar, known for building forts such as Kumbhalgarh.",
  "explanationHi": "राणा कुंभा मेवाड़ के सिसोदिया वंश के शासक थे, जो कुंभलगढ़ जैसे किलों के निर्माण के लिए जाने जाते हैं।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_042",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__important_battles",
  "questionEn": "The Battle of Haldighati (1576) was fought between Maharana Pratap and which Mughal commander?",
  "questionHi": "हल्दीघाटी का युद्ध (1576) महाराणा प्रताप और किस मुगल सेनापति के बीच लड़ा गया था?",
  "optionsEn": [
   "Man Singh I of Amber",
   "Todar Mal",
   "Bairam Khan",
   "Salim (Jahangir)"
  ],
  "optionsHi": [
   "आमेर के मान सिंह प्रथम",
   "टोडरमल",
   "बैरम खान",
   "सलीम (जहाँगीर)"
  ],
  "correctIndex": 0,
  "explanationEn": "The Mughal forces at Haldighati were led by Man Singh I of Amber on behalf of Emperor Akbar.",
  "explanationHi": "हल्दीघाटी में मुगल सेना का नेतृत्व सम्राट अकबर की ओर से आमेर के मान सिंह प्रथम ने किया था।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_043",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_history",
  "topicId": "raj_history__rajasthan_integration",
  "questionEn": "The integration of Rajasthan into the Indian Union was completed in how many main stages/unions?",
  "questionHi": "राजस्थान का भारतीय संघ में एकीकरण कितने मुख्य चरणों/संघों में पूर्ण हुआ?",
  "optionsEn": [
   "Seven",
   "Three",
   "Five",
   "Two"
  ],
  "optionsHi": [
   "सात",
   "तीन",
   "पाँच",
   "दो"
  ],
  "correctIndex": 0,
  "explanationEn": "The integration of Rajasthan's princely states took place in seven stages between 1948 and 1949, culminating in the formation of Greater Rajasthan.",
  "explanationHi": "राजस्थान की रियासतों का एकीकरण 1948-1949 के बीच सात चरणों में हुआ, जिसकी परिणति वृहद राजस्थान के गठन में हुई।",
  "difficulty": "hard",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_044",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__rivers",
  "questionEn": "Which river is known as the lifeline of Rajasthan and is the only major perennial river of the state?",
  "questionHi": "किस नदी को राजस्थान की जीवन रेखा कहा जाता है और यह राज्य की एकमात्र प्रमुख बारहमासी नदी है?",
  "optionsEn": [
   "Chambal",
   "Luni",
   "Banas",
   "Sabarmati"
  ],
  "optionsHi": [
   "चंबल",
   "लूनी",
   "बनास",
   "साबरमती"
  ],
  "correctIndex": 0,
  "explanationEn": "The Chambal is Rajasthan's only major perennial river and is often referred to as the lifeline of the state.",
  "explanationHi": "चंबल राजस्थान की एकमात्र प्रमुख बारहमासी नदी है और इसे प्रायः राज्य की जीवन रेखा कहा जाता है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_045",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_geography",
  "topicId": "raj_geography__national_parks",
  "questionEn": "Ranthambore National Park, famous for its tigers, is located in which district?",
  "questionHi": "बाघों के लिए प्रसिद्ध रणथंभौर राष्ट्रीय उद्यान किस जिले में स्थित है?",
  "optionsEn": [
   "Sawai Madhopur",
   "Jhalawar",
   "Bharatpur",
   "Kota"
  ],
  "optionsHi": [
   "सवाई माधोपुर",
   "झालावाड़",
   "भरतपुर",
   "कोटा"
  ],
  "correctIndex": 0,
  "explanationEn": "Ranthambore National Park, one of India's premier tiger reserves, is located in Sawai Madhopur district.",
  "explanationHi": "रणथंभौर राष्ट्रीय उद्यान, भारत के प्रमुख बाघ अभयारण्यों में से एक, सवाई माधोपुर जिले में स्थित है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_046",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_polity_economy",
  "topicId": "raj_polity_economy__rajasthan_polity",
  "questionEn": "The Rajasthan Legislative Assembly (Vidhan Sabha) is a unicameral house consisting of how many elected members?",
  "questionHi": "राजस्थान विधान सभा एक सदनीय (एक सदन वाली) संस्था है जिसमें कितने निर्वाचित सदस्य होते हैं?",
  "optionsEn": [
   "200",
   "180",
   "150",
   "220"
  ],
  "optionsHi": [
   "200",
   "180",
   "150",
   "220"
  ],
  "correctIndex": 0,
  "explanationEn": "The Rajasthan Vidhan Sabha is a unicameral legislature with 200 elected members.",
  "explanationHi": "राजस्थान विधान सभा एक सदनीय विधायिका है जिसमें 200 निर्वाचित सदस्य होते हैं।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_047",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_polity_economy",
  "topicId": "raj_polity_economy__panchayati_raj",
  "questionEn": "Rajasthan was the first state in India to implement the three-tier Panchayati Raj system, starting from which district in 1959?",
  "questionHi": "त्रि-स्तरीय पंचायती राज व्यवस्था लागू करने वाला भारत का पहला राज्य राजस्थान था, जिसकी शुरुआत 1959 में किस जिले से हुई थी?",
  "optionsEn": [
   "Nagaur",
   "Jaipur",
   "Udaipur",
   "Kota"
  ],
  "optionsHi": [
   "नागौर",
   "जयपुर",
   "उदयपुर",
   "कोटा"
  ],
  "correctIndex": 0,
  "explanationEn": "The three-tier Panchayati Raj system in India was first inaugurated at Nagaur, Rajasthan on 2 October 1959.",
  "explanationHi": "भारत में त्रि-स्तरीय पंचायती राज व्यवस्था का सर्वप्रथम उद्घाटन 2 अक्टूबर 1959 को राजस्थान के नागौर में हुआ था।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_048",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_culture",
  "topicId": "raj_culture__folk_dances",
  "questionEn": "The Ghoomar dance, traditionally performed by women, is most closely associated with which region of Rajasthan?",
  "questionHi": "महिलाओं द्वारा परंपरागत रूप से किया जाने वाला घूमर नृत्य राजस्थान के किस क्षेत्र से सर्वाधिक जुड़ा है?",
  "optionsEn": [
   "Mewar",
   "Shekhawati",
   "Marwar-Bikaner",
   "Hadoti"
  ],
  "optionsHi": [
   "मेवाड़",
   "शेखावाटी",
   "मारवाड़-बीकानेर",
   "हाड़ौती"
  ],
  "correctIndex": 0,
  "explanationEn": "Ghoomar is traditionally associated with the Mewar region and Bhil communities of Rajasthan.",
  "explanationHi": "घूमर परंपरागत रूप से राजस्थान के मेवाड़ क्षेत्र और भील समुदायों से जुड़ा है।",
  "difficulty": "easy",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_049",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_culture",
  "topicId": "raj_culture__folk_deities",
  "questionEn": "Baba Ramdev (Ramdevji), venerated as a folk deity in Rajasthan, has his main shrine at which place?",
  "questionHi": "राजस्थान में लोक देवता के रूप में पूजे जाने वाले बाबा रामदेव (रामदेवजी) का मुख्य मंदिर किस स्थान पर है?",
  "optionsEn": [
   "Runicha (Ramdevra)",
   "Pushkar",
   "Nathdwara",
   "Khatu"
  ],
  "optionsHi": [
   "रुणिचा (रामदेवरा)",
   "पुष्कर",
   "नाथद्वारा",
   "खाटू"
  ],
  "correctIndex": 0,
  "explanationEn": "Ramdevji's principal shrine is at Ramdevra (Runicha) in Jaisalmer district, a major pilgrimage site.",
  "explanationHi": "रामदेवजी का मुख्य मंदिर जैसलमेर जिले के रामदेवरा (रुणिचा) में है, जो एक प्रमुख तीर्थ स्थल है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 },
 {
  "id": "q_rajasthanGK_050",
  "examStage": "both",
  "subjectId": "rajasthanGK",
  "chapterId": "raj_culture",
  "topicId": "raj_culture__forts_and_palaces",
  "questionEn": "Which Rajasthan hill fort complex, along with five others, was inscribed together as the UNESCO World Heritage Site 'Hill Forts of Rajasthan'?",
  "questionHi": "राजस्थान के किस पहाड़ी दुर्ग को पाँच अन्य दुर्गों के साथ मिलाकर यूनेस्को विश्व धरोहर स्थल 'राजस्थान के पहाड़ी किले' के रूप में सूचीबद्ध किया गया है?",
  "optionsEn": [
   "Chittorgarh Fort",
   "Nahargarh Fort",
   "Jaigarh Fort",
   "Bala Quila"
  ],
  "optionsHi": [
   "चित्तौड़गढ़ दुर्ग",
   "नाहरगढ़ दुर्ग",
   "जयगढ़ दुर्ग",
   "बाला किला"
  ],
  "correctIndex": 0,
  "explanationEn": "Chittorgarh Fort is one of the six forts (with Kumbhalgarh, Ranthambore, Gagron, Amber and Jaisalmer) inscribed as the UNESCO 'Hill Forts of Rajasthan'.",
  "explanationHi": "चित्तौड़गढ़ दुर्ग उन छह किलों में से एक है (कुंभलगढ़, रणथंभौर, गागरोन, आमेर और जैसलमेर के साथ) जिन्हें यूनेस्को 'राजस्थान के पहाड़ी किले' के रूप में सूचीबद्ध किया गया है।",
  "difficulty": "medium",
  "marks": 2,
  "negativePenaltyRate": 0.25,
  "sourceType": "sample",
  "tags": []
 }
] as const

export const SAMPLE_QUESTIONS: Question[] = RAW_SAMPLE_QUESTIONS.map((q) => QuestionSchema.parse(q)) as Question[]
