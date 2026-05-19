import Link from "next/link";

type SubNavLink = { href: string; label: string };

export default function SubNav({
  category,
  links = [],
  cta,
}: {
  category: string;
  links?: SubNavLink[];
  cta?: { href: string; label: string; primary?: boolean };
}) {
  return (
    <div className="sub-nav" aria-label={`${category} navigation`}>
      <div className="category">{category}</div>
      <div className="sub-links">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>{l.label}</Link>
        ))}
        {cta && (
          <Link
            href={cta.href}
            className={cta.primary !== false ? "btn btn-primary" : "btn btn-secondary"}
            style={{ padding: "8px 18px", fontSize: 14 }}
          >
            {cta.label}
          </Link>
        )}
      </div>
    </div>
  );
}
