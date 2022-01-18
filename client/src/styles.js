

const styles = {

     
    header: {
        height: "80px",
        width: "auto",
        paddingLeft: "5%",
        paddingRight: "5%",
        backgroundColor: "#595653",
        fontFamily: "sans-serif",
        color: "#faf5f5",
        alignItems: "center"

    },

    spacer: {
        height:"14px",
        width: "auto",
        backgroundColor:"black",
        paddingLeft: "5%",
        paddingRight: "5%"
    },

    buttonGroup: {
        height:"80px",
        width: "auto",
        alignItems: "center",
        backgroundColor:"#8c8c8c"
    },

    navButtons : {
        marginBottom: "5px",
        padding: "10px",
        cursor: "pointer", 
        float: "left",
        height: "60px",
        width: "75px",
        marginLeft: "30px",
        margin: "15px",
        alignItems: "center"

    },

    salesSection:{

        
        alignItems: "center",
        height:"200px",
        width: "auto"
    },

    salesBoxHolder:{

      
        height: "175px",
        width: "60%",
        alignItems: "center",
        display: "flex",
        marginLeft: "250px",
        marginRight: "250px"
    },

    salesBoxGood: {
        
        width: "150px",
        height: "150px",
        backgroundColor: "#3bac0a",
          '&hover': { backgroundColor: "#2f820b",
          opacity: [0.9, 0.8, 0.7]
        },
        marginRight: "40px",
        marginLeft:"60px"
        
            
    },

    salesBoxMed: {

        width: "150px",
        height: "150px",
        backgroundColor: '#FAE435',
         '&hover':{ backgroundColor:'#D5C126',
          opacity: [0.9, 0.8, 0.7]
        },
        margin: "30px"  
    
    },

    salesBoxBad:{
        width: "150px",
        height: "150px",
        backgroundColor: '#F72A2A',
        '&:hover': {
        backgroundColor: '#941919',
        opacity: [0.9, 0.8, 0.7],
        },
        margin: "30px"
    },

    evenRow: {
        backgroundColor: "#595653"
        
    },
    oddRow:{
        backgroundColor: "#8c8c8c"
    },

    tableText: {
        color: "#faf5f5",
        fontFamily: "sans-serif"
    }
    




};

export default styles;