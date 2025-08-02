import { cn } from "@/lib/utils";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function ToggleSwitch({ checked, onChange, className }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        checked ? "bg-primary" : "bg-gray-200",
        className
      )}
      onClick={() => onChange(!checked)}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}
