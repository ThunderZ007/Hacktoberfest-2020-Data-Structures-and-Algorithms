/**
 * @param {number} N
 * @param {number[][]} connections
 * @return {number}
 */
var minimumCost = function(N, connections) {
  const graph = createGraph(N, connections);
  const pq = new PriorityQueue({
    comparator: (a, b) => a[1] < b[1],
  });
  pq.enqueue([1, 0]);
  const visited = new Set();
  let mCost = 0;
  while (pq.length) {
    const [u, cost] = pq.dequeue();
    if (!visited.has(u)) {
      visited.add(u);
      mCost += cost;
      if (visited.size >= N) {
        return mCost;
      }
      for (const [v, c] of graph[u]) {
        pq.enqueue([v, c]);
      }
    }
  }
  return -1;
};

function createGraph(N, connections) {
  const graph = [...new Array(N + 1)].map(() => []);
  for (const [n1, n2, cost] of connections) {
    graph[n1].push([n2, cost]);
    graph[n2].push([n1, cost]);
  }
  return graph;
}

class PriorityQueue {
  constructor({ comparator }) {
    this.arr = [];
    this.comparator = comparator;
  }

  enqueue(val) {
    this.arr.push(val);
    moveUp(this.arr, this.arr.length - 1, this.comparator);
  }

  dequeue() {
    const output = this.arr[0];
    this.arr[0] = this.arr[this.arr.length - 1];
    this.arr.pop();
    moveDown(this.arr, 0, this.comparator);
    return output;
  }

  get length() {
    return this.arr.length;
  }
}

function moveUp(arr, i, comparator) {
  const p = Math.floor((i - 1) / 2);
  const isValid = p < 0 || comparator(arr[p], arr[i]);
  if (!isValid) {
    [arr[i], arr[p]] = [arr[p], arr[i]];
    moveUp(arr, p, comparator);
  }
}

function moveDown(arr, i, comparator) {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  const isValid =
    (left >= arr.length || comparator(arr[i], arr[left])) &&
    (right >= arr.length || comparator(arr[i], arr[right]));
  if (!isValid) {
    const next = right >= arr.length || comparator(arr[left], arr[right]) ? left : right;
    [arr[i], arr[next]] = [arr[next], arr[i]];
    moveDown(arr, next, comparator);
  }
}
