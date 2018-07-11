//https://www.hackerrank.com/challenges/kingdom-division/problem

const makeKingdom = (roads) => {
    const allCities = {};
    //should assume city 1 is the root?
    roads.forEach( (road) => {
        let [city1Index, city2Index] = road;
        if (city1Index === city2Index){
            console.log('bad input, city should not connect to itself')
        } else {
            const city1 = allCities[city1Index] || new City(city1Index);
            const city2 = allCities[city2Index] || new City(city2Index);
            if (city1.right){
                if (city1.left){
                    throw new Error(`bad input, city should only have two children, found third:, ${city1.id}, ${city1.right.id}, ${city1.left.id}, ${city2.id}`);
                }
                city1.left = city2;
            } else {
                city1.right = city2;
            }
            allCities[city1Index] = city1;
            allCities[city2Index] = city2;
        }
    })
    return allCities[1];
}

function kingdomDivision(n, roads) {
    //set up
    const root = makeKingdom(roads);
    const hash = {};
    //run recusion on node
    const ways = findNumDivision(hash, root, 'a') + findNumDivision(hash, root, 'b')
    return ways % 1000000007;
}


class City{
    constructor(id, left, right){
        this.id = id;
        this.left = left || null;
        this.right = right || null;
    }
    isLeaf(){
        return !this.left && !this.right;
    }
}

function findNumDivision(hash, city, cityTeam, parentTeam){
    //base cases
    if (city === null){
        throw new Error("city can't be null");
    }
    if (hash[city.id + parentTeam]){
        return hash[city.id + parentTeam]
    } else if (city.isLeaf()){
        return cityTeam === parentTeam ? 1 : 0;
    } else if (city.left === null) {
        //recursive step
        return handleNoLeft(hash, city, cityTeam, parentTeam);
    } else if (city.right === null) {
        return handleNoRight(hash, city, cityTeam, parentTeam);
    } else {
        let otherTeam = notTeam(cityTeam);
        let ways = 0;
        ways += findNumDivision(hash, city.left, cityTeam, cityTeam) * findNumDivision(hash, city.right, cityTeam, cityTeam);
        ways += findNumDivision(hash, city.left, cityTeam, cityTeam) * findNumDivision(hash, city.right, otherTeam, cityTeam);
        ways += findNumDivision(hash, city.left, otherTeam, cityTeam) * findNumDivision(hash, city.right, cityTeam, cityTeam);
        if (cityTeam === parentTeam && parentTeam !== null){
            //even though I have no partner with children, parent has me covered, and this is allowed
            ways += findNumDivision(hash, city.left, otherTeam, cityTeam) * findNumDivision(hash, city.right, otherTeam, cityTeam);
        }
        hash[city.id + parentTeam] = ways;
        return ways % 1000000007;
    }
}

function handleNoRight(hash, city, cityTeam, parentTeam){
    let ways = 0;
    let otherTeam = notTeam(cityTeam);
    ways += findNumDivision(hash, city.left, cityTeam, cityTeam);
    if (cityTeam === parentTeam && parentTeam !== null){
        //even though I have no partner with children, parent has me covered, and this is allowed
        ways += findNumDivision(hash, city.left, otherTeam, cityTeam);
    }
    hash[city.id + parentTeam] = ways;
    return ways % 1000000007;
}

function handleNoLeft(hash, city, cityTeam, parentTeam){
    let ways = 0;
    let otherTeam = notTeam(cityTeam);
    ways += findNumDivision(hash, city.right, cityTeam, cityTeam);
    if (cityTeam === parentTeam && parentTeam !== null){
        //even though I have no partner with children, parent has me covered, and this is allowed
        ways += findNumDivision(hash, city.right, otherTeam, cityTeam);
    }
    hash[city.id + parentTeam] = ways;
    return ways % 1000000007;
}

function notTeam(team){
    return team === 'a' ? 'b' : 'a';
}