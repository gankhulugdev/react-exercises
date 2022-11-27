import React from "react";
import { Outlet } from "react-router-dom";

const EmployeePageLayout = ()=>{
    return <div>
        <Outlet/>
    </div>
}

export default EmployeePageLayout