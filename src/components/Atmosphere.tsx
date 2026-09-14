import { GearMark } from "@/components/GearMark";

export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden>
      <div className="ember-core" />
      <div className="pipe pipe-left">
        <span className="pipe-joint" />
        <span className="pipe-joint pipe-joint-mid" />
        <span className="pipe-joint pipe-joint-low" />
      </div>
      <div className="pipe pipe-right">
        <span className="pipe-joint" />
        <span className="pipe-joint pipe-joint-mid" />
        <span className="pipe-joint pipe-joint-low" />
      </div>
      <GearMark
        id="atm-a"
        size={280}
        kind="clockwork"
        className="atm-gear atm-gear-a gear-scroll"
      />
      <GearMark
        id="atm-b"
        size={160}
        kind="thick"
        className="atm-gear atm-gear-b gear-scroll-rev"
      />

      <div className="steam steam-a" />
      <div className="steam steam-b" />
      <div className="steam steam-c" />
      <span className="spark spark-a" />
      <span className="spark spark-b" />
      <span className="spark spark-c" />
    </div>
  );
}
