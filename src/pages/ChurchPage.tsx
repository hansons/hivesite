import { Link, useParams } from 'react-router-dom'
import { Clock, MapPin, User, ArrowLeft } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'
import { ChatRailButtons } from '@/components/chat/ChatRailButtons'
import { getChurchBySlug } from '@/data/churches'
import { cn } from '@/lib/cn'

const accentBar: Record<string, string> = {
  green: 'bg-hive-green',
  purple: 'bg-hive-purple',
  teal: 'bg-hive-teal',
}

const accentText: Record<string, string> = {
  green: 'text-hive-green',
  purple: 'text-hive-purple',
  teal: 'text-hive-teal',
}

const accentTranslucent: Record<string, string> = {
  green: 'bg-hive-green-translucent',
  purple: 'bg-hive-purple-translucent',
  teal: 'bg-hive-teal-translucent',
}

export function ChurchPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const church = getChurchBySlug(slug)

  if (!church) {
    return (
      <Container className="py-16">
        <h1 className="text-2xl font-semibold text-hive-grey-dark mb-4">
          Church not found
        </h1>
        <p className="text-hive-grey-dark/70 mb-6">
          We don't have a church with that name. The Hive has three:
          Green Tree, The Spring, and Corpus Christi.
        </p>
        <Link to="/" className="text-hive-green hover:underline inline-flex items-center gap-1">
          <ArrowLeft size={16} aria-hidden /> Back home
        </Link>
      </Container>
    )
  }

  return (
    <>
      <PageHeader
        title={church.name}
        description={church.tagline}
        accent={church.accentColor}
        size="lg"
      >
        <div className="flex flex-wrap gap-2">
          {church.vibe.map((tag) => (
            <span
              key={tag}
              className={cn(
                'text-xs px-2.5 py-1 rounded-full font-medium',
                accentTranslucent[church.accentColor],
                accentText[church.accentColor],
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </PageHeader>

      <Container size="md" className="py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-hive-grey-dark mb-3">
                What this church is like
              </h2>
              <p className="text-hive-grey-dark/85 leading-relaxed">
                {church.description}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-hive-grey-dark mb-3">
                Stay in the loop
              </h2>
              <p className="text-hive-grey-dark/85 leading-relaxed mb-4">
                Most members chat in WhatsApp. The younger folks lean toward
                Discord. Pick whichever you actually use — both are fine, both
                go to the same people.
              </p>
              <ChatRailButtons
                whatsappUrl={church.whatsappInviteUrl}
                discordUrl={church.discordInviteUrl}
              />
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-white rounded-[var(--radius-smooth)] p-5 ring-1 ring-hive-grey-light/40 shadow-soft">
              <div
                className={cn('h-1 w-12 rounded-full mb-4', accentBar[church.accentColor])}
                aria-hidden
              />
              <h3 className="font-semibold text-hive-grey-dark mb-3">When & where</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <Clock size={16} className="mt-0.5 text-hive-grey-dark/60 shrink-0" aria-hidden />
                  <span className="text-hive-grey-dark/85">{church.meetingTime}</span>
                </li>
                <li className="flex gap-2">
                  <MapPin size={16} className="mt-0.5 text-hive-grey-dark/60 shrink-0" aria-hidden />
                  <div>
                    <div className="text-hive-grey-dark/85">{church.location}</div>
                    {church.locationDetail && (
                      <div className="text-hive-grey-dark/60 text-xs mt-0.5">
                        {church.locationDetail}
                      </div>
                    )}
                  </div>
                </li>
                <li className="flex gap-2">
                  <User size={16} className="mt-0.5 text-hive-grey-dark/60 shrink-0" aria-hidden />
                  <div>
                    <div className="text-hive-grey-dark/85">
                      {church.primaryContactName}
                    </div>
                    <div className="text-hive-grey-dark/60 text-xs">
                      {church.primaryContactRole}
                    </div>
                    {church.primaryContactEmail && (
                      <a
                        href={`mailto:${church.primaryContactEmail}`}
                        className="text-xs text-hive-green hover:underline mt-1 inline-block"
                      >
                        {church.primaryContactEmail}
                      </a>
                    )}
                  </div>
                </li>
              </ul>
            </div>

            <Link
              to="/visit"
              className="block text-center px-4 py-3 rounded-[var(--radius-smooth)] border border-hive-grey-light text-hive-grey-dark hover:border-hive-green hover:text-hive-green transition-colors"
            >
              First time here? Read this
            </Link>
          </aside>
        </div>
      </Container>
    </>
  )
}
