import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/layout/Container'

export function NotFoundPage() {
  return (
    <Container className="py-24 text-center">
      <div className="h-1 w-16 bg-hive-purple rounded-full mb-6 mx-auto" aria-hidden />
      <h1 className="text-3xl font-semibold text-hive-grey-dark mb-4">
        Page not found
      </h1>
      <p className="text-hive-grey-dark/70 mb-8 max-w-md mx-auto">
        The page you were looking for doesn't exist — maybe a typo, maybe a
        link we haven't built yet.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-[var(--radius-smooth)] bg-hive-green text-white font-medium hover:bg-hive-green/90 transition-colors"
      >
        <ArrowLeft size={18} aria-hidden /> Back home
      </Link>
    </Container>
  )
}
