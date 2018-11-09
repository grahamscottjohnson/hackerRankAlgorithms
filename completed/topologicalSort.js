//https://www.algoexpert.io/questions/Topological%20Sort

function topologicalSort(jobs, deps) {
  const sorter = new TopologicalSorter(jobs, deps);
  return sorter.sort();
}

class TopologicalSorter {
  constructor(jobs, deps) {
    this.jobs = jobs;
    this.numberOfDependency = new NumberOfDependency(jobs);
    this.numberOfDependency.addDependencies(deps);
  }

  sort() {
    //instead of collecting data and then sorting, you can improve time complexity by adding the data as you inspect them during traversal
    try {
      const jobs = this.jobs.slice();
      return jobs.sort((a, b) => {
        //   console.log(`# deps A: ${this.numberOfDependency.get(a)}`);
        //   console.log(`# deps B: ${this.numberOfDependency.get(b)}`);
        return this.numberOfDependency.get(a) - this.numberOfDependency.get(b);
      });
    } catch (error) {
      if (error.name === 'CycleError') return [];
      else throw error;
    }
  }
}

class NumberOfDependency {
  constructor(jobs) {
    this.cache = {};
    jobs.forEach(job => {
      this.cache[job] = new DependencyManager(job);
    });
    this.memoized = new Map();
    this.visited = new Set();
  }

  addDependencies(deps) {
    deps.forEach(dep => {
      const [prereq, job] = dep;
      this.getManager(job).addDependency(prereq);
    });
  }

  get(job) {
    if (this.memoized.has(job)) return this.memoized.get(job);
    if (this.visited.has(job)) {
      const err = new Error('dependencies have a cycle at: ' + job);
      err.name = 'CycleError';
      throw err;
    }
    this.visited.add(job);
    const numPrevDependencies = [];
    this.getManager(job).dependencies.forEach(prereq => {
      numPrevDependencies.push(this.get(prereq));
    });

    const numberOfDependencies =
      numPrevDependencies.length === 0
        ? 0
        : 1 + Math.max(...numPrevDependencies);

    this.memoized.set(job, numberOfDependencies);
    return numberOfDependencies;
  }

  getManager(job) {
    return this.cache[job];
  }
}

class DependencyManager {
  constructor(job) {
    this.job = job;
    this.dependencies = new Set();
  }

  addDependency(prereq) {
    this.dependencies.add(prereq);
  }
}

// Do not edit the line below.
exports.topologicalSort = topologicalSort;
