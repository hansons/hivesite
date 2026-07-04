import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'
import { churches } from '@/data/churches'
import { cn } from '@/lib/cn'

const accentBg: Record<string, string> = {
  green: 'bg-hive-green',
  purple: 'bg-hive-purple',
  teal: 'bg-hive-teal',
}

export function VisitPage() {
  return (
    <>
      <PageHeader
        title="I'm new — how do I visit?"
        description="No quizzes, no awkward stand-up moments, no name tags unless you want one. Here's the actual deal."
        accent="teal"
      />
      <Container size="md" className="py-12">
        <div className="space-y-8 text-hive-grey-dark/90 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-hive-grey-dark mb-3">
              Step 1 — Pick a church
            </h2>
            <p className="mb-4">
              Each of the three has its own feel. Read the per-church pages
              and pick the one that sounds like the kind of place you'd want
              to walk into.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {churches.map((c) => (
                <Link
                  key={c.slug}
                  to={`/church/${c.slug}`}
                  className="bg-white rounded-[var(--radius-smooth)] p-4 ring-1 ring-hive-grey-light/40 hover:ring-hive-green shadow-soft transition-all"
                >
                  <div
                    className={cn('h-1 w-10 rounded-full mb-2', accentBg[c.accentColor])}
                    aria-hidden
                  />
                  <div className="font-semibold text-hive-grey-dark">{c.name}</div>
                  <div className="text-sm text-hive-grey-dark/70 italic mt-1">
                    {c.tagline}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-hive-grey-dark mb-3">
              Step 2 — Reach out to a person, not a form
            </h2>
            <p>
              Each church has a host listed on its page. Send them an email
              or text. They'll tell you when and where to show up, what kids
              do, and answer anything you're wondering before walking in. We
              don't have a centralized "new visitor" pipeline because we
              don't have a centralized anything. Real person, real reply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-hive-grey-dark mb-3">
              Step 3 — Show up
            </h2>
            <p>
              Wear what you'd wear to a friend's house — because that's where
              we meet. Bring your kids; we'll figure out the kid situation
              together. Eat the food. Ask questions. Stay as long as feels
              good. Come back, or don't. There's no commitment ladder.
            </p>
          </section>

          <section className="bg-hive-green-translucent rounded-[var(--radius-smooth)] p-5">
            <h2 className="text-lg font-semibold text-hive-grey-dark mb-2">
              Common questions
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-semibold">"Are kids welcome?"</dt>
                <dd className="text-hive-grey-dark/80">
                  Yes. Kid logistics vary by church — confirm with the host.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">"Will I be made to talk?"</dt>
                <dd className="text-hive-grey-dark/80">
                  No. You can come and just be there. Nobody calls on you.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">"What if I'm not sure about Christianity?"</dt>
                <dd className="text-hive-grey-dark/80">
                  Welcome. The Spring especially is shaped for people who are
                  questioning, returning, or somewhere between.
                </dd>
              </div>
            </dl>
          </section>

          <p className="text-sm text-hive-grey-dark/60 italic pt-6">
            Placeholder copy for the prototype — leadership confirms before launch.
          </p>
        </div>
      </Container>
    </>
  )
}
