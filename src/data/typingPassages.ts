export interface TypingPassage {
  id: string
  lang: 'hi' | 'en'
  mode: 'speed' | 'efficiency'
  text: string
}

export const TYPING_PASSAGES: TypingPassage[] = [
  {
    id: 'en_speed_1',
    lang: 'en',
    mode: 'speed',
    text: 'The Rajasthan Vidyut Utpadan Nigam Limited plays a vital role in generating electricity for the state. A dedicated and skilled workforce ensures that power reaches every home, farm and industry across Rajasthan. Regular practice and consistent effort are the keys to improving typing speed and accuracy over time.'
  },
  {
    id: 'en_speed_2',
    lang: 'en',
    mode: 'speed',
    text: 'Good preparation requires discipline, patience and a clear daily routine. Candidates should divide their time wisely between reading the syllabus, solving practice questions, revising weak topics and taking full-length mock tests before the final examination day arrives.'
  },
  {
    id: 'en_efficiency_1',
    lang: 'en',
    mode: 'efficiency',
    text: 'Dear Sir, With reference to your letter dated 12th March, I would like to inform you that the requested documents have been attached herewith for your kind perusal. Please confirm receipt of the same at your earliest convenience. Thanking you, Yours faithfully.'
  },
  {
    id: 'hi_speed_1',
    lang: 'hi',
    mode: 'speed',
    text: 'राजस्थान विद्युत उत्पादन निगम लिमिटेड राज्य में बिजली उत्पादन की दिशा में एक महत्वपूर्ण भूमिका निभाता है। एक समर्पित एवं कुशल कार्यबल यह सुनिश्चित करता है कि राजस्थान के हर घर, खेत और उद्योग तक बिजली पहुंचे। निरंतर अभ्यास और लगातार प्रयास ही टाइपिंग की गति और शुद्धता बढ़ाने की कुंजी हैं।'
  },
  {
    id: 'hi_speed_2',
    lang: 'hi',
    mode: 'speed',
    text: 'अच्छी तैयारी के लिए अनुशासन, धैर्य और एक स्पष्ट दैनिक दिनचर्या आवश्यक है। अभ्यर्थियों को अपना समय बुद्धिमानी से पाठ्यक्रम पढ़ने, अभ्यास प्रश्न हल करने, कमजोर विषयों की पुनरावृत्ति करने और अंतिम परीक्षा से पहले पूर्ण मॉक टेस्ट देने में बांटना चाहिए।'
  },
  {
    id: 'hi_efficiency_1',
    lang: 'hi',
    mode: 'efficiency',
    text: 'सेवा में, श्रीमान कार्यालय अधीक्षक महोदय, विषय: प्रमाण पत्र जारी करने हेतु प्रार्थना पत्र। महोदय, सविनय निवेदन है कि मुझे मेरा अनुभव प्रमाण पत्र आवश्यकतानुसार शीघ्र प्रदान करने की कृपा करें। धन्यवाद सहित, भवदीय।'
  }
]

export function getPassageFor(lang: 'hi' | 'en', mode: 'speed' | 'efficiency'): TypingPassage {
  const options = TYPING_PASSAGES.filter((p) => p.lang === lang && p.mode === mode)
  return options[Math.floor(Math.random() * options.length)] ?? TYPING_PASSAGES[0]
}
