import "../components/employee-list.css";
import React, { useContext, useState } from "react";
import { ApplicationContext } from "../context/ApplicationContextProvider";
import Modal from "./Modal";
import EditEmployeeModal from "./EditEmployeeModal";

type Employee = {
  id: number;
  name: string;
  age: number;
  city: string;
  pinCode: string;
  show?: boolean | undefined; // Optional property indicating visibility, added in the app
};

interface EmployeeListProps {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[] | null>>;
  handleSave: (id: number, editRecord: Partial<Employee>) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  setEmployees,
  handleSave,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedEmployee, setEditedEmployee] = useState<Employee | null>(null);
  const [rowNum, setRowNum] = useState<number>(0);
  const { deleteSwitch, setDeleteSwitch, SetActionID, actionID } =
    useContext(ApplicationContext);

  const handleDeleteRaw = (id: number, rowNum: number) => {
    setDeleteSwitch(true);
    SetActionID(id);
    setRowNum(rowNum + 1);
  };

  const handleCallBack = () => {
    setEmployees(employees.filter((record) => record.id !== actionID));
  };

  const closeModal = () => {
    setDeleteSwitch(false);
    setEditMode(false);
    setEditedEmployee(null);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditedEmployee(employee);
    setEditMode(true);
  };

  const handleSaveEmployee = () => {
    if (editedEmployee) {
      handleSave(editedEmployee.id, editedEmployee);
      setEditMode(false);
      setEditedEmployee(null);
    }
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>PinCode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={6}>No records found</td>
            </tr>
          ) : (
            employees.map((employee, idx) => (
              <tr key={employee.id}>
                <td>{idx + 1}</td>
                <td>{!employee.name ? "-" : employee.name}</td>
                <td>{employee.age}</td>
                <td>{employee.city}</td>
                <td>{!employee.pinCode ? "-" : employee.pinCode}</td>
                <td>
                  <button
                    className="btn-action"
                    onClick={() => handleEditEmployee(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-action"
                    onClick={() => handleDeleteRaw(employee.id, idx)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {deleteSwitch && (
        <Modal
          isOpen={deleteSwitch}
          onClose={closeModal}
          onConfirm={handleCallBack}
          title={`Delete Row ${rowNum}`}
          children={undefined}
        />
      )}
      {editMode && (
        <EditEmployeeModal
          onSave={handleSaveEmployee}
          onClose={closeModal}
          employee={editedEmployee}
          setEditedEmployee={setEditedEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeList;
