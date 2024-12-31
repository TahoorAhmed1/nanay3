import { Route, Routes } from "react-router-dom";
import Forfamily from "@/pages/dashboard/for-family";
import ForNanny from "@/pages/dashboard/for-nanny";
import NotFound from "@/pages/not-found";
import ChatMain from "./Chat";

export default function Dashboard() {
  return (
    <div className="m-0 p-0">
      <Routes path="">
        <Route path="chat" element={<ChatMain />} />
        <Route path="for-family" element={<Forfamily />} />
        <Route path="for-nanny" element={<ForNanny />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
