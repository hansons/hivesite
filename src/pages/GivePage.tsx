import { ExternalLink } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'
import { churches } from '@/data/churches'
import { cn } from '@/lib/cn'

const accentBar: Record<string, string> = {
  green: 'bg-hive-green',
  purple: 'bg-hive-purple',
  teal: 'bg-hive-teal',
}

const accentBtn: Record<string, string> = {
  green: 'bg-hive-green hover:bg-hive-green/90',
  purple: 'bg-hive-purple hover:bg-hive-purple/90',
  teal: 'bg-hive-teal hover:bg-hive-teal/90',
}

export function GivePage() {
  return (
    <>
      <PageHeader
        title="Give"
        description="Each church receives giving on its own. Pick the one you're connected to."
        accent="purple"
      />
      <Container size="md" className="py-12">
        <div className="space-y-6">
          {churches.map((church) => (
            <div
              key={church.slug}
              className="bg-white rounded-[var(--radius-smooth)] p-5 ring-1 ring-hive-grey-light/40 shadow-soft"
            >
              <div
                className={cn('h-1 w-12 rounded-full mb-3', accentBar[church.accentColor])}
                aria-hidden
              />
              <h2 className="text-lg font-semibold text-hive-grey-dark mb-2">
                {church.name}
              </h2>
              {church.givingUrl ? (
                <a
                  href={church.givingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-[var(--radius-smooth)] text-white font-medium transition-colors',
                    accentBtn[church.accentColor],
                  )}
                >
                  Give to {church.shortName}
                  <ExternalLink size={16} aria-hidden />
                </a>
              ) : (
                <p className="text-sm text-hive-grey-dark/70 italic">
                  Online giving link not yet configured. Reach out to{' '}
                  {church.primaryContactName} via the{' '}
                  <a
                    href={`/church/${church.slug}`}
                    className="underline text-hive-grey-dark hover:text-hive-green"
                  >
                    {church.name} page
                  </a>{' '}
                  and they can point you to the right place.
                </p>
              )}
            </div>
          ))}

          <div className="bg-hive-green-translucent rounded-[var(--radius-smooth)] p-5 text-sm text-hive-grey-dark/85 leading-relaxed">
            <p>
              The Hive itself does not collect giving — only the three churches
              do, individually. Giving stays local to the church you're part
              of. Tax receipts come from the church directly.
            </p>
          </div>

          <p className="text-sm text-hive-grey-dark/60 italic pt-6">
            Placeholder — actual giving links collected during onboarding.
          </p>
        </div>
      </Container>
    </>
  )
}
