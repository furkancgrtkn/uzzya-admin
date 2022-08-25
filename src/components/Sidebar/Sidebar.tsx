import {
  BuildingStorefrontIcon,
  TagIcon,
  InboxArrowDownIcon,
  ArrowRightOnRectangleIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const navigation = [
    {
      id: 2,
      href: "/products",
      title: "Ürünler",
      icon: <BuildingStorefrontIcon className={`w-5 h-5`} />,
    },
    {
      id: 4,
      href: "/categories",
      title: "Kategoriler",
      icon: <RectangleGroupIcon className={`w-5 h-5`} />,
    },
    {
      id: 2,
      href: "/attributes",
      title: "Özellikler",
      icon: <TagIcon className={`w-5 h-5`} />,
    },
    {
      id: 2,
      href: "/orders",
      title: "Siparişler",
      icon: <InboxArrowDownIcon className={`w-5 h-5`} />,
    },
  ];
  return (
    <div
      className={`h-full z-20 border-r flex flex-col border-brand-black-secondaryLight top-0 left-0 bg-white min-h-screen p-3`}
    >
      <nav className="space-y-1.5 select-none">
        {navigation.map((item) => (
          <Link key={item.id} href={item.href}>
            <a
              className={`${
                router.asPath.includes(item.href)
                  ? "bg-brand-palette-primary text-white"
                  : "text-brand-black-secondary lg:hover:text-white lg:hover:bg-brand-palette-primary"
              } flex min-w-[180px] leading-none items-center justify-start px-2 py-1.5 text-sm rounded`}
            >
              {item.icon}
              <span className="ml-2.5">{item.title}</span>
            </a>
          </Link>
        ))}
      </nav>
      <button
        onClick={async () => {
          localStorage.clear();
        }}
        className={`text-brand-black-secondary  leading-none min-w-[180px] justify-start px-3 py-2 lg:hover:text-white lg:hover:bg-brand-palette-primary group flex items-center mt-auto text-sm rounded`}
      >
        <ArrowRightOnRectangleIcon className={`w-5 h-5`} />
        <span className="ml-2.5">Çıkış Yap</span>
      </button>
    </div>
  );
}
