import React from "react";

export interface Trait {
  traitType: string;
  value: string;
}

export interface NftTraitsProps {
  traits: Trait[];
  title?: string;
  /** show only the first N traits and render a "+more" hint; omit to show all */
  maxVisible?: number;
  className?: string;
}

export default function NftTraits({
  traits,
  title = "Traits",
  maxVisible,
  className = "",
}: NftTraitsProps) {
  const visible =
    typeof maxVisible === "number" ? traits.slice(0, maxVisible) : traits;
  const remaining = traits.length - visible.length;

  return (
    <section className={className}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-400 dark:text-gray-200 mb-3">
          {title}
        </h3>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {visible.map((trait, index) => (
          <div
            key={`${trait.traitType}-${index}`}
            className="flex flex-col rounded-xl bg-gray-800 p-3 hover:shadow-sm transition-shadow dark:bg-gray-900/50 dark:border-gray-800"
          >
            <p className="text-xs text-gray-400 uppercase tracking-wide dark:text-gray-400">
              {trait.traitType}
            </p>
            <p
              className="font-medium text-gray-500 truncate dark:text-gray-100"
              title={trait.value}
            >
              {trait.value}
            </p>
          </div>
        ))}
      </div>

      {remaining > 0 && (
        <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
          +{remaining} more
        </p>
      )}
    </section>
  );
}
