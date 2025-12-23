import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
    ActionTooltip,
    Button,
    Icon,
    ThemeProvider,
    Toaster,
    ToasterComponent,
    ToasterProvider
} from "@gravity-ui/uikit";
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import '@/styles/normalize.css'
import '@/styles/globals.scss'
import '@/styles/gravity.scss'
import App from "@/App";
import clsx from "clsx";
import { LayoutColumns } from "@gravity-ui/icons";

const toaster = new Toaster()

const Main = () => {
    // темпорару
    const [isGradientBackground, setIsGradientBackground] = useState(true);

    return (
      <React.StrictMode>
          <ThemeProvider
            rootClassName={clsx(isGradientBackground && "glass-gradient__background")}
            theme="dark-hc"
            lang="ru"
          >
              <ToasterProvider toaster={toaster}>
                  <App/>
                  {/*Временно, для теста*/}
                  <ActionTooltip
                    openDelay={100}
                    title="Прозрачность"
                  >
                      <Button
                        id="switch-glass-gradient-btn"
                        onClick={() => {
                            setIsGradientBackground(!isGradientBackground);
                        }}
                      >
                          <Icon data={LayoutColumns}/>
                      </Button>
                  </ActionTooltip>
                  <ToasterComponent/>
              </ToasterProvider>
          </ThemeProvider>
      </React.StrictMode>
    )
}

createRoot(document.getElementById('app')!).render(
  <Main/>
)
