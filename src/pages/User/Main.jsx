import React, { useState, useCallback, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import { toast } from "react-toastify";
import { apiConnector } from "../../apis/apiConnector";
import { Button, TextField } from "@mui/material";
import NamazTable from "../../components/NamazTable";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
const Main = () => {
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  const [userData, setUserData] = useState([]);

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  // Function to fetch user data
  const getData = useCallback(async () => {
    try {
      const URL = process.env.REACT_APP_CONST_DEED + "getPrayerByDate";
      const { data } = await apiConnector("GET", URL, null, null, { date });

      if (data?.prayers?.length > 0) {
        toast.success("Prayer data fetched successfully! ✅");
      } else {
        toast.info("No prayer records found for this date.");
      }

      setUserData(data);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error fetching data");
    }
  }, [date]);

  // Handle date change
  const handleSetDate = (e) => {
    setDate(e.target.value);
  };
  const navigate = useNavigate();

  // Logout
  function logout() {
    sessionStorage.clear("user");
    sessionStorage.clear("token");
    navigate('/auth')
  }

  useEffect(() => {
    getData();
  }, []);

  const roza = parseInt(date.split("-")[2] - 1);

  return (
    <PageLayout
      sectionHeading="Dashboard"
      sectionDescription="Track All your prayers here"
    >
      <div className="flex justify-between">
        <div>
          <h1 className="sm:text-md font-bold md:text-xl lg:text-2xl">
            Welcome, {user?.firstName} {user?.lastName} !!
          </h1>
          <p className="font-bold sm:text-md md:text-lg">Ramdan {roza}</p>
        </div>
        <div>
          <Button onClick={logout} startIcon={<LogoutIcon />} variant="var1">
            Logout
          </Button>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <TextField
          name="date"
          onChange={handleSetDate}
          value={date}
          label="Date"
          variant="filled"
        />
        <Button
          startIcon={<SearchIcon />}
          onClick={getData}
          variant="var1"
          sx={{ height: "40px" }}
          color="primary"
        >
          Search
        </Button>
      </div>
      <div>
        <NamazTable prayers={userData?.prayers || []} />
      </div>
      <Button
        startIcon={<AddIcon />}
        sx={{
          width: "150px",
          textTransform: "none",
          margin: "0 auto",
          borderRadius: "0px",
        }}
        onClick={() => navigate("/add-prayer")}
      >
        Add Prayer
      </Button>
    </PageLayout>
  );
};

export default Main;
