import { useRef, useState } from 'react'
import { db } from '@/db/db'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { bi, useLang } from '@/lib/i18n'

const BACKUP_VERSION = 1

export function Backup() {
  const { lang } = useLang()
  const fileRef = useRef<HTMLInputElement>(null)
  const [confirmRestore, setConfirmRestore] = useState<File | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  async function exportBackup() {
    const [subjects, chapters, topics, questions, questionStats, testSessions, testResults, plannerTasks, typingResults, userProfile] =
      await Promise.all([
        db.subjects.toArray(), db.chapters.toArray(), db.topics.toArray(), db.questions.toArray(),
        db.questionStats.toArray(), db.testSessions.toArray(), db.testResults.toArray(),
        db.plannerTasks.toArray(), db.typingResults.toArray(), db.userProfile.toArray()
      ])
    const payload = {
      version: BACKUP_VERSION, exportedAt: new Date().toISOString(),
      data: { subjects, chapters, topics, questions, questionStats, testSessions, testResults, plannerTasks, typingResults, userProfile }
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rvunl-prep-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setStatus(bi('Backup downloaded.', 'बैकअप डाउनलोड हो गया।', lang))
  }

  async function doRestore(file: File) {
    try {
      const text = await file.text()
      const payload = JSON.parse(text)
      const d = payload.data ?? payload
      await db.transaction('rw', db.tables, async () => {
        if (d.subjects) { await db.subjects.clear(); await db.subjects.bulkPut(d.subjects) }
        if (d.chapters) { await db.chapters.clear(); await db.chapters.bulkPut(d.chapters) }
        if (d.topics) { await db.topics.clear(); await db.topics.bulkPut(d.topics) }
        if (d.questions) { await db.questions.clear(); await db.questions.bulkPut(d.questions) }
        if (d.questionStats) { await db.questionStats.clear(); await db.questionStats.bulkPut(d.questionStats) }
        if (d.testSessions) { await db.testSessions.clear(); await db.testSessions.bulkPut(d.testSessions) }
        if (d.testResults) { await db.testResults.clear(); await db.testResults.bulkPut(d.testResults) }
        if (d.plannerTasks) { await db.plannerTasks.clear(); await db.plannerTasks.bulkPut(d.plannerTasks) }
        if (d.typingResults) { await db.typingResults.clear(); await db.typingResults.bulkPut(d.typingResults) }
        if (d.userProfile) { await db.userProfile.clear(); await db.userProfile.bulkPut(d.userProfile) }
      })
      setStatus(bi('Restore complete. Reloading...', 'पुनर्स्थापना पूर्ण। पुनः लोड हो रहा है...', lang))
      setTimeout(() => window.location.reload(), 1000)
    } catch (e) {
      setStatus(bi('Restore failed: invalid backup file.', 'पुनर्स्थापना विफल: अमान्य बैकअप फ़ाइल।', lang))
    }
    setConfirmRestore(null)
  }

  async function resetAllData() {
    await db.delete()
    window.location.reload()
  }

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-lg font-bold text-gray-900">{bi('Data Backup', 'डेटा बैकअप', lang)}</h1>
      <Card><CardContent className="space-y-3">
        <CardTitle>{bi('Export', 'निर्यात करें', lang)}</CardTitle>
        <p className="text-xs text-gray-500">{bi('Download all your offline study data as a JSON file.', 'अपना सारा ऑफलाइन अध्ययन डेटा JSON फ़ाइल के रूप में डाउनलोड करें।', lang)}</p>
        <Button onClick={exportBackup}>{bi('Export Backup', 'बैकअप निर्यात करें', lang)}</Button>
      </CardContent></Card>

      <Card><CardContent className="space-y-3">
        <CardTitle>{bi('Restore', 'पुनर्स्थापित करें', lang)}</CardTitle>
        <p className="text-xs text-gray-500">{bi('Restoring will overwrite your current data.', 'पुनर्स्थापित करने से आपका वर्तमान डेटा अधिलेखित हो जाएगा।', lang)}</p>
        <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && setConfirmRestore(e.target.files[0])} />
        <Button variant="outline" onClick={() => fileRef.current?.click()}>{bi('Choose Backup File', 'बैकअप फ़ाइल चुनें', lang)}</Button>
      </CardContent></Card>

      <Card><CardContent className="space-y-3">
        <CardTitle className="text-red-600">{bi('Reset All Data', 'सभी डेटा रीसेट करें', lang)}</CardTitle>
        <p className="text-xs text-gray-500">{bi('Permanently deletes all your offline data on this device.', 'इस डिवाइस पर आपका सारा ऑफलाइन डेटा स्थायी रूप से हटा देता है।', lang)}</p>
        <Button variant="destructive" onClick={() => setConfirmReset(true)}>{bi('Reset All Data', 'सभी डेटा रीसेट करें', lang)}</Button>
      </CardContent></Card>

      {status && <p className="text-xs text-brand-700">{status}</p>}

      <Dialog open={!!confirmRestore} onClose={() => setConfirmRestore(null)} title={bi('Restore backup?', 'बैकअप पुनर्स्थापित करें?', lang)}
        footer={<>
          <Button variant="outline" onClick={() => setConfirmRestore(null)}>{bi('Cancel', 'रद्द करें', lang)}</Button>
          <Button variant="destructive" onClick={() => confirmRestore && doRestore(confirmRestore)}>{bi('Restore (overwrite data)', 'पुनर्स्थापित करें (डेटा अधिलेखित)', lang)}</Button>
        </>}>
        {bi('This will replace your current offline data with the backup file contents. This cannot be undone.', 'यह आपके वर्तमान ऑफलाइन डेटा को बैकअप फ़ाइल की सामग्री से बदल देगा। यह पूर्ववत नहीं किया जा सकता।', lang)}
      </Dialog>

      <Dialog open={confirmReset} onClose={() => setConfirmReset(false)} title={bi('Reset all data?', 'सभी डेटा रीसेट करें?', lang)}
        footer={<>
          <Button variant="outline" onClick={() => setConfirmReset(false)}>{bi('Cancel', 'रद्द करें', lang)}</Button>
          <Button variant="destructive" onClick={resetAllData}>{bi('Delete Everything', 'सब कुछ हटाएं', lang)}</Button>
        </>}>
        {bi('This permanently deletes all data on this device. This cannot be undone.', 'यह इस डिवाइस पर सभी डेटा को स्थायी रूप से हटा देता है। यह पूर्ववत नहीं किया जा सकता।', lang)}
      </Dialog>
    </div>
  )
}
