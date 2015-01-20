function Set() {
  this.array = [];
}

Set.prototype.length = function() {
  return this.array.length;
};

Set.prototype.get = function(index) {
  return this.array[index];
};

Set.prototype.asArray = function() {
  return this.array;
};

Set.prototype.addFromArray = function(array) {
  for (i = 0; i < array.length; ++i) {
    var current = array[i];
    if (this.array.indexOf(current) === -1) {
      this.array.push(current);
    }
  }
};

Set.prototype.reunion = function(anotherSet) {
  for (i = 0; i < anotherSet.length(); ++i) {
    var current = anotherSet.get(i);
    this.array.push(current);
  }
};

