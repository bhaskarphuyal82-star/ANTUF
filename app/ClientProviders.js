"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./store";

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ToastContainer />
        {children}
      </Provider>
    </SessionProvider>
  );
}
