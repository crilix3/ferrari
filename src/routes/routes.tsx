import { Route, Routes } from "react-router-dom";
import { Main, FamiliesPage, NotFound, GroupPage, PartPage, ModelsPage } from "../page";

const AppRoutes = () => {
  const navRoutes = [
    { path: "/", element: <Main /> },
    { path: "/:brandName", element: <FamiliesPage /> },
    { path: "/:brandName/:familiesId", element: <ModelsPage /> },
    { path: "/:brandName/:familiesId/:modelId", element: <GroupPage /> },
    { path: "/:brandName/:familiesId/:modelId/:partId", element: <PartPage /> },
    { path: "*", element: <NotFound /> },
  ];

  return (
    <Routes>
      {navRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        ></Route>
      ))}
    </Routes>
  );
};

export default AppRoutes;
