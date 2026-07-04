import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

interface PageHeaderProps {
  title: string
  description?: string
  alignment?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
  accent?: 'green' | 'purple' | 'teal' | 'none'
  className?: string
  children?: ReactNode
}

const sizeClasses: Record<NonNullable<PageHeaderProps['size']>, string> = {
  sm: 'py-8 sm:py-10',
  md: 'py-12 sm:py-16',
  lg: 'py-16 sm:py-24',
}

const accentBars: Record<NonNullable<PageHeaderProps['accent']>, string> = {
  green: 'bg-hive-green',
  purple: 'bg-hive-purple',
  teal: 'bg-hive-teal',
  none: '',
}

export function PageHeader({
  title,
  description,
  alignment = 'left',
  size = 'md',
  accent = 'none',
  className,
  children,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'organic-bg border-b border-hive-grey-light/40',
        sizeClasses[size],
        className,
      )}
    >
      <Container>
        <div className={cn(alignment === 'center' && 'text-center')}>
          {accent !== 'none' && (
            <div
              className={cn(
                'h-1 w-16 rounded-full mb-4',
                accentBars[accent],
                alignment === 'center' && 'mx-auto',
              )}
              aria-hidden
            />
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-hive-grey-dark">
            {title}
          </h1>
          {description && (
            <p className="mt-3 text-base sm:text-lg text-hive-grey-dark/80 max-w-2xl">
              {description}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </Container>
    </header>
  )
}
