const tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4
    }
  },
  right: {
    value: 3,
    left: {
      value: 5,
      left: {
        value: 7
      },
      right: {
        value: 8
      }
    },
    right: {
      value: 6
    }
  }
};



// 前序 1, 2, 4, 3, 5, 7, 8 , 6
const preRead = (node) => {

  if (!node) {
    return;
  }

  console.log(node.value);
  preRead(node.left);
  preRead(node.right);
};

// 中序 4 2 1 7 5 8 3 6
const midRead = (node) => {

  if (!node) {
    return;
  }

  midRead(node.left);
  console.log(node.value);
  midRead(node.right);
};

// 后序 4 2 7 8 5 6 3 1
const postRead = (node) => {

  if (!node) {
    return;
  }

  postRead(node.left);
  postRead(node.right);
  console.log(node.value);
};

console.log('前序遍历 >>>>>>>>>> ');
preRead(tree);

console.log('中序遍历 >>>>>>>>>> ');
midRead(tree);

console.log('后序遍历 >>>>>>>>>> ');
postRead(tree);
