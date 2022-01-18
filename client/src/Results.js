import React, {  useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Styles from "./styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import _ from 'lodash';



const GET_SALES_BY_SECTION = gql`
    query getServersBySect($section: String!) {
        getServersBySect(section: $section) {
            id
            serverName
            section
            sales
            hoursWorked
            effRate
            tipPct
        
        }
    }
`;

const Results = () =>{


    const input  = useLocation();
    
    console.log(input.state.query);

    const query = input.state.query;


    const [date] = useState(new Date().toDateString());
    const [ttlSales, setSales] = useState(0);
    const [effRate, setEff] = useState(0);
    const [tipRate, setRate] = useState(0);
    const [length, setLength] = useState(0);

    

 
        
    

     //Initial Table query
     const { data } = useQuery(GET_SALES_BY_SECTION,
         query
     ); 
    
     let navigate = useNavigate();
  
      
    useEffect(() => {

        if(data && data.getServersBySect){
            console.log(data.getServersBySect);
             setLength(data.getServersBySect.length);
             

                setSales( _.sumBy(data.getServersBySect, (d) => {
                       return d.sales 
            
                }));
                

                
                setEff( _.sumBy(data.getServersBySect, (l) => {
                    
                      return l.effRate;
            
                }));
            
                setRate( _.sumBy(data.getServersBySect, (b) => {
                
                    return b.tipPct;
            
                }));

                
            
        }
        
    }, [data]);


    let total = ttlSales.toFixed(2);
    
    function setTableRow(id) {
        return (Number(id) & 1) ? Styles.oddRow : Styles.evenRow;
  
    }
   

    return(
        <div>
            <div style={Styles.header}>
                <h1> {query.variables.section} Sales For: {date}</h1>
            </div>

            <div style={Styles.buttonGroup}>
                <button 
                    style={Styles.navButtons} 
                    onClick={() => {
                        console.log("Button Event - Back");
                        navigate("/");
                  }}>Back</button>

            </div>
            <div style={Styles.spacer}></div>
        
               <div style={Styles.salesSection}>
              
                    <div style={Styles.salesBoxHolder}>
                        
                        <Box
                            sx={ Styles.salesBoxGood}

                        ><h3>Total Sales<br/>${total}</h3></Box>
                        <Box
                            sx={ Styles.salesBoxGood}

                        ><h3>Average Efficiency<br/>${(effRate/length).toFixed(2)}</h3></Box>
                        <Box
                            sx={ Styles.salesBoxGood}
                        ><h3>Average Tip %<br/>{((tipRate/length)*100).toFixed(2)}%</h3></Box>

                    </div>
                </div>
            
            <div style={Styles.spacer}></div>
        
            <div className="table">
               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow style={Styles.evenRow}>
                            <TableCell style={Styles.tableText}>ID</TableCell>
                            <TableCell style={Styles.tableText} align="right">Name</TableCell>
                            <TableCell style={Styles.tableText} align="right">Section</TableCell>
                            <TableCell style={Styles.tableText} align="right">Sales</TableCell>
                            <TableCell style={Styles.tableText} align="right">Hrs Worked</TableCell>
                            <TableCell style={Styles.tableText} align="right">Efficiency Rate</TableCell>
                            <TableCell style={Styles.tableText} align="right">Tip%</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        { data && data.getServersBySect.map((row) => (
                        <TableRow
                            style = {setTableRow(row.id)}
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell style={Styles.tableText} component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell style={Styles.tableText} align="right">{row.serverName}</TableCell>
                            <TableCell style={Styles.tableText} align="right">{row.section}</TableCell>
                            <TableCell style={Styles.tableText} align="right">{row.sales}</TableCell>
                            <TableCell style={Styles.tableText} align="right">{row.hoursWorked}</TableCell>
                            <TableCell style={Styles.tableText} align="right">{row.effRate}</TableCell>
                            <TableCell style={Styles.tableText} align="right">{row.tipPct}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>



        </div>
    );
}

export default Results;