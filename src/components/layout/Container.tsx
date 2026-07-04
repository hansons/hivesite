import type { ElementType, HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  noPadding?: boolean
  as?: ElementType
}

const sizeClasses: Record<NonNullable<ContainerProps['size']>, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  full: 'max-w-none',
}

export function Container({
  size = 'xl',
  noPadding = false,
  as: Tag = 'div',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'w-full mx-auto',
        sizeClasses[size],
        !noPadding && 'px-4 sm:px-6 lg:px-8',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
