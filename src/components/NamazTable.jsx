import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const NamazTable = ({ prayers }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#e0e0e0" }}> {/* Header Background */}
            <TableCell><strong>Prayer</strong></TableCell>
            <TableCell><strong>Farz</strong></TableCell>
            <TableCell><strong>Nafl</strong></TableCell>
            <TableCell><strong>Sunnat</strong></TableCell>
            <TableCell><strong>Witr</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Notes</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prayers?.map((prayer, index) => (
            <TableRow 
              key={index}
              sx={{
                transition: "background-color 0.3s",
                "&:hover": { backgroundColor: "#f5f5f5" }  // Light gray on hover
              }}
            >
              <TableCell>{prayer.name}</TableCell>
              <TableCell>{prayer.farz}</TableCell>
              <TableCell>{prayer.nafl}</TableCell>
              <TableCell>{prayer.sunnat}</TableCell>
              <TableCell>{prayer.witr}</TableCell>
              <TableCell>{prayer.date}</TableCell>
              <TableCell>{prayer.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NamazTable;
