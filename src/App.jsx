import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationForm from "./pages/RegistrationForm";

function App() {

  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
