import React from 'react';
import { useLocation, useNavigate, useParams,  NavigateFunction, Location  } from 'react-router-dom';

interface RouterProps {
  location: Location;
  navigate: NavigateFunction;
  params: object;
}

interface ComponentProps {
  router: RouterProps;
}

export default function withRouter<P extends ComponentProps>(Component: React.ComponentType<P>) {
  function ComponentWithRouterProp(props: Omit<P, 'router'>) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const routerProps: RouterProps = { location, navigate, params };

    return <Component {...props as P} router={routerProps} />;
  }

  return ComponentWithRouterProp;
}