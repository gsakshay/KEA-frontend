import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function AdmitCard({ details }) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes?.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3} color="primary">
                            {details?.name}
                        </TableCell>
                        <TableCell align="right" color="primary">{details?.rollNumber}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Age</TableCell>
                        <TableCell align="right">{details?.age}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Aadhaar Number</TableCell>
                        <TableCell align="right">{details?.aadhaarNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>DOB</TableCell>
                        <TableCell align="right">{details?.dob}</TableCell>
                    </TableRow>
                </TableBody>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3} color="primary">
                            Parents details
                        </TableCell>
                        <TableCell align="right" color="primary"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Age</TableCell>
                        <TableCell align="right">{details?.parent?.age}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Phone Number</TableCell>
                        <TableCell align="right">{details?.parent?.phno}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Relation</TableCell>
                        <TableCell align="right">{details?.parent?.relation}</TableCell>
                    </TableRow>
                </TableBody>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3} color="primary">
                            Exam center details
                        </TableCell>
                        <TableCell align="right" color="primary"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell rowSpan={5} />
                        <TableCell colSpan={2}>Name</TableCell>
                        <TableCell align="right">{details?.exam_center?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Address</TableCell>
                        <TableCell align="right">{details?.exam_center?.address}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Phone Number</TableCell>
                        <TableCell align="right">{details?.exam_center?.phno}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Date</TableCell>
                        <TableCell align="right">{details?.hall_ticket?.examDate}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Time</TableCell>
                        <TableCell align="right">{details?.hall_ticket?.examTime}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
