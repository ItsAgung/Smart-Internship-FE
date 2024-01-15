import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import CardDashboard from "../../components/CardDashboard.jsx";
import Cookies from "js-cookie";
const DashboardAdmin = () => {
  const token = Cookies.get("user");
  const [position, setPosition] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getDashboardData() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/admin/dashboard`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosition(response.data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error.response.data.errors);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 pt-4 2xl:gap-7.5 justify-between">
        {position.map((data, index) => (
          <CardDashboard
            key={index}
            index={index}
            data={data}
            loading={isLoading}
          />
        ))}
      </div>
    </>
  );
};
export default DashboardAdmin;
