//make container use mui fade animation when switching between pages
import { ReactNode, FC} from "react";
import { Container, Fade } from "@mui/material";
import { Location } from "react-router-dom";

interface MainContainerProps {
  children: ReactNode;
  location: Location;
}

const MainContainer: FC<MainContainerProps> = ({ children, location }) => {
  return (
    <Fade in={true} key={location.pathname}>
      <Container sx={{marginTop: '100px'}} maxWidth="lg">{children}</Container>
    </Fade>
  );
};

export default MainContainer;
