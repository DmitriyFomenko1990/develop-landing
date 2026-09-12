export type GearKind = "svg" | "clockwork" | "thick";

type GearMarkProps = {
  id: string;
  size?: number;
  teeth?: number;
  kind?: GearKind;
  className?: string;
};

const PHOTOS: Record<Exclude<GearKind, "svg">, string> = {
  clockwork: "/images/gears/clockwork.png?v=5",
  thick: "/images/gears/thick.png?v=5",
};

function splitGearClass(className?: string) {
  const tokens = (className ?? "").split(/\s+/).filter(Boolean);
  const spin = tokens.filter((token) => token.startsWith("gear-scroll"));
  const shell = tokens.filter((token) => !token.startsWith("gear-scroll"));
  return { spin: spin.join(" "), shell: shell.join(" ") };
}

function pt(angle: number, radius: number) {
  return `${(50 + Math.cos(angle) * radius).toFixed(3)} ${(50 + Math.sin(angle) * radius).toFixed(3)}`;
}

function gearPath(teeth: number, outer: number, inner: number) {
  const step = (Math.PI * 2) / teeth;
  const parts: string[] = [];

  for (let i = 0; i < teeth; i += 1) {
    const a = i * step - Math.PI / 2;
    const valleyL = a - step * 0.42;
    const rise = a - step * 0.17;
    const tipL = a - step * 0.1;
    const tipR = a + step * 0.1;
    const fall = a + step * 0.17;
    const valleyR = a + step * 0.42;
    const mid = (outer + inner) * 0.5;
    const cmd = i === 0 ? "M" : "L";
    parts.push(
      `${cmd}${pt(valleyL, inner)} C${pt(valleyL + step * 0.05, mid)} ${pt(rise, outer)} ${pt(tipL, outer)} L${pt(tipR, outer)} C${pt(fall, outer)} ${pt(valleyR - step * 0.05, mid)} ${pt(valleyR, inner)}`,
    );
  }

  return `${parts.join(" ")} Z`;
}

function seedFrom(id: string) {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) {
    n = (n + id.charCodeAt(i) * (i + 1)) % 97;
  }
  return n + 1;
}

export function GearMark({
  id,
  size = 72,
  teeth = 12,
  kind = "svg",
  className,
}: GearMarkProps) {
  if (kind !== "svg" && size >= 28) {
    const { spin, shell } = splitGearClass(className);
    const src = PHOTOS[kind];
    return (
      <div
        className={`gear-shell ${shell} ${spin}`.trim()}
        style={{ width: size, height: size }}
      >
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          className="gear-rotor"
          draggable={false}
        />
      </div>
    );
  }

  const worn = size >= 28;
  const bronze = `${id}-bronze`;
  const rim = `${id}-rim`;
  const hub = `${id}-hub`;
  const grain = `${id}-grain`;
  const rust = `${id}-rust`;
  const clip = `${id}-clip`;
  const body = gearPath(teeth, 46.2, 33.4);
  const face = gearPath(teeth, 43.6, 34.6);
  const bolts = worn ? 6 : 4;
  const seed = seedFrom(id);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id={bronze} cx="34%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#f6e2b0" />
          <stop offset="22%" stopColor="#d7b06a" />
          <stop offset="48%" stopColor="#b08a48" />
          <stop offset="76%" stopColor="#7a5228" />
          <stop offset="100%" stopColor="#3a2012" />
        </radialGradient>
        <radialGradient id={rim} cx="30%" cy="24%" r="78%">
          <stop offset="0%" stopColor="#c9a05a" />
          <stop offset="40%" stopColor="#8a5a2c" />
          <stop offset="100%" stopColor="#2a160c" />
        </radialGradient>
        <radialGradient id={hub} cx="36%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ead19a" />
          <stop offset="45%" stopColor="#a87838" />
          <stop offset="100%" stopColor="#4a2a14" />
        </radialGradient>
        <filter id={grain} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.15"
            numOctaves="2"
            seed={seed}
            result="n"
          />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0.42  0 0 0 0 0.24  0 0 0 0 0.1  0 0 0 0.28 0"
          />
        </filter>
        <filter id={rust} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="3"
            seed={seed + 7}
            result="r"
          />
          <feColorMatrix
            in="r"
            type="matrix"
            values="0 0 0 0 0.42  0 0 0 0 0.16  0 0 0 0 0.06  0 0 0 0.55 0"
          />
        </filter>
        <clipPath id={clip}>
          <path d={face} />
        </clipPath>
      </defs>
      <path d={body} fill={`url(#${rim})`} />
      <path d={face} fill={`url(#${bronze})`} />
      {worn ? <path d={face} filter={`url(#${grain})`} opacity="0.42" /> : null}
      {worn ? (
        <g clipPath={`url(#${clip})`} opacity="0.55">
          <ellipse
            cx="31"
            cy="60"
            rx="13"
            ry="8"
            transform="rotate(-26 31 60)"
            fill="#6b2a12"
          />
          <ellipse
            cx="70"
            cy="36"
            rx="9"
            ry="6"
            transform="rotate(16 70 36)"
            fill="#8a3a16"
          />
          <ellipse cx="58" cy="74" rx="8" ry="5" fill="#4a1e0e" />
          <rect width="100" height="100" filter={`url(#${rust})`} />
        </g>
      ) : null}
      <circle
        cx="50"
        cy="50"
        r="19.5"
        fill={`url(#${hub})`}
        stroke="#2a160c"
        strokeWidth="1.1"
      />
      <circle cx="50" cy="50" r="16.2" fill="none" stroke="#e8c98a" strokeWidth="0.45" opacity="0.35" />
      {Array.from({ length: bolts }, (_, index) => {
        const rad = ((index / bolts) * Math.PI * 2 - Math.PI / 2);
        const cx = (50 + Math.cos(rad) * 12.4).toFixed(3);
        const cy = (50 + Math.sin(rad) * 12.4).toFixed(3);
        return (
          <g key={index}>
            <circle cx={cx} cy={cy} r="2.15" fill="#2a160c" />
            <circle cx={cx} cy={cy} r="1.35" fill="#c6a15b" />
            <circle
              cx={(Number(cx) - 0.35).toFixed(3)}
              cy={(Number(cy) - 0.35).toFixed(3)}
              r="0.45"
              fill="#f6e2b0"
            />
          </g>
        );
      })}
      <circle cx="50" cy="50" r="6.6" fill="#1a1008" />
      <circle cx="50" cy="50" r="4.4" fill="#3d2414" />
      <circle cx="50" cy="50" r="2.1" fill="#e8c98a" opacity="0.55" />
      <ellipse
        cx="38"
        cy="31"
        rx={worn ? 15 : 10}
        ry={worn ? 8 : 5}
        fill="#fff8e8"
        opacity={worn ? 0.2 : 0.16}
      />
      <ellipse cx="35" cy="28" rx="5.5" ry="2.6" fill="#fff" opacity="0.22" />
    </svg>
  );
}
