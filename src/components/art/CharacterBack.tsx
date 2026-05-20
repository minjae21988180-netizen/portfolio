import Image from "next/image";
import sprite from "../../../public/assets/character-sprite.png";

export default function CharacterBack({ className }: { className?: string }) {
  return (
    <Image
      src={sprite}
      alt=""
      priority
      sizes="(max-width: 833px) 38vh, 52vh"
      className={className}
      style={{ height: "100%", width: "auto", display: "block" }}
    />
  );
}
