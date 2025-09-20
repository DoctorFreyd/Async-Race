const CarSvg: React.FC<{ color: string }> = ({ color }) => (
  <svg width="32" height="16" viewBox="0 0 32 16" className={`text-[${color}]`} style={{ color }}>
    <path fill="currentColor" d="M6 4h20l2 4v6h-2a2 2 0 11-4 0H10a2 2 0 11-4 0H4V8l2-4z" />
    <circle cx="8" cy="12" r="2" fill="currentColor" />
    <circle cx="24" cy="12" r="2" fill="currentColor" />
  </svg>
);

export default CarSvg;
