import { NavLink } from "react-router-dom";

const links = [
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Experience", path: "/experience" },
  { name: "Certificates", path: "/certificates" },
  { name: "Contact", path: "/contact" },
];

function NavLinks() {
  return (
    <nav className="flex items-center gap-10">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `relative font-medium transition ${
              isActive
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {link.name}
              {isActive && (
                <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-blue-500" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavLinks;