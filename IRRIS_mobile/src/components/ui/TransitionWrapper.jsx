import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TransitionWrapper = ({ children, location }) => {
  console.log("Current location:", location.pathname);

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} timeout={300} classNames="slide">
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TransitionWrapper;
