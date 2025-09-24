import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const AppPageTest = () => <div>AppTest remotes</div>;

/** Used in Host (Without BrowserRouter) */
const FederatedInner = () => (
  <Routes>
    <Route index element={<Navigate to="test" replace />} />
    <Route path="test" element={<AppPageTest />} />
    {/* fallback wildcard */}
    <Route path="*" element={<Navigate to=".." relative="route" replace />} />
  </Routes>
);

/** Dev standalone (With BrowserRouter) */
const DevInner = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/test" replace />} />
    <Route path="/test" element={<AppPageTest />} />
    <Route path="*" element={<Navigate to="/test" replace />} />
  </Routes>
);

const App = () => {
  if (import.meta.env.DEV) {
    return (
      <BrowserRouter>
        <DevInner />
      </BrowserRouter>
    );
  }
  // federated mode: Host provided BrowserRouter
  return <FederatedInner />;
};

export default App;