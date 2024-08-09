import React, { ReactNode, useState } from "react";
import { AreaContextType } from "../../types/AreaContextType";
import { areaType } from "../../types/AreaType";

export const AreaContext = React.createContext<AreaContextType | undefined>(undefined);

export const AreaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [shapeData, setShapeData] = useState<areaType[]>([]);

    return (
        <AreaContext.Provider value={{ shapeData, setShapeData }}>
            {children}
        </AreaContext.Provider>
    );
}