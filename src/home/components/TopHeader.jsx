import Logo2 from "../../easyLogo2.png";
import { Link } from "react-router-dom";

export function TopHeader({ children }) {
  return (
    <header className="flex w-full flex-row items-center justify-between bg-[#FFB93F] px-4 align-middle text-black shadow-lg">
      <div className=" flex flex-row items-center justify-start ">
        <Link to="/" className="flex flex-row items-center">
          <img src={Logo2} alt="logo" className=" h-16 w-auto" />
          <h1 className="mt-2 text-2xl font-bold">EasySharing</h1>
        </Link>
      </div>
      {children}
    </header>
  );
}

export default TopHeader;
