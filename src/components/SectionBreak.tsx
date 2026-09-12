import { GearMark, type GearKind } from "@/components/GearMark";

type SectionBreakProps = {
  id: string;
  kind?: Exclude<GearKind, "svg">;
};

export function SectionBreak({ id, kind = "clockwork" }: SectionBreakProps) {
  return (
    <div className="section-break" aria-hidden>
      <span className="section-pipe" />
      <span className="section-coupler" />
      <GearMark id={id} size={52} kind={kind} className="gear-scroll" />
      <span className="section-coupler" />
      <span className="section-pipe" />
    </div>
  );
}
