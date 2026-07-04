export interface Church {
  slug: 'green-tree' | 'spring' | 'corpus-christi'
  name: string
  shortName: string
  tagline: string
  description: string
  meetingTime: string
  location: string
  locationDetail?: string
  mapUrl?: string
  primaryContactName: string
  primaryContactRole: string
  primaryContactEmail?: string
  accentColor: 'green' | 'purple' | 'teal'
  givingUrl?: string
  whatsappInviteUrl?: string
  discordInviteUrl?: string
  vibe: string[]
}

export interface Announcement {
  id: string
  churchSlug?: Church['slug'] | 'network'
  title: string
  body: string
  postedAt: string
  postedBy: string
  pinned?: boolean
}

export interface Event {
  id: string
  churchSlug?: Church['slug'] | 'network'
  title: string
  description?: string
  startsAt: string
  endsAt?: string
  location?: string
  category: 'service' | 'small-group' | 'community' | 'kids' | 'special'
  isPublic: boolean
}
