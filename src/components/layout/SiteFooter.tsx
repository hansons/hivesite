import { Link } from 'react-router-dom'
import { Container } from './Container'
import { churches } from '@/data/churches'

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-hive-grey-light/40 bg-white">
      <Container>
        <div className="py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <div>
            <div className="font-semibold text-hive-grey-dark mb-2">The Hive</div>
            <p className="text-hive-grey-dark/70 leading-relaxed">
              A network of three small relational churches in Corvallis, Oregon.
            </p>
          </div>

          <div>
            <div className="font-semibold text-hive-grey-dark mb-2">The Three</div>
            <ul className="space-y-1">
              {churches.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/church/${c.slug}`}
                    className="text-hive-grey-dark/70 hover:text-hive-green"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-semibold text-hive-grey-dark mb-2">Get involved</div>
            <ul className="space-y-1">
              <li>
                <Link to="/visit" className="text-hive-grey-dark/70 hover:text-hive-green">
                  Visit
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-hive-grey-dark/70 hover:text-hive-green">
                  About
                </Link>
              </li>
              <li>
                <Link to="/give" className="text-hive-grey-dark/70 hover:text-hive-green">
                  Give
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-hive-grey-dark mb-2">Reach out</div>
            <p className="text-hive-grey-dark/70 leading-relaxed">
              Each church has its own host. The fastest way in is the church
              page; pick the one closest to you.
            </p>
          </div>
        </div>

        <div className="py-4 border-t border-hive-grey-light/40 text-xs text-hive-grey-dark/60">
          © {new Date().getFullYear()} The Hive Communities — prototype build
        </div>
      </Container>
    </footer>
  )
}
