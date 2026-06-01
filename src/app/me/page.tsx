"use client";

import { useState } from "react";
import meBg from "../../../public/assets/me-island.png";
import IslandPage from "@/components/IslandPage";
import PopupShell from "@/components/PopupShell";

const TABS = ["Bio", "Background", "Interests", "Education", "Skills"];

export default function MePage() {
  return (
    <IslandPage
      background={meBg}
      hotspot={{ x: 49, y: 38, label: "Meet Minjae" }}
      popupLabel="About Minjae"
    >
      {(close) => <MePopup close={close} />}
    </IslandPage>
  );
}

function MePopup({ close }: { close: () => void }) {
  const [tab, setTab] = useState("Bio");

  return (
    <PopupShell
      eyebrow="About"
      title="Minjae Kim"
      tabs={TABS}
      activeTab={tab}
      onTab={setTab}
      onClose={close}
    >
      <div className="prose">{TAB_CONTENT[tab]}</div>
    </PopupShell>
  );
}

const TAB_CONTENT: Record<string, JSX.Element> = {
  Bio: (
    <>
      <p className="lead">
        I&rsquo;m Minjae (Min), a UX/UI and graphic designer who crafts meaningful digital
        experiences that solve real-world problems.
      </p>
      <p>
        I combine user-centered research with creative problem-solving to design products that are
        both intuitive and visually engaging. I move between product UX, research, and brand/graphic
        work — which is exactly why my Work island splits into four prisms.
      </p>
      <p>Based in Los Angeles, CA.</p>
    </>
  ),
  Background: (
    <>
      <p className="lead">
        I bring a versatile skill set and deep empathy for users to every project.
      </p>
      <p>
        With experience across healthcare, enterprise software, education, and hospitality branding,
        I believe great design emerges from understanding people and refining ideas through
        iteration. From research collaborations at UC San Diego&rsquo;s Billions Lab to multi-brand
        creative leadership in LA hospitality, I&rsquo;ve learned to hold rigor and empathy at the
        same time.
      </p>
    </>
  ),
  Interests: (
    <>
      <p className="lead">Outside design — chasing sunlight around Los Angeles.</p>
      <ul>
        <li>EDM, with Fred again.. on repeat</li>
        <li>SoulCycle &amp; long yoga mornings</li>
        <li>Sunlight — the closer the window, the better</li>
        <li>Always exploring new tools and discovering hidden gems around LA</li>
      </ul>
    </>
  ),
  Education: (
    <>
      <p className="lead">B.S. Cognitive Science — Design &amp; Interaction</p>
      <p>
        University of California, San Diego — minor in Computer Graphic Art. Graduated December
        2024.
      </p>
    </>
  ),
  Skills: (
    <>
      <p className="lead">Research-led, systems-minded, hands-on in code.</p>
      <p style={{ marginBottom: 8, fontWeight: 700, color: "var(--ink)" }}>Skills</p>
      <div className="chips" style={{ marginBottom: 18 }}>
        {[
          "User Research",
          "Interaction Design",
          "Design Systems",
          "Usability Testing",
          "Information Architecture",
          "Visual Design",
          "Prototyping",
          "Wireframing",
        ].map((s) => (
          <span className="chip" key={s}>{s}</span>
        ))}
      </div>
      <p style={{ marginBottom: 8, fontWeight: 700, color: "var(--ink)" }}>Tools</p>
      <div className="chips">
        {[
          "Figma",
          "Adobe Creative Suite",
          "Sketch",
          "Principle",
          "InVision",
          "Miro",
          "UserTesting",
          "Maze",
          "HTML/CSS",
          "React",
        ].map((s) => (
          <span className="chip" key={s}>{s}</span>
        ))}
      </div>
    </>
  ),
};
