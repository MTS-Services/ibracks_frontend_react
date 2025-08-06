import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // 1. Provider ইম্পোর্ট করুন
import { PersistGate } from "redux-persist/integration/react"; // 2. PersistGate ইম্পোর্ট করুন
import "./index.css";
import App from "./App.jsx";
import { persistor, store } from "./featured/store/store.js";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    {/* Provider দিয়ে পুরো অ্যাপকে র‍্যাপ করুন */}
    <Provider store={store}>
      {/* PersistGate দিয়ে র‍্যাপ করুন */}
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
