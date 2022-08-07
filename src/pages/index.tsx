import { ReactElement } from "react";
import Default from "src/components/Layout/Default";

const Home = () => {
  return <></>;
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};
