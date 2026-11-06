import {
  Activity,
  Biohazard,
  Bug,
  Cloud,
  Cpu,
  Crosshair,
  Fingerprint,
  Globe,
  KeyRound,
  Network,
  Radar,
  Shield,
  ShieldAlert,
} from "lucide-react";

const ICONS = {
  radar: Radar,
  network: Network,
  bug: Bug,
  shieldAlert: ShieldAlert,
  crosshair: Crosshair,
  key: KeyRound,
  cpu: Cpu,
  fingerprint: Fingerprint,
  biohazard: Biohazard,
  globe: Globe,
  activity: Activity,
  cloud: Cloud,
};

export default function CategoryIcon({ icon, className }) {
  const Icon = ICONS[icon] || Shield;
  return <Icon className={className} aria-hidden="true" />;
}
