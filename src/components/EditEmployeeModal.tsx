import React from "react";
import "./EditModal.css";

type Employee = {
  id: number;
  name: string;
  age: number;
  city: string;
  pinCode: string;
  show?: boolean; // Optional property indicating visibility, added in the app
};

interface EditEmployeeModalProps {
  onSave: () => void;
  onClose: () => void;
  employee: Employee | null; // Allow null as a valid value for employee
  setEditedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  onSave,
  onClose,
  employee,
  setEditedEmployee,
}) => {
  // Check if employee is null and handle accordingly
  if (!employee) {
    return null; // Or return something else for the null case
  }

  const handleSave = () => {
    onSave();
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Employee
  ) => {
    const value = e.target.value;
    setEditedEmployee((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal">
        <h2>Edit Column 2</h2>
        <div className="modal-content">
          <div>
            <input
              type="text"
              value={employee.name}
              onChange={(e) => handleChange(e, "name")}
            />
          </div>
          <div className="modal-actions">
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmployeeModal;
