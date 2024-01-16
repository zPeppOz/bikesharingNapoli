import Logo2 from "../../easyLogo2.png";
import { Link } from "react-router-dom";

export function TopHeader({ children }) {
  return (
    <header className="flex w-full flex-row items-center justify-between bg-[#FFB93F] px-4 py-2 align-middle text-black shadow-lg">
      <div className=" flex flex-row items-center justify-start ">
        <Link to="/" className="flex flex-col items-center md:flex-row">
          <img
            src={Logo2}
            alt="logo"
            className=" hidden h-16 w-auto self-start md:block"
          />
          <h1 className="text-2xl font-bold md:mt-2">EasySharing</h1>
        </Link>
      </div>
      {children}
    </header>
  );
}

export default TopHeader;
