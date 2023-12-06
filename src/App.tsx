import { useState, useEffect } from "react";
import EmployeeList from "./components/employee-list";
import { fetchEmployees } from "../src/services/employee-service";
import "./App.css";

type Employee = {
  id: number;
  name: string;
  age: number;
  city: string;
  pinCode: string;
  show?: boolean; // Optional property indicating visibility, added in the app
};

function App() {
  const [employees, setEmployees] = useState<Employee[] | null>(null);

  const fetchData = async () => {
    let uniqueIdCounter = 1;
    try {
      const data: Employee[] = await fetchEmployees();
      const modifiedData = data.map((element) => ({
        ...element,
        show: true,
        id: uniqueIdCounter++,
      }));
      setEmployees(modifiedData);
    } catch (error) {
      window.alert("An error occurred while fetching the data: " + error);
    }
  };

  const handleSave = (id: number, editRecord: Partial<Employee>) => {
    setEmployees((record) => {
      if (record) {
        return record.map((employee) => {
          if (employee.id === id) {
            return {
              ...employee,
              ...editRecord,
            };
          }
          return employee;
        });
      }
      return record; // Return record (null) if it's null
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <EmployeeList
        employees={(employees ?? []).filter((record) => record.show)}
        setEmployees={setEmployees}
        handleSave={handleSave}
      />
    </div>
  );
}

export default App;
