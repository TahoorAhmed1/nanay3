import { Route, Routes } from "react-router-dom";
import Forfamily from "@/pages/dashboard/for-family";
import ForNanny from "@/pages/dashboard/for-nanny";
import NotFound from "@/pages/not-found";
import ChatMain from "./Chat";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state) => state?.user);
  return (
    <div className="m-0 p-0">
      <Routes path="">
        <Route path="chat" element={  <ChatMain user={user} />} />
        <Route path="for-family" element={ <Forfamily user={user} />} />
        <Route path="for-nanny" element={ <ForNanny  user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
