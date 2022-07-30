import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <img src={Logo} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={32} />
        </NavLink>
        <NavLink to="history" title="History">
          <Scroll size={32} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
