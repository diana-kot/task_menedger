import { Route, Routes } from "react-router-dom";
import { Main, Auth } from "@pages";

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<h2>404</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
