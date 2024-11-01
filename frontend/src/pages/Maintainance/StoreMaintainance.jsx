import { useState } from "react";
import { useParams } from "react-router-dom";
export default function StoreMaintainance() {
    const { storeId } = useParams();
    return (
        <div>
            <p>{storeId}</p>
        </div>
    );
};