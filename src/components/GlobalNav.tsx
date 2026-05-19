import Link from "next/link";

export default function GlobalNav() {
  return (
    <nav className="global-nav" aria-label="Primary">
      <Link href="/" className="nav-brand">Control Center</Link>
      <div className="nav-links">
        <Link href="/work">Work</Link>
        <Link href="/me">Me</Link>
        <Link href="/connect">Connect</Link>
      </div>
    </nav>
  );
}
