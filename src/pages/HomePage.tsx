import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { churches } from '@/data/churches'
import { cn } from '@/lib/cn'

const accentRing: Record<string, string> = {
  green: 'ring-hive-green/30 hover:ring-hive-green',
  purple: 'ring-hive-purple/30 hover:ring-hive-purple',
  teal: 'ring-hive-teal/30 hover:ring-hive-teal',
}

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

const accentTextHover: Record<string, string> = {
  green: 'group-hover:text-hive-green',
  purple: 'group-hover:text-hive-purple',
  teal: 'group-hover:text-hive-teal',
}

export function HomePage() {
  return (
    <>
      <section className="organic-bg py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <div className="h-1 w-16 bg-hive-green rounded-full mb-6" aria-hidden />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-hive-grey-dark">
              Three small churches.{' '}
              <span className="text-hive-green">One Hive.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-hive-grey-dark/80 leading-relaxed">
              The Hive is a network of three relational churches in Corvallis,
              Oregon. Each is small enough to know everyone by name. Together
              we share teaching, life, and a way of following Jesus that
              doesn't require a building.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/visit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-[var(--radius-smooth)] bg-hive-green text-white font-medium shadow-soft hover:bg-hive-green/90 transition-colors"
              >
                I'm new — how do I visit?
                <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-[var(--radius-smooth)] border border-hive-grey-light text-hive-grey-dark hover:border-hive-green hover:text-hive-green transition-colors"
              >
                What is The Hive?
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-hive-grey-dark">
              Find your church
            </h2>
            <p className="mt-2 text-hive-grey-dark/70">
              Three different homes in the same family. Pick the one closest
              to you, or whichever vibe feels right.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {churches.map((church) => (
              <Link
                key={church.slug}
                to={`/church/${church.slug}`}
                className={cn(
                  'group bg-white rounded-[var(--radius-smooth)] p-6 ring-1 transition-all shadow-soft hover:shadow-medium',
                  accentRing[church.accentColor],
                )}
              >
                <div
                  className={cn('h-1 w-12 rounded-full mb-4', accentBar[church.accentColor])}
                  aria-hidden
                />
                <h3
                  className={cn(
                    'text-xl font-semibold mb-1 transition-colors text-hive-grey-dark',
                    accentTextHover[church.accentColor],
                  )}
                >
                  {church.name}
                </h3>
                <p className="text-sm text-hive-grey-dark/70 italic mb-3">
                  {church.tagline}
                </p>
                <p className="text-sm text-hive-grey-dark/80 leading-relaxed">
                  {church.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {church.vibe.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-hive-grey-light/30 text-hive-grey-dark/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className={cn(
                    'mt-5 inline-flex items-center gap-1 text-sm font-medium',
                    accentText[church.accentColor],
                  )}
                >
                  Learn more <ArrowRight size={14} aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
