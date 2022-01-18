import React, {  useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Styles from "./styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import _ from 'lodash';




//GraphQL Queries

const QUERY_ALL_SALES = gql`
  query getServers {
        getServers {
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





const DisplayData = () =>{

    const [date] = useState(new Date().toDateString());
    const [dining, setDR] = useState(0);
    const [lounge, setLG] = useState(0);
    const [bar, setBR] = useState(0);
    

     //Initial Table query
     const { data } = useQuery(QUERY_ALL_SALES); 
    
     let navigate = useNavigate();
  
      
    useEffect(() => {

        if(data && data.getServers){

               let x = _.sumBy(data.getServers, (d) => {
                    if(d.section === "DR")
                       return d.sales;
            
                });
            
                
               let y =_.sumBy(data.getServers, (l) => {
                    if(l.section === "LG")
                      return l.sales;
            
                });
            
               let z = _.sumBy(data.getServers, (b) => {
                   if(b.section === "BR")
                      return b.sales;
            
                });
                setDR(x);
                setLG(y);
                setBR(z);
            
        }
        
    }, [data]);

    function handleSubmit(query) {

        

        const queryString = {
            variables: { section: query}
        };

        console.log(queryString)
        navigate("./results", {state :{ query: queryString }});
    }
    
    function styledBox(value){

        if(value >= 2000.00)
        
            return Styles.salesBoxGood;
        
        else if(value >= 1500.00 && value <= 1999.00)

            return Styles.salesBoxMed;
            
        else

            return Styles.salesBoxBad;

    }

    function setTableRow(id) {
        return (Number(id) & 1) ? Styles.oddRow : Styles.evenRow;
  
    }
   

    return(
        <div>
            <div style={Styles.header}>
                <h1> Sales For: {date}</h1>
            </div>
            <div style={Styles.spacer}></div>
            <div className="buttonNav" style={Styles.buttonGroup}>
                
                <button
                    style={Styles.navButtons} 
                    onClick={() => {
                        console.log("Button Event - DR");
                        handleSubmit("DR");
                }}>Dining Room</button>&nbsp;

                <button 
                    style={Styles.navButtons} 
                    onClick={() => {
                        console.log("Button Event - LG");
                        handleSubmit("LG");
                }}>Lounge</button>&nbsp;


            
                <button 
                    style={Styles.navButtons} 
                    onClick={() => {
                        console.log("Button Event - BR ");
                        handleSubmit("BR");
                }}>Bar</button>

            </div>
            <div style={Styles.spacer}></div>
        
            <div style={Styles.salesSection}>
              
              <div style={Styles.salesBoxHolder}>    
                    <Box
                        sx={ styledBox(dining)}
                        

                    ><h3>Dining Room<br/>${dining.toFixed(2)}</h3></Box>
                    <Box
                        sx={styledBox(lounge)}

                    ><h3>Lounge<br/>${lounge.toFixed(2)}</h3></Box>
                    <Box
                        sx={styledBox(bar)}

                    ><h3>Bar<br/>${bar.toFixed(2)}</h3></Box>
              </div>

            </div>
            <div style={Styles.spacer}></div>
           
            
            <div className="table">
               <TableContainer >
                    <Table sx={{ minWidth: 650}} >
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
                            { data && data.getServers.map((row) => (
                            <TableRow
                                style = {setTableRow(row.id)}
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
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
export default DisplayData;





    


