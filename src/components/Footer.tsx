import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link href="/">Control Center</Link></li>
            <li><Link href="/work">Work Island</Link></li>
            <li><Link href="/me">Me Island</Link></li>
            <li><Link href="/connect">Connect Island</Link></li>
          </ul>
        </div>
        <div>
          <h4>Work</h4>
          <ul>
            <li><Link href="/work">Case studies</Link></li>
            <li><Link href="/connect">Resume</Link></li>
            <li><Link href="/me">Skills</Link></li>
          </ul>
        </div>
        <div>
          <h4>Reach out</h4>
          <ul>
            <li><Link href="/connect">Contact</Link></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="https://github.com" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener">Twitter</a></li>
          </ul>
        </div>
        <div>
          <h4>About</h4>
          <ul>
            <li><Link href="/me">Bio</Link></li>
            <li><Link href="/me">Interests</Link></li>
            <li><Link href="/me">Values</Link></li>
          </ul>
        </div>
      </div>
      <div className="legal">
        Designed and built with care. Inspired by Inside Out's Personality Islands.
      </div>
    </footer>
  );
}
