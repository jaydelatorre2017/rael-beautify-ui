import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationForm from "./pages/RegistrationForm";
import SuccesfulRegistration from "./pages/SuccesfulRegistration";

function App() {

  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationForm />}></Route>
          <Route path="/" element={<RegistrationForm />}></Route>
          <Route path="/succesful-registration/:userId" element={<SuccesfulRegistration />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
