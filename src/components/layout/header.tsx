import Link from 'next/link';

export function Header() {
  return (
    <header className="py-6 px-4 md:px-8 border-b bg-card shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <a href="https://www.darukaa.earth/" target="_blank" rel="noopener noreferrer" className="flex items-center">
          <img src="https://www.darukaa.earth/images/logo.png" alt="Darukaa Logo" className="h-10" />
        </a>
        {/* <h1 className="text-2xl font-bold text-foreground">Daruka Chat</h1> */}
        {/* Navigation items can be added here if needed */}
      </div>
    </header>
  );
}