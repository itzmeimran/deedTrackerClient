import React, { useState, useCallback } from "react";
import PageLayout from "../../components/PageLayout";
import { toast } from "react-toastify";
import { apiConnector } from "../../apis/apiConnector";
import { Button, TextField } from "@mui/material";
import NamazTable from "../../components/NamazTable";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [userData, setUserData] = useState([]);

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
  return (
    <PageLayout
      sectionHeading="Dashboard"
      sectionDescription="Track All your prayers here"
    >
      <div className="flex gap-4 items-center">
        <TextField
          name="date"
          onChange={handleSetDate}
          value={date}
          label="Date"
          variant="filled"
        />
        <Button
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
      <Button onClick={() => navigate("/add-prayer")}>Add Prayer</Button>
    </PageLayout>
  );
};

export default Main;
