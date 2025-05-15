import Link from 'next/link';
import { DarukaLogo } from '@/components/icons/logo';

export function Header() {
  return (
    <header className="py-6 px-4 md:px-8 border-b bg-card shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <DarukaLogo className="h-10 w-10 text-primary group-hover:text-accent transition-colors" />
          <h1 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
            Daruka Chat
          </h1>
        </Link>
        {/* Navigation items can be added here if needed */}
      </div>
    </header>
  );
}
