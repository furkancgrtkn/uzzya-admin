import { ReactNode } from "react";
import PrivateRoute from "src/utils/auth/PrivateRoute";
import Sidebar from "../Sidebar";
export default function Default({ children }: { children: ReactNode }) {
  return (
    <PrivateRoute>
      <>
        <Sidebar />
        <main className={`w-[calc(100%-56px)] ml-[56px] min-h-screen`}>
          {children}
        </main>
      </>
    </PrivateRoute>
  );
}
