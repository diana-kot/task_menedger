import { Route, Routes } from "react-router-dom";
import { TaskPage, Auth } from "@pages";
import { Head } from "@components";

function App() {
  return (
    <div className="wrapper">
      <Head />
      <div className="content">
        <Routes>
          <Route path="/" element={<TaskPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<h2>404</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
