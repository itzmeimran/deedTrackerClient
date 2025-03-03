import React, { useState, useCallback } from "react";
import PageLayout from "../../components/PageLayout";
import { Autocomplete, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { apiConnector } from "../../apis/apiConnector";
import { useNavigate } from "react-router-dom";

const namazOptions = [
  "Fajr",
  "Zuhr",
  "Asr",
  "Maghrib",
  "Isha",
  "Taraweeh",
  "Tahajjud",
];

const AddPrayer = () => {
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [prayer, setPrayer] = useState(namazOptions[0]); // Default to "Fajr"
  const [prayerDetails, setPrayerDetails] = useState({
    farz: 0,
    sunnat: 0,
    nafl: 0,
    witr: 0,
    notes: "",
  });

  // Handle date change
  const handleSetDate = (e) => {
    setDate(e.target.value);
  };

  // Handle input changes for Farz, Sunnat, Nafl, Witr, Notes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let newValue =
      name === "notes"
        ? value
        : Math.max(
            0,
            Math.min(
              name === "farz" || name === "sunnat" ? 4 : 20,
              Number(value)
            )
          ); // Set limits

    setPrayerDetails((prev) => ({ ...prev, [name]: newValue }));
  };

  // API call to add prayer
  const addPrayer = useCallback(async () => {
    try {
      const URL = process.env.REACT_APP_CONST_DEED + "storePrayer";
      const payload = { name: prayer, date, ...prayerDetails };
      const { data } = await apiConnector("POST", URL, payload);
      toast.success("Prayer added successfully! ✅");
      console.log("Response:", data);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error adding prayer");
    }
  }, [date, prayer, prayerDetails]);
  const navigate = useNavigate();
  return (
    <PageLayout
      sectionHeading="Add Prayer"
      sectionDescription="Add your prayers here"
    >
      <div className="flex flex-col gap-4">
        <Button
          onClick={() => navigate("/")}
          variant="var1"
          sx={{ width: "150px" }}
        >
          Back
        </Button>
        {/* Date Input */}
        <TextField
          name="date"
          onChange={handleSetDate}
          value={date}
          label="Date"
          variant="filled"
          fullWidth
        />

        {/* Namaz Dropdown */}
        <Autocomplete
          options={namazOptions}
          value={prayer}
          disableClearable
          onChange={(event, newValue) => setPrayer(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Namaz"
              variant="filled"
              fullWidth
            />
          )}
        />

        {/* Namaz Details (Farz, Sunnat, Nafl, Witr) */}
        <TextField
          name="farz"
          label="Farz"
          type="number"
          value={prayerDetails.farz}
          onChange={handleInputChange}
          variant="filled"
          fullWidth
          min={0}
          max={4}
        />
        <TextField
          name="sunnat"
          label="Sunnat"
          type="number"
          value={prayerDetails.sunnat}
          onChange={handleInputChange}
          variant="filled"
          fullWidth
          min={0}
          max={4}
        />
        <TextField
          name="nafl"
          label="Nafl"
          type="number"
          value={prayerDetails.nafl}
          onChange={handleInputChange}
          variant="filled"
          fullWidth
          min={0}
          max={20}
        />
        <TextField
          name="witr"
          label="Witr"
          type="number"
          value={prayerDetails.witr}
          onChange={handleInputChange}
          variant="filled"
          fullWidth
          min={0}
          max={3}
        />

        {/* Notes Section */}
        <TextField
          name="notes"
          label="Notes (Optional)"
          type="text"
          value={prayerDetails.notes}
          onChange={handleInputChange}
          variant="filled"
          fullWidth
          multiline
          rows={3}
        />

        {/* Submit Button */}
        <Button variant="contained" color="primary" onClick={addPrayer}>
          Add Prayer
        </Button>
      </div>
    </PageLayout>
  );
};

export default AddPrayer;
