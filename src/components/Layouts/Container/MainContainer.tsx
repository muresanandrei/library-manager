import { ReactNode, FC } from "react";
import Header from "../../Header";

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: FC<MainContainerProps> = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

export default MainContainer;
