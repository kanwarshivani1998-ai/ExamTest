import { DISCLAIMER } from '@/lib/examConfig'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { bi, useLang } from '@/lib/i18n'

export function About() {
  const { lang } = useLang()
  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-lg font-bold text-white">{bi('About', 'परिचय', lang)}</h1>
      <Card><CardContent className="space-y-2 text-sm text-gray-200">
        <CardTitle>RVUNL Junior Assistant Exam Prep</CardTitle>
        <p>{bi('An offline-first, bilingual exam preparation app for RVUNL Junior Assistant / Commercial Assistant-II.', 'RVUNL कनिष्ठ सहायक / वाणिज्यिक सहायक-II के लिए एक ऑफलाइन-फर्स्ट, द्विभाषी परीक्षा तैयारी ऐप।', lang)}</p>
        <p className="rounded-lg bg-amber-900/30 p-3 text-xs text-amber-800">{bi(DISCLAIMER.en, DISCLAIMER.hi, lang)}</p>
        <p className="text-xs text-gray-400">{bi('This app is an independent study tool and is not affiliated with or endorsed by RVUNL or the Government of Rajasthan. It does not use any official logo or emblem.', 'यह ऐप एक स्वतंत्र अध्ययन उपकरण है और RVUNL या राजस्थान सरकार से संबद्ध या अनुमोदित नहीं है। यह किसी आधिकारिक लोगो या प्रतीक का उपयोग नहीं करता है।', lang)}</p>
        <p className="text-xs text-gray-400">{bi('All sample questions are labelled Sample Question and are not official previous-year papers. AI-generated questions are labelled AI-generated — unverified.', 'सभी अभ्यास प्रश्न "अभ्यास प्रश्न" के रूप में चिह्नित हैं और आधिकारिक पिछले वर्ष के पेपर नहीं हैं। एआई-जनित प्रश्न "एआई-जनित — असत्यापित" के रूप में चिह्नित हैं।', lang)}</p>
      </CardContent></Card>
    </div>
  )
}
