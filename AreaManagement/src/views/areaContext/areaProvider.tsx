import React, { ReactNode, useState } from "react";
import { AreaContextType } from "../../types/AreaContextType";
import { shapeType } from "../../types/ShapeType";

export const AreaContext = React.createContext<AreaContextType | undefined>(undefined);

export const AreaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [shapeData, setShapeData] = useState<shapeType[]>([]);

    return (
        <AreaContext.Provider value={{ shapeData, setShapeData }}>
            {children}
        </AreaContext.Provider>
    );
}