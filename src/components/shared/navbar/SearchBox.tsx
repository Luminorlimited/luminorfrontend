"use client";
// import Dropdown from "@/components/dropdown/Dropdown";
import MyForm from "@/components/myForm/MyForm";
import MyInput from "@/components/myForm/MyInput";
import { RootState } from "@/redux/store";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const SearchBox = () => {
  const [, setIsOpen] = useState("");
  // console.log(isOpen)
  const router = useRouter()
  const user = useSelector((state: RootState) => state.Auth.user);

  const handleSearch = () => {
    // console.log(data);
    if (!user) {
      router.push("/user/auth/login");
      return;
    }
    router.push(`${user.role === "client"
      ? "/project-list/retireProfessional"
      : user.role === "retireProfessional"
        ? "/project-list/client"
        : "/user/auth/login"
      }`)
  };
  return (
    <div className="relative ">
      <div className="p-1 border bg-white  border-gradieant rounded-full overflow-hidden  shadow-sm max-w-[550px]">
        <MyForm
          onSubmit={handleSearch}
          className="flex justify-between items-center "
        >
          <MyInput
            required={true}
            onChange={(e) => setIsOpen(e.target.value)}
            placeholder="What are you looking for?"
            className="rounded-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 max-w-[240px] "
            name="search"
            type="text"
          />
          {/* <div className="border-l px-6 flex gap-6 items-center justify-between flex-1 ">
            <Dropdown
              className="w-[130px] focus:ring-offset-0 focus:ring-0 border-0 text-textColor-secondary "
              defaultValue={"consultant"}
              options={[{ label: "Consultant", value: "consultant" }]}
            />
          </div> */}
          <button
            type="submit"
            className="btn-primary text-white hover:text-white px-[16px] sm:px-[20px] py-[8px] text-sm sm:text-base font-medium rounded-full lg:flex items-center gap-[4px] sm:gap-[6px]"
          >
            <Search size={18} />{" "}
            <span className="lg:block hidden">Search</span>
          </button>
        </MyForm>
      </div>
      {/* <div
        style={{
          visibility: isOpen ? "visible" : "hidden",
          opacity: isOpen ? 1 : 0,
        }}
        className={cn(
          "absolute top-[55px]  left-0 w-full duration-300   h-[200px]"
        )}
      >
        <div className="border border-gradieant p-4 size-full py-2 text-sm text-gray-700 bg-white shadow-lg overflow-hidden rounded-md"></div>
      </div> */}
    </div>
  );
};

export default SearchBox;
