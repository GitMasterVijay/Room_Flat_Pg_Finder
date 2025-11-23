import { Outlet } from "react-router-dom";
import OwnerHeader from "../components/OwnerHeader";
 
import OwnerFooter from "../components/OwnerFooter";

export default function OwnerLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <OwnerHeader />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <OwnerFooter/>
    </div>
  );
}
