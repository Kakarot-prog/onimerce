import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="light" />
        <div className="light" />
        <div className="light" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full page height */
  background: #101828;
  /* Dark background matching navbar theme */

  .loader {
    position: relative;
    width: 100px;
    height: 100px;
  }

  .light {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(
      45deg,
      #3498db,
      #8e44ad
    ); /* Gradient for balls */
    animation: follow 1.5s infinite ease-in-out;
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.8); /* Glow effect */
  }

  .light:nth-child(1) {
    animation-delay: 0s;
  }

  .light:nth-child(2) {
    animation-delay: 0.5s;
  }

  .light:nth-child(3) {
    animation-delay: 1s;
  }

  @keyframes follow {
    0%,
    100% {
      transform: translateX(-50px) scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: translateX(50px) scale(1.2);
      opacity: 1;
    }
  }
`;

export default Loader;
