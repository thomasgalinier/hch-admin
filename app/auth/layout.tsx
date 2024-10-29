"use client";


const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="h-screen">{children}</div>;
};

export default layout;
