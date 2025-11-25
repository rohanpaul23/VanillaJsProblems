// ===========================================
// Doubly Linked List Node
// ===========================================
// Each node holds a key-value pair and pointers to prev & next nodes.
// Doubly linked list lets us move nodes in O(1) time.
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// ===========================================
// LRU Cache Implementation
// ===========================================
// Uses:
//   - Hash Map (key → node) for O(1) access
//   - Doubly Linked List for O(1) insert, remove, move operations
//
// List Order:
//   HEAD → Most Recently Used (MRU)
//   TAIL → Least Recently Used (LRU)
//
// Strategy:
//   - Any time a key is accessed (get or put), move it to the HEAD.
//   - When capacity exceeds, remove LRU node (just before tail).
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();        // Fast lookup: key → Node

    // Dummy nodes to avoid null checks
    this.head = new Node(null, null); // MRU side
    this.tail = new Node(null, null); // LRU side

    // Connect head <-> tail initially
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // ===========================================
  // Helper: Remove node from the linked list
  // ===========================================
  // This operation is O(1)
  _removeNode(node) {
    const prevNode = node.prev;
    const nextNode = node.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;

    // Clean the removed node's pointers (optional but tidy)
    node.prev = null;
    node.next = null;
  }

  // ===========================================
  // Helper: Add node right after head (mark as MRU)
  // ===========================================
  // New or recently used nodes go here.
  _addNodeToHead(node) {
    const first = this.head.next;

    node.prev = this.head;
    node.next = first;

    this.head.next = node;
    first.prev = node;
  }

  // ===========================================
  // Helper: Move existing node to MRU position
  // ===========================================
  // On "get" or "put" update, this is called.
  _moveToHead(node) {
    this._removeNode(node);       // unlink from current position
    this._addNodeToHead(node);    // relink at MRU position
  }

  // ===========================================
  // Helper: Remove and return the LRU node
  // ===========================================
  // LRU node is the one before tail → tail.prev.
  _popTail() {
    const lruNode = this.tail.prev;
    this._removeNode(lruNode);
    return lruNode;
  }

  // ===========================================
  // GET operation
  // ===========================================
  // If key exists:
  //   - move node to MRU position
  //   - return its value
  // Otherwise:
  //   - return -1 (LRUCache standard rule)
  get(key) {
    if (!this.map.has(key)) {
      return -1;
    }

    const node = this.map.get(key);

    // Since accessed → move to MRU
    this._moveToHead(node);

    return node.value;
  }

  // ===========================================
  // PUT operation
  // ===========================================
  // Cases:
  //   1. Key already exists → update value & move to MRU
  //   2. Key is new:
  //        - Insert new node at MRU
  //        - If over capacity, remove LRU node
  put(key, value) {
    // Case 1: key already exists
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;        // update value
      this._moveToHead(node);    // mark as recently used
      return;
    }

    // Case 2: key is new
    const newNode = new Node(key, value);

    // Add to map and mark as MRU
    this.map.set(key, newNode);
    this._addNodeToHead(newNode);

    // If capacity exceeded → evict LRU
    if (this.map.size > this.capacity) {
      const lruNode = this._popTail(); // remove from list
      this.map.delete(lruNode.key);    // remove from map
    }
  }
}



// ===========================================
// LRU Cache using only JavaScript's Map()
// ===========================================
// Map preserves insertion order.
// We will treat the END of the Map as the "most recently used" (MRU)
// and the START of the Map as the "least recently used" (LRU).
//
// Key idea:
//    - Every time we access (get) a key or update it (put),
//      we REMOVE it and RE-INSERT it.
//      This moves the key to the END of the Map → making it MRU.
//    - When capacity is exceeded, we delete the FIRST key of the Map,
//      which is the LRU entry.
//
// Time complexity:
//    get: O(1)
//    put: O(1)
//    remove LRU: O(1) — using map.keys().next().value
//
// NOTE: This approach is VALID in JS interviews
//       because Map guarantees insertion order.
// ===========================================

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // preserves insertion order
  }

  // -------------------------------------------
  // GET
  // -------------------------------------------
  // If key exists:
  //   1. Retrieve value
  //   2. Re-insert key to make it MRU
  // Else:
  //   return -1
  get(key) {
    if (!this.map.has(key)) {
      return -1; // not found
    }

    // Get the current value
    const value = this.map.get(key);

    // To mark as MRU → remove and re-insert
    this.map.delete(key);
    this.map.set(key, value);

    return value;
  }

  // -------------------------------------------
  // PUT
  // -------------------------------------------
  // If key already exists:
  //   - update the value
  //   - re-insert to move to MRU position
  //
  // If key is new:
  //   - if capacity full → evict LRU (first inserted key)
  //   - insert new key at MRU position (end of map)
  put(key, value) {
    // Case 1: Key already exists → update & move to MRU
    if (this.map.has(key)) {
      this.map.delete(key);    // remove old position
      this.map.set(key, value); // insert at MRU position
      return;
    }

    // Case 2: Key is new → check capacity
    if (this.map.size === this.capacity) {
      // LRU = first key in Map
      const lruKey = this.map.keys().next().value;
      this.map.delete(lruKey); // evict LRU
    }

    // Insert new key at MRU (end of map)
    this.map.set(key, value);
  }
}
