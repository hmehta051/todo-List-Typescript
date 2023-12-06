import React, { createContext, useState, FC, ReactNode } from "react";

interface ApplicationContextProps {
  deleteSwitch: boolean;
  setDeleteSwitch: React.Dispatch<React.SetStateAction<boolean>>;
  actionID: number;
  SetActionID: React.Dispatch<React.SetStateAction<number>>;
  editableInput: string;
  setEditableInput: React.Dispatch<React.SetStateAction<string>>;
}

export const ApplicationContext = createContext<ApplicationContextProps>({
  deleteSwitch: false,
  setDeleteSwitch: () => {},
  actionID: 0,
  SetActionID: () => {},
  editableInput: "",
  setEditableInput: () => {},
});

interface ApplicationContextProviderProps {
  children: ReactNode;
}

const ApplicationContextProvider: FC<ApplicationContextProviderProps> = ({
  children,
}) => {
  const [deleteSwitch, setDeleteSwitch] = useState<boolean>(false);
  const [actionID, SetActionID] = useState<number>(0);
  const [editableInput, setEditableInput] = useState<string>("");

  const contextValue: ApplicationContextProps = {
    deleteSwitch,
    setDeleteSwitch,
    actionID,
    SetActionID,
    editableInput,
    setEditableInput,
  };

  return (
    <ApplicationContext.Provider value={contextValue}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
