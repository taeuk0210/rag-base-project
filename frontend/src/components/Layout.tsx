import Navbar from "@/components/Navbar";
import type { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "16px" }}>{children}</main>
    </div>
  );
}

export default Layout;
