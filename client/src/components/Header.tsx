import { Navbar, NavbarBrand } from "@nextui-org/react";

const Header = () => {
  return (
    <Navbar
      maxWidth="2xl"
      classNames={{ wrapper: "px-0" }}
      isBordered
      shouldHideOnScroll
    >
      <NavbarBrand>
        <p className="font-bold text-2xl text-slate-800">
          GitLab CI/CD Automation Platform
        </p>
      </NavbarBrand>
    </Navbar>
  );
};

export default Header;
