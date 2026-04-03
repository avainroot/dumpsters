import type { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  return <div className="flex h-screen w-full" {...props} />;
};

export default Layout;
