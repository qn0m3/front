"use strict";
class TreeNode {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}
class BinaryTree {
    constructor() {
        this.root = null;
    }
    insert(data) {
        const newNode = new TreeNode(data);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        let current = this.root;
        while (true) {
            if (data < current.data) {
                if (!current.left) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            }
            else {
                if (!current.right) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            }
        }
    }
    search(data) {
        let current = this.root;
        while (current) {
            if (data === current.data)
                return true;
            current = data < current.data ? current.left : current.right;
        }
        return false;
    }
    delete(data) {
        const removeNode = (node, data) => {
            if (!node)
                return null;
            if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            }
            else if (data > node.data) {
                node.right = removeNode(node.right, data);
                return node;
            }
            else {
                if (!node.left && !node.right)
                    return null;
                if (!node.left)
                    return node.right;
                if (!node.right)
                    return node.left;
                let minRight = node.right;
                while (minRight.left)
                    minRight = minRight.left;
                node.data = minRight.data;
                node.right = removeNode(node.right, minRight.data);
                return node;
            }
        };
        this.root = removeNode(this.root, data);
    }
    update(oldData, newData) {
        this.delete(oldData);
        this.insert(newData);
    }
    height() {
        const calcHeight = (node) => {
            if (!node)
                return 0;
            return 1 + Math.max(calcHeight(node.left), calcHeight(node.right));
        };
        return calcHeight(this.root);
    }
}
//проверка
const tree = new BinaryTree();
tree.insert(10);
tree.insert(5);
tree.insert(15);
console.log(tree.search(5));
console.log(tree.height());
//# sourceMappingURL=binaryTree.js.map