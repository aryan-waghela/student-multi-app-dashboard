import type { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

const Container = ({ className = "", children }: ContainerProps) => {
  return <div className={`${className} mx-auto w-280`}>{children}</div>;
};

export default Container;
