export default function SkyGradient({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C8B6E2" />
        <stop offset="55%" stopColor="#F5B6C4" />
        <stop offset="100%" stopColor="#F5C4A8" />
      </linearGradient>
    </defs>
  );
}
