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
    <div className="flex space-x-5 border-brand-black-secondaryLight text-brand-black-primary border-b">
      {tabsData.map((tab) => {
        return (
          <Link href={tab.href} key={tab.id}>
            <a
              className={`py-2 text-sm ${
                router.asPath === tab.href ? "" : "opacity-40"
              }`}
            >
              {tab.label}
            </a>
          </Link>
        );
      })}
    </div>
  );
}
