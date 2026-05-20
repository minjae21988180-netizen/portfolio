import Image from "next/image";
import me from "../../../public/assets/me-island.png";

export default function MeIsland({ className }: { withSky?: boolean; className?: string }) {
  return (
    <Image
      src={me}
      alt="Me Island — a chibi character in a butter-yellow set standing on a cloud surrounded by a DJ deck, SoulCycle bike, sunflowers, and a yoga mat under a warm sun"
      placeholder="blur"
      sizes="(max-width: 720px) 90vw, 720px"
      className={className}
      priority
    />
  );
}
