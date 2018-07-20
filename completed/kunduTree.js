//https://www.hackerrank.com/challenges/kundu-and-tree/problem

class BlackGraph{
    constructor(edges){
        edges.forEach( edge => {
            const [n1, n2, type] = edge;
            if (type === 'b'){
                this.linkNodes(n1, n2)
            }
        })
    }
    addNode(key){
        if (this[key]){
            console.log(`addNode for ${key} failed: will not overwrite an existing node`);
            console.log(`value in tree:`, this[key]);
            return false;
        } else {
            this[key] = {}
        }
    }
    linkNodes(key1, key2){
        if (!this[key1]){
            this.addNode(key1);
        } if (!this[key2]){
            this.addNode(key2);
        }
        this[key1][key2] = this[key2];
        this[key2][key1] = this[key1];
    }
    constructSubTrees(){
        const visited = {};
        const result = [];
        for (let key in this){
            if (this.hasOwnProperty(key) && !visited[key]){
                // visited[key] = true; let findAllKeys handleThis
                const keysOfNewSubTree = this.findAllKeys(visited, key, [])
                result.push(keysOfNewSubTree);
            }
        }
        return result;
    }
    findAllKeys(visited, key, result){
        visited[key] = true;
        result.push(key);
        for (let neighbor in this[key]){
            if (this.hasOwnProperty(neighbor) && !visited[neighbor]){
               result = this.findAllKeys(visited, neighbor, result)
            }
        }
        return result;
    }
}

function processData(input) {
    const [numVertices, edges] = readInput(input);
    const blackGraph = new BlackGraph(edges);
    const subTrees = blackGraph.constructSubTrees();
    const allBadWays = subTrees.reduce( (badWays, subTree) => {
        return ( badWays //length choose 3 for all triples, numVertices - length for all pairs (length choose 2 pairs)
            + (subTree.length * (subTree.length - 1) * (subTree.length - 2) / 6) % 1000000007
            + (subTree.length) * (subTree.length - 1) / 2 * (numVertices - subTree.length)
            ) % 1000000007;
    }, 0);
    const numAllPaths = (numVertices * (numVertices - 1) * (numVertices - 2) / 6) % 1000000007; //n choose 3
    return (((numAllPaths - allBadWays) % 1000000007) + 1000000007) % 1000000007;
}

function readInput(input){
    const lines = input.trim().split('\n');
    const numVertices = lines[0];
    const edges = [];
    for (let line = 1; line < numVertices; line += 1){
        edges.push(lines[line].trim().split(' '))
    }
    return [numVertices, edges];
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   const result = processData(_input);
   console.log(result);
});
