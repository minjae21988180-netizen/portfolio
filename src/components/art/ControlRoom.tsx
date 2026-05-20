import Image from "next/image";
import room from "../../../public/assets/control-room.png";

export default function ControlRoom() {
  return (
    <div className="control-room" aria-hidden>
      <Image
        src={room}
        alt=""
        placeholder="blur"
        priority
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <style jsx>{`
        .control-room {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
