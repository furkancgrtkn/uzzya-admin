import {
  faArrowRightToBracket,
  faListOl,
  faShop,
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
  ];
  return (
    <div
      className={`h-full fixed z-20 top-0 left-0 bg-brand-primary min-h-screen w-[56px] py-4 px-2`}
    >
      <nav className="space-y-1 select-none">
        {navigation.map((item) => (
          <Link key={item.id} href={item.href}>
            <a
              className={`${
                router.asPath.includes(item.href)
                  ? "bg-brand-primaryLight bg-opacity-80 text-white"
                  : "text-slate-400 lg:lg:hover:text-white lg:lg:hover:bg-brand-primaryLight lg:lg:hover:bg-opacity-80"
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
        className={`text-slate-400 mt-1 w-full lg:lg:hover:text-white lg:lg:hover:bg-brand-primaryLight lg:lg:hover:bg-opacity-80 group flex items-center px-2 py-2 text-sm font-medium rounded`}
      >
        <FontAwesomeIcon
          icon={faArrowRightToBracket}
          className={`w-4 h-4 p-1`}
        />
      </button>
    </div>
  );
}
