import type { Church } from '@/types'

/*
  Mock data for the three Hive churches.

  Names, contacts, and meeting details are PLACEHOLDERS pending leadership
  intake (see leadership-intake.md). Do NOT publish this data — verify each
  field with leadership before any non-prototype use. The website thehive.org
  is known to be obsolete; assume nothing carried over from there is current.

  Branding (vibe descriptors, accent colors) is invented for layout purposes
  and should be replaced with what each church actually wants to project.
*/

export const churches: Church[] = [
  {
    slug: 'green-tree',
    name: 'Green Tree',
    shortName: 'Green Tree',
    tagline: 'Rooted in place, growing together.',
    description:
      'Green Tree is a small relational gathering focused on shared meals, neighborhood presence, and slow discipleship.',
    meetingTime: 'Sundays — time TBD with leadership',
    location: 'Corvallis, OR',
    locationDetail: 'Host home; address shared after first contact',
    primaryContactName: 'TBD',
    primaryContactRole: 'Host / Lead',
    accentColor: 'green',
    vibe: ['neighborhood', 'shared meals', 'small'],
  },
  {
    slug: 'spring',
    name: 'The Spring',
    shortName: 'The Spring',
    tagline: 'A source for those who are thirsty.',
    description:
      'The Spring meets in a host home for worship, conversation, and prayer. Especially welcoming to people who have stepped away from formal church.',
    meetingTime: 'Sundays — time TBD with leadership',
    location: 'Corvallis, OR',
    locationDetail: 'Host home; address shared after first contact',
    primaryContactName: 'TBD',
    primaryContactRole: 'Host / Lead',
    accentColor: 'teal',
    vibe: ['contemplative', 'questions welcome', 'small'],
  },
  {
    slug: 'corpus-christi',
    name: 'Corpus Christi',
    shortName: 'Corpus Christi',
    tagline: 'The body of Christ, broken and given.',
    description:
      'Corpus Christi gathers around the table — communion, teaching, and shared life. A liturgical thread runs through everything we do.',
    meetingTime: 'Sundays — time TBD with leadership',
    location: 'Corvallis, OR',
    locationDetail: 'Host home; address shared after first contact',
    primaryContactName: 'TBD',
    primaryContactRole: 'Host / Lead',
    accentColor: 'purple',
    vibe: ['liturgical', 'table-centered', 'small'],
  },
]

export function getChurchBySlug(slug: string): Church | undefined {
  return churches.find((c) => c.slug === slug)
}
