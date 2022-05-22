import { Route, Routes } from "react-router-dom";
import { TaskPage, Auth } from "@pages";
import { Navigate } from "react-router-dom";


import cn from "classnames";

function App() {
  return (
    <div className={cn('wrapper', 'wrapper__container', 'container')}>
     
      <main className="main">
        <Routes>
          <Route path="/" element={<TaskPage />} />
          {/* <Route path="/auth" element={<Auth />} /> */}
          <Route path="*" element={<h2>404</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
