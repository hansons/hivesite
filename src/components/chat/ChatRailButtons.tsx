import { MessageCircle, MessagesSquare } from 'lucide-react'
import { cn } from '@/lib/cn'

interface ChatRailButtonsProps {
  whatsappUrl?: string
  discordUrl?: string
  layout?: 'row' | 'column'
  size?: 'sm' | 'md'
  className?: string
}

/*
  Renders the dual-rail chat entrypoints: WhatsApp (primary, most members)
  and Discord (secondary, younger cohort). Both deep-link out — the PWA does
  not host a native DM surface. See REQUIREMENTS.md §11 for the full rationale.

  If a URL is missing the corresponding button degrades to a "coming soon"
  placeholder rather than disappearing — that signals to the content owner
  that the field still needs to be filled in.
*/

export function ChatRailButtons({
  whatsappUrl,
  discordUrl,
  layout = 'row',
  size = 'md',
  className,
}: ChatRailButtonsProps) {
  const sizeClasses = size === 'sm' ? 'text-sm py-2 px-3' : 'text-base py-3 px-4'

  return (
    <div
      className={cn(
        'flex gap-3',
        layout === 'column' ? 'flex-col' : 'flex-col sm:flex-row',
        className,
      )}
    >
      <ChatButton
        href={whatsappUrl}
        platform="WhatsApp"
        helper="Most members"
        bgClass="bg-[#25D366] hover:bg-[#1da851]"
        Icon={MessageCircle}
        sizeClasses={sizeClasses}
      />
      <ChatButton
        href={discordUrl}
        platform="Discord"
        helper="Younger cohort"
        bgClass="bg-[#5865F2] hover:bg-[#3f4ce0]"
        Icon={MessagesSquare}
        sizeClasses={sizeClasses}
      />
    </div>
  )
}

interface ChatButtonProps {
  href?: string
  platform: string
  helper: string
  bgClass: string
  sizeClasses: string
  Icon: typeof MessageCircle
}

function ChatButton({ href, platform, helper, bgClass, sizeClasses, Icon }: ChatButtonProps) {
  if (!href) {
    return (
      <div
        className={cn(
          'flex items-center gap-2 rounded-[var(--radius-smooth)] font-medium border border-hive-grey-light text-hive-grey-dark/60',
          sizeClasses,
        )}
        title={`${platform} link not yet configured`}
      >
        <Icon size={18} aria-hidden />
        <div className="flex flex-col leading-tight">
          <span>{platform}</span>
          <span className="text-xs opacity-70">link coming soon</span>
        </div>
      </div>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center gap-2 rounded-[var(--radius-smooth)] font-medium text-white shadow-soft transition-colors',
        bgClass,
        sizeClasses,
      )}
    >
      <Icon size={18} aria-hidden />
      <div className="flex flex-col leading-tight">
        <span>Join {platform}</span>
        <span className="text-xs opacity-90">{helper}</span>
      </div>
    </a>
  )
}
