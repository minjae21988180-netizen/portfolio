import Image from "next/image";
import work from "../../../public/assets/work-island.png";

export default function WorkIsland({ className }: { withSky?: boolean; className?: string }) {
  return (
    <Image
      src={work}
      alt="Work Island — a floating coral cloud carrying a giant lightbulb monument surrounded by crystal prisms"
      placeholder="blur"
      sizes="(max-width: 720px) 90vw, 720px"
      className={className}
      priority
    />
  );
}
