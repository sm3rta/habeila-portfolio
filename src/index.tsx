/* @refresh reload */
import { ThemeProvider } from "@suid/material";
import { render } from "solid-js/web";
import App from "./App";
import "./global.scss";
import { theme } from "./ui/theme";

render(
  () => (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  ),
  document.getElementById("root") as HTMLElement
);
