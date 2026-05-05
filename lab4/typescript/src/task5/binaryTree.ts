class TreeNode<T> {
    constructor(
        public data: T,
        public left: TreeNode<T> | null = null,
        public right: TreeNode<T> | null = null
    ) {}
}

class BinaryTree<T> {
    private root: TreeNode<T> | null = null;

    insert(data: T): void {
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
            } else {
                if (!current.right) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            }
        }
    }

    search(data: T): boolean {
        let current = this.root;
        while (current) {
            if (data === current.data) return true;
            current = data < current.data ? current.left : current.right;
        }
        return false;
    }

    delete(data: T): void {
        const removeNode = (node: TreeNode<T> | null, data: T): TreeNode<T> | null => {
            if (!node) return null;
            if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else if (data > node.data) {
                node.right = removeNode(node.right, data);
                return node;
            } else {
                if (!node.left && !node.right) return null;
                if (!node.left) return node.right;
                if (!node.right) return node.left;
                let minRight = node.right;
                while (minRight.left) minRight = minRight.left;
                node.data = minRight.data;
                node.right = removeNode(node.right, minRight.data);
                return node;
            }
        };
        this.root = removeNode(this.root, data);
    }

    update(oldData: T, newData: T): void {
        this.delete(oldData);
        this.insert(newData);
    }

    height(): number {
        const calcHeight = (node: TreeNode<T> | null): number => {
            if (!node) return 0;
            return 1 + Math.max(calcHeight(node.left), calcHeight(node.right));
        };
        return calcHeight(this.root);
    }
}
//проверка
const tree = new BinaryTree<number>();
tree.insert(10);
tree.insert(5);
tree.insert(15);
console.log(tree.search(5));
console.log(tree.height());