import React, { ReactNode, useState } from "react";
import { areaContextType } from "../types/areaContext";
import { shapeType } from "../types/shape";

export const AreaContext = React.createContext<areaContextType | undefined>(undefined);

export const AreaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [shapeData, setShapeData] = useState<shapeType[]>([]);

    return (
        <AreaContext.Provider value={{ shapeData, setShapeData }}>
            {children}
        </AreaContext.Provider>
    );
}