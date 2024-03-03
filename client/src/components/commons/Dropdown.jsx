import React, { useState } from "react";
import { MdArrowDropDown, MdArrowUpward } from "react-icons/md";
import { useUserStore } from "~/store/useUserStore";

const Dropdown = ({
  id,
  register,
  errors = {},
  validate,
  setSelectedDepartmentId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { departments } = useUserStore();

  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
    setSelectedDepartmentId(department.id); // Thêm dòng này để truyền departmentId lên component cha
    setIsOpen(false); // Đóng dropdown sau khi lựa chọn
  };

  const sortedDepartments = departments
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name)); // Sắp xếp theo thứ tự ABC

  const filteredDepartments = sortedDepartments.filter((department) =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex flex-col items-center w-[340px] rounded-md">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full h-10 px-4 border border-gray-300 rounded-md cursor-pointer">
        <span>
          {selectedDepartment ? selectedDepartment.name : "Choose department"}
        </span>
        {isOpen ? <MdArrowUpward /> : <MdArrowDropDown />}
      </div>
      {isOpen && (
        <div className="absolute top-12 w-full bg-white border border-gray-300 rounded-md z-10 max-h-[120px] overflow-y-auto">
          <input
            id={id}
            placeholder="Search department"
            className="w-full p-2 border-b border-gray-300 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredDepartments.map((department) => (
            <div
              key={department.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectDepartment(department)}>
              <input
                type="hidden" // Sử dụng input type="hidden" để giữ giá trị id
                {...register(`departmentId`, {
                  value: department.id,
                  validate,
                })}
                name={id}
              />
              {department.name}
            </div>
          ))}
          {errors[`department_${id}`] && (
            <small className="text-red-500">
              {errors[`department_${id}`]?.message}
            </small>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
