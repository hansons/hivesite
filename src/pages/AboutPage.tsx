import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'

export function AboutPage() {
  return (
    <>
      <PageHeader
        title="About The Hive"
        description="A network of three small relational churches in Corvallis, Oregon."
        accent="green"
      />
      <Container size="md" className="py-12">
        <div className="max-w-none space-y-6 text-hive-grey-dark/90 leading-relaxed">
          <p>
            The Hive is not a church plant. It's not a megachurch satellite. It
            isn't a denomination. It's three small relational churches that
            chose to share a common life rather than each go it alone.
          </p>
          <p>
            Each of the three — Green Tree, The Spring, and Corpus Christi —
            meets in a host home, gathers around shared meals and prayer, and
            keeps the gathering small enough that people can actually know
            each other. The three churches share teaching resources,
            occasional joint gatherings, and a common posture toward the
            neighborhood. Beyond that, each one is its own thing with its own
            character.
          </p>

          <h2 className="text-xl font-semibold text-hive-grey-dark pt-4">
            Why three, not one?
          </h2>
          <p>
            Because a church that's small enough to know everyone is a
            different kind of church than one that isn't. We didn't want to
            grow past that line. When a church gets large enough that names
            stop being known, we'd rather plant another small one.
          </p>

          <h2 className="text-xl font-semibold text-hive-grey-dark pt-4">
            What we share
          </h2>
          <ul className="list-disc list-inside space-y-2 text-hive-grey-dark/85">
            <li>A common faith — historic Christian, ecumenically held</li>
            <li>Teaching resources and occasional joint gatherings</li>
            <li>A commitment to the city of Corvallis and its neighborhoods</li>
            <li>The conviction that small is its own kind of strength</li>
          </ul>

          <h2 className="text-xl font-semibold text-hive-grey-dark pt-4">
            What's distinct
          </h2>
          <p>
            Each church has its own host, its own rhythm, and its own feel.
            Green Tree leans toward shared meals and neighborhood presence.
            The Spring is contemplative and especially welcoming to people
            stepping back into church after time away. Corpus Christi is
            liturgical and table-centered. Visit a church page to see which
            one fits.
          </p>

          <p className="text-sm text-hive-grey-dark/60 italic pt-6">
            This page is placeholder copy for the prototype. Final language
            will come from leadership during intake.
          </p>
        </div>
      </Container>
    </>
  )
}
