import { ReactNode } from "react";
import PrivateRoute from "src/utils/auth/PrivateRoute";
import Sidebar from "../Sidebar";
export default function Default({ children }: { children: ReactNode }) {
  return (
    <PrivateRoute>
      <div className="flex">
        <Sidebar />
        <main className={`min-h-screen w-full overflow-y-auto max-h-screen`}>
          {children}
        </main>
      </div>
    </PrivateRoute>
  );
}
