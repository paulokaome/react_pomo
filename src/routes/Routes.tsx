import { Route, Routes } from "react-router-dom";
import { Layouts } from "../layouts/DefaultLayout";

import { History } from "../screens/History";
import { Home } from "../screens/Home";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}
