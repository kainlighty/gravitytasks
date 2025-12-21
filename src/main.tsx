import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, Toaster, ToasterComponent, ToasterProvider } from "@gravity-ui/uikit";
import '@gravity-ui/uikit/styles/styles.css'
import '@gravity-ui/uikit/styles/fonts.css'
import '@/styles/normalize.css'
import '@/styles/globals.scss'
import '@/styles/gravity.scss'
import App from "@/App";

const toaster = new Toaster()

createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
      <ThemeProvider theme={'dark-hc'} lang="ru">
          <ToasterProvider toaster={toaster}>
              <App/>
              <ToasterComponent/>
          </ToasterProvider>
      </ThemeProvider>
  </React.StrictMode>,
)
