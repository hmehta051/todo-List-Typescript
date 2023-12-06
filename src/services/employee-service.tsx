export const fetchEmployees = async (): Promise<any> => {
  const apiUrl: string = "https://assets.alippo.com/catalog/static/data.json";

  try {
    const response: Response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const employeeData: any = await response.json();
    return employeeData;
  } catch (error) {
    throw error;
  }
};
