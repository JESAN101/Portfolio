import logo from "@/assets/logo/JB_logo_1.png";

function Logo() {
  return (
    <img
      src={logo}
      alt="Logo"
      className="h-16 w-16 shrink-0 select-none object-contain cursor-default"
    />
  );
}

export default Logo;
