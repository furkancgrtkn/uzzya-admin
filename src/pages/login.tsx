import { ReactElement, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "src/components/Button";
import Input from "src/components/FormElements/Input";
import Header from "src/components/Typography/Header";
import { useAppDispatch } from "src/hooks/redux/reduxHooks";
import { setIsLogged } from "src/redux/features/user/userSlice";
import Cookies from "universal-cookie";

type LoginInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const cookies = new Cookies();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [load, setLoad] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setLoad(true);
    axios
      .post(`${process.env.NEXT_APP_API_URL}/api/auth/login`, data)
      .then((res) => {
        if (res.data?.role && res.data.role === "ADMIN") {
          cookies.set(`access_token`, `${res.data.access_token}`, {
            maxAge: 899,
            path: "/",
          });
          cookies.set("refresh_token", `${res.data.refresh_token}`, {
            maxAge: 604799,
            path: "/",
          });
          dispatch(setIsLogged(true));
          toast.success("Giriş Başarılı");
          router.push("/products");
        } else {
          throw Error();
        }
      })
      .catch(() => {
        toast.error("Hata");
      })
      .finally(() => {
        setLoad(false);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[360px] p-5 bg-white border rounded  border-brand-black-secondaryLight">
        <Header variant="h5">Login Your Account</Header>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
          <Input
            props={{
              ...register("email", {
                required: "Email is required.",
              }),
              placeholder: "email",
            }}
            error={errors.email?.message}
            label="Email"
            wrapperClass="mb-4"
          />

          <Input
            props={{
              ...register("password", {
                required: "Password is required.",
              }),
              type: "password",
              placeholder: "Şifre",
            }}
            error={errors.password?.message}
            label="Şifre"
          />

          <Button
            type="submit"
            loading={load}
            className="w-full px-4 py-2.5 mt-4 text-sm rounded font-semibold tracking-wider text-white bg-brand-palette-primary"
          >
            GİRİŞ YAP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

Login.getLayout = function getLayout(page: ReactElement) {
  return page;
};
