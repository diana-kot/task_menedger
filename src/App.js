import { Route, Routes } from "react-router-dom";
import { TaskPage } from "@pages";

import cn from "classnames";

function App() {
  return (
    <div className={cn("wrapper", "wrapper__container", "container")}>
      <main className="main">
        <Routes>
          <Route path="/" element={<TaskPage />} />
          <Route path="*" element={<h2>404</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
