import { FC, lazy, Suspense, ReactNode } from "react";
import { Route, Routes, NavigateFunction, Location } from "react-router-dom";
import MainContainer from "../components/Layouts/Container/MainContainer";
import RouteContainer from "../components/Layouts/Container/RouteContainer";
const BooksList = lazy(() => import("../pages/Books/BooksList"));
const CreateBook = lazy(() => import("../pages/Books/Create"));
const UpdateBook = lazy(() => import("../pages/Books/Update"));

interface RoutingProps {
  navigate: NavigateFunction;
  location: Location;
  children?: ReactNode;
}

interface RoutesListProps {
  navigate: NavigateFunction;
  location: Location;
}

const Container: FC<RoutingProps> = ({ location, children }) => (
  <MainContainer>
    <RouteContainer location={location}>{children}</RouteContainer>
  </MainContainer>
);

const RoutesList: FC<RoutesListProps> = ({ navigate, location }) => (
  <Routes location={location}>
    <Route path="/" element={<BooksList navigate={navigate} />} />
    <Route path="/add" element={<CreateBook navigate={navigate} />} />
    <Route path="/book/:bookId" element={<UpdateBook location={location} navigate={navigate} />} />
  </Routes>
);
//Routing with container and routes content
const Routing: FC<RoutingProps> = ({ navigate, location }) => (
  <Container navigate={navigate} location={location}>
    <Suspense fallback={<div>Loading</div>}>
      <RoutesList navigate={navigate} location={location} />
    </Suspense>
  </Container>
);

export default Routing;
