import Image from "next/image";
import connect from "../../../public/assets/connect-island.png";

export default function ConnectIsland({ className }: { withSky?: boolean; className?: string }) {
  return (
    <Image
      src={connect}
      alt="Connect Island — a pink-striped lighthouse beaming concentric hearts over a cloud-top café with two chairs, a hot-air balloon, and pastel mailboxes"
      placeholder="blur"
      sizes="(max-width: 720px) 90vw, 720px"
      className={className}
      priority
    />
  );
}
