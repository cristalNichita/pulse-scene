import type {
    InputHTMLAttributes,
} from "react";

interface AuthFieldProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export function AuthField({
                              label,
                              error,
                              id,
                              ...props
                          }: AuthFieldProps) {
    return (
        <label
            htmlFor={id}
            className="block"
        >
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
        {label}
      </span>

            <input
                id={id}
                className="h-14 w-full rounded-2xl border border-ink/10 bg-white px-4 text-sm outline-none transition focus:border-ink/30 focus:ring-4 focus:ring-ink/[0.04]"
                {...props}
            />

            {error ? (
                <span className="mt-2 block text-xs text-accent">
          {error}
        </span>
            ) : null}
        </label>
    );
}