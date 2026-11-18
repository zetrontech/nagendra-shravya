export function downloadWeddingIcs() {
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Zetron Tech//Invitation//EN',
    'BEGIN:VEVENT',
    'UID:nagendra-sravya-engagement-20261203@zetron.in',
    'DTSTAMP:20261117T000000Z',
    'DTSTART:20261203T031800Z',
    'DTEND:20261203T073000Z',
    'SUMMARY:Nagendra & Sravya — Engagement',
    'LOCATION:A Plus Convention\\, Vijayawada',
    'DESCRIPTION:Pooja at 8:48 AM followed by the ring ceremony and lunch.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' }))
  a.download = 'nagendra-sravya-engagement.ics'
  a.click()
  URL.revokeObjectURL(a.href)
}
