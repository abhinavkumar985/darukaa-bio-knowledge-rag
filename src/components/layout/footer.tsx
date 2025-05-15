export function Footer() {
  return (
    <footer className="py-6 px-4 md:px-8 border-t mt-auto bg-card">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Daruka. All rights reserved.</p>
      </div>
    </footer>
  );
}
