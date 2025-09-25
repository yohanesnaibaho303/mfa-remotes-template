import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useInRouterContext,
} from "react-router-dom";

const AppPageTest = () => <div className="bg-blue-500">AppTest remotes</div>;

/** Used in Host (Without BrowserRouter) */
const FederatedApp = () => {
  const hasRouter = useInRouterContext();
  if (!hasRouter) {
    // <<< Error message when running federated mode not in the host
    return (
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: 16,
          border: "1px dashed #888",
          borderRadius: 12,
        }}
      >
        <strong>Warning: The App Can't be used</strong>
        <strong>Remotes App Solo ready to use in the host App</strong>
        <div style={{ marginTop: 6, fontSize: 14 }}>
          (This Remote error because it should call with <code>&lt;BrowserRouter Parent(Host)&gt;</code>.)
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route index element={<Navigate to="test" replace />} />
      <Route path="test" element={<AppPageTest />} />
      {/* fallback wildcard */}
      <Route path="*" element={<Navigate to=".." relative="route" replace />} />
    </Routes>
  );
};

/** Dev standalone (With BrowserRouter) */
const DevApp = () => (
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
        <DevApp />
      </BrowserRouter>
    );
  }
  // federated mode: Host provided BrowserRouter
  return <FederatedApp />;
};

export default App;
