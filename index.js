const Mysql = require('./mysql')


exports.handler = async (event) => {
    try {
        //Declaración de variables
        const isMutant = true;
        const isHuman = false;
        let mutantsCount = 0;
        let humansCount = 0;
        let mutantAverage = 0;
        //let body = JSON.parse(event.body);
        //let bodyObjeto = body.mutante;

        //consulto Cantidad de mutantes
        mutantsCount = await getCount(isMutant);
        let mutants = mutantsCount.results[0]["COUNT(*)"];
        //Consulto canditad de humanos 
        humansCount = await getCount(isHuman);
        let humans = humansCount.results[0]["COUNT(*)"];
        //Calculo el promedio de mutantes
        let totalEvaluated = mutants + humans;
        mutantAverage = mutants/totalEvaluated;
         console.log("muestro q hay en mutant average: "+mutantAverage);
        //Armo mensaje de respuesta 
        let statusCode = 200
        return {statusCode,body:JSON.stringify({"Mutants":mutants, "Humans":humans, "Mutant Average":mutantAverage}) };
    } catch (error) {
        let statusCode = 501;
        console.log(error);
        return {statusCode,body:JSON.stringify({"Message":" Ha Ocurrido un error"}) };
    }
};

//Consulta 
async function getCount(genotype) {
    let query = `SELECT COUNT(*) FROM sys.Adn WHERE isMutant = (?)`;
    let params = [genotype];
    return await Mysql.executeQuery(query,params);
}


this.handler();