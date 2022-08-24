import {
  faArrowRightToBracket,
  faListOl,
  faShop,
  faTicketSimple,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const navigation = [
    {
      id: 2,
      href: "/products",
      icon: <FontAwesomeIcon icon={faShop} className={`w-4 h-4 p-1`} />,
    },
    {
      id: 4,
      href: "/categories",
      icon: <FontAwesomeIcon icon={faListOl} className={`w-4 h-4 p-1`} />,
    },
    {
      id: 2,
      href: "/attributes",
      icon: <FontAwesomeIcon icon={faWrench} className={`w-4 h-4 p-1`} />,
    },
    {
      id: 2,
      href: "/orders",
      icon: <FontAwesomeIcon icon={faTicketSimple} className={`w-4 h-4 p-1`} />,
    },
  ];
  return (
    <div
      className={`h-full fixed z-20 border-r top-0 left-0 bg-white min-h-screen w-[56px] py-4 px-2`}
    >
      <nav className="space-y-1 select-none">
        {navigation.map((item) => (
          <Link key={item.id} href={item.href}>
            <a
              className={`${
                router.asPath.includes(item.href)
                  ? "bg-brand-palette-primary text-white"
                  : "text-brand-black-secondary lg:hover:text-white lg:hover:bg-brand-palette-primary"
              } group flex items-center px-2 py-2 text-sm font-medium rounded`}
            >
              {item.icon}
            </a>
          </Link>
        ))}
      </nav>
      <button
        onClick={async () => {
          localStorage.clear();
        }}
        className={`text-brand-black-secondary mt-1 w-full lg:hover:text-white lg:hover:bg-brand-palette-primary group flex items-center px-2 py-2 text-sm font-medium rounded`}
      >
        <FontAwesomeIcon
          icon={faArrowRightToBracket}
          className={`w-4 h-4 p-1`}
        />
      </button>
    </div>
  );
}
