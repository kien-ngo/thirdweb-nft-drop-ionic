import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
