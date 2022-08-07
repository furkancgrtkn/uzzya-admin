import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Loading from "src/components/Loading";
import { useAppSelector } from "src/hooks/redux/reduxHooks";

const PrivateRoute = ({ children }: { children: ReactElement<any, any> }) => {
  const logged = useAppSelector((state) => state.user.isLogged);
  const router = useRouter();
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  useEffect(() => {
    setIsLogged(logged);
  }, [logged]);

  useEffect(() => {
    if (isLogged !== null) {
      if (!isLogged) {
        router.push("/login");
      }
    }
  }, [isLogged, router]);

  if (isLogged) {
    return children;
  } else {
    return <Loading hPage />;
  }
};

export default PrivateRoute;
