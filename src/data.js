// All invitation copy and media paths live here.
export const WEDDING_DATE = new Date('2026-12-03T08:48:00+05:30')

export const couple = {
  groom: 'Nagendra',
  bride: 'Sravya',
  groomFull: 'Nagendra Singamreddy',
  brideFull: 'Dr. Sravya Reddy Kovvuri',
  groomParents: 'Mr. Nageswara Reddy & Mrs. Chinnari',
  brideParents: 'Mr. Venkat Reddy & Mrs. Sridevi',
}

export const media = {
  openingVideo: '/media/nagendra-shravya-opening.mp4',
  openingPoster: '/images/opening-first-frame.jpg',
  hero: '/images/hero-clasped-hands.jpg',
  poojaBride: '/images/pooja-bride.jpg',
  poojaGroom: '/images/pooja-groom.jpg',
  ring: '/images/ring-couple.jpg',
  footer: '/images/hero-clasped-hands.jpg',
  lunch: '/images/lunch-banana-leaf.jpg',
}

export const venue = {
  name: 'A Plus Convention',
  city: 'Vijayawada, Andhra Pradesh',
  mapQuery: 'A Plus Convention Vijayawada',
}

export const events = [
  { name: 'Ganesh Pooja', date: 'Thursday, 3 December 2026', time: '8:48 AM', venue: 'A Plus Convention, Vijayawada', note: 'Here we start with Ganesh Pooja, a sacred beginning with the blessings of Lord Vishnu and Goddess Lakshmi.', icon: '❋' },
  { name: 'Ring Ceremony', date: 'Thursday, 3 December 2026', time: '9:00 AM', venue: 'A Plus Convention, Vijayawada', note: 'Followed by the exchange of rings, the moment two families become one.', icon: '✦' },
  { name: 'Lunch', date: 'Thursday, 3 December 2026', time: 'Following the ceremony', venue: 'A Plus Convention, Vijayawada', note: 'Join the celebration with a delicious banthi bhojanam.', icon: '❧', image: 'lunch' },
]

// Floating lantern atmosphere: position (%), parallax depth, scale, blur (px).
export const atmosphereLanterns = [
  { x: 6, y: 12, d: 0.22, s: 0.62, b: 2.2 },
  { x: 89, y: 20, d: 0.35, s: 0.78, b: 1.4 },
  { x: 12, y: 42, d: 0.7, s: 1.05, b: 0.4 },
  { x: 93, y: 55, d: 0.28, s: 0.58, b: 2.6 },
  { x: 4, y: 72, d: 1, s: 1.35, b: 0.2 },
  { x: 87, y: 84, d: 0.62, s: 0.92, b: 0.8 },
  { x: 48, y: 64, d: 0.18, s: 0.42, b: 3.2 },
]
