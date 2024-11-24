"use client";
import Dropdown from "@/components/dropdown/Dropdown";
import MyForm from "@/components/myForm/MyForm";
import MyInput from "@/components/myForm/MyInput";
import { Search } from "lucide-react";

const SearchBox = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearch = (data: any) => {
    console.log(data);
  };
  return (
    <div className="p-1 border border-gradieant rounded-full overflow-hidden  shadow-sm ">
      <MyForm
        onSubmit={handleSearch}
        className="flex justify-between items-center "
      >
        <MyInput
          placeholder="What are you looking for?"
          className="rounded-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[240px] "
          name="search"
          type="text"
        />
        <div className="border-l px-6 flex gap-6 items-center justify-between flex-1 ">
          <Dropdown
            className="w-[130px] focus:ring-offset-0 focus:ring-0 border-0  "
            defaultValue={"consultant"}
            options={[{ label: "Consultant", value: "consultant" }]}
          />
        </div>
        <button
          type="submit"
          className="btn-primary p-[10px] text-base font-medium rounded-full flex items-center   gap-[6px]"
        >
          <Search /> Search
        </button>
      </MyForm>
    </div>
  );
};

export default SearchBox;
