import { Route, Routes } from "react-router-dom";
import "./App.css";
import Detail from "./Routes/detail/Detail";
import Home from "./Routes/Home/Home";
import Login from "./Routes/login/Login";
import Navigation from "./Routes/navigation/Navigation";
import Test from "./Test";
import Test2 from "./Test2";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="detail" element={<Detail />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
