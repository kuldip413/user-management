import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";

const Dashboard = ()=>{
	const [checked, setChecked] = useState(false);

	return (
    <div>
      <label>
          <input type="checkbox" onChange={() => setChecked(!checked)} checked={checked}/>
           {
             checked ? (
             <input className="inputRequest formContentElement" name="token" type="text" placeholder="token"/>
               ) : (<div></div>)
           }
     </label>
    </div>
  );
};

export default Dashboard;