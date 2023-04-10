import logo from "../../assets/logo.png";

function Navbar(props) {
  return (
    <nav className="w-full border-gray-200 bg-gray-800 px-4 py-2.5  lg:px-6">
      <div className=" flex  flex-wrap items-center justify-between ">
        <a href="/" className="flex items-center">
          <img src={logo} className="mr-2 h-6 rounded-full sm:h-9" alt="Logo" />
          <h1 className="text-[24px] font-[500] text-white"> {props.title}</h1>
        </a>
        {props.children}
      </div>
    </nav>
  );
}

export default Navbar;
