import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import CertificationPage from "./pages/certification";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>   
            <Route path="/" element={<Home />} />
            <Route path="/certification" element={<CertificationPage />} />
           <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
