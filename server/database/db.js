import mongoose from "mongoose";

const Connection = async (username="bhushandocs", password="bhushan33") =>{
    const URL = `mongodb://${username}:${password}@ac-5kmrilb-shard-00-00.2yhuwis.mongodb.net:27017,ac-5kmrilb-shard-00-01.2yhuwis.mongodb.net:27017,ac-5kmrilb-shard-00-02.2yhuwis.mongodb.net:27017/?ssl=true&replicaSet=atlas-3a1cp3-shard-0&authSource=admin&retryWrites=true&w=majority`

try{
    await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true})
        console.log("connected dadabase");
}
catch(error)
{
console.log("error while connecting ", error);
}

}
export default Connection

