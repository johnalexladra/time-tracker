import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Dashboard = () => {
    const [workDetails, setWorkDetails] = useState([]);
    const [totalWorkingHours, setTotalWorkingHours] = useState(0);
    const [overtime, setOvertime] = useState(0);
    useEffect(() => {
        // Fetch the user's work details from the Node.js API
        axios.get("http://localhost:8080/api/log").then((response) => {
            let totalHours = 0;
            let overtimeHours = 0;
            response.data.forEach((workDetails, index) => {
                let workerHours = 0;
                let workerOvertime = 0;
                workDetails.logs.forEach((workDetail) => {
                    const startTime = new Date(workDetail.timeStart);
                    const endTime = new Date(workDetail.timeEnd);
                    const workingHours = (endTime - startTime) / (1000 * 60 * 60);
                    workerHours += workingHours;
                    totalHours += workingHours;
                    if (workingHours > 8) {
                        overtimeHours += workingHours - 8;
                        workerOvertime += workingHours - 8;
                    }

                });

                response.data[index].totalHours = workerHours;
                response.data[index].overtimeHours = workerOvertime;

                setTotalWorkingHours(totalHours);
                setOvertime(overtimeHours);
            })

            setWorkDetails(response.data);
        });
    }, []);
    return (
        <div>
            <h1>Work Details</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Work Details</TableCell>
                            <TableCell>Total Hours</TableCell>
                            <TableCell>OT Hours</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workDetails.map((workDetail) => (
                            <TableRow key={workDetail.id}>
                                <TableCell>{workDetail.id}</TableCell>
                                <TableCell>{workDetail.firstName + " " + workDetail.lastName}</TableCell>
                                <TableCell>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            Number of Task: {workDetail.logs.length}
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <ul>
                                                {workDetail.logs.map((log, index) => (
                                                    <li key={index}>{log.description}</li>
                                                ))}
                                            </ul>
                                        </AccordionDetails>
                                    </Accordion>
                                </TableCell>
                                <TableCell>{workDetail.totalHours.toFixed(2)}</TableCell>
                                <TableCell>{workDetail.overtimeHours.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="footer">
                <h2>Total Working Hours: {totalWorkingHours.toFixed(2)}</h2>
                <h2 style={{ textAlign: "right" }}>Overtime: {overtime.toFixed(2)}</h2>
            </div>
        </div>
    );
};
export default Dashboard;