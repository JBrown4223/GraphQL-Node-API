const { round } = require("lodash");
const ld = require("lodash");
const { ServerData } = require("../data/serverSales")

const resolvers = {
    Query: {
      getServers: () => ServerData,
      
      getServersBySect: (_,args) =>{
        const section  = args.section;
        
        return ld.filter( ServerData, {section});
        
      }

    } 

}

module.exports = { resolvers };
