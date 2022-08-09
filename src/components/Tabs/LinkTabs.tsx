import Link from "next/link";
import { useRouter } from "next/router";

export function LinkTabs({
  tabsData,
}: {
  tabsData: {
    id: number;
    href: string;
    label: string;
  }[];
}) {
  const router = useRouter();
  return (
    <div className="flex space-x-6 border-slate-400 border-b">
      {/* Loop through tab data and render button for each. */}
      {tabsData.map((tab) => {
        return (
          <Link href={tab.href} key={tab.id}>
            <a
              className={`py-2 text-sm ${
                router.asPath === tab.href ? "font-medium" : "opacity-50"
              }`}
              // Change the active tab on click.
            >
              {tab.label}
            </a>
          </Link>
        );
      })}
    </div>
  );
}
