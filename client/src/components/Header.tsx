import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

const Header = () => {
  return (
    <Navbar
      maxWidth="2xl"
      classNames={{ wrapper: "px-0" }}
      isBordered
      shouldHideOnScroll
    >
      <NavbarContent
        justify="center"
        className="w-full flex justify-center items-center"
      >
        <NavbarItem>
          <p className="font-bold text-2xl text-slate-800">
            GitLab CI/CD Automation Platform
          </p>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
