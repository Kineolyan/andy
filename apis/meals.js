const readMeals = () => Promise.resolve([
  {
      id: "this-is-id-1",
      data: {
        name: "Pommes de terre gratinées",
        count: 1,
        lastTime: 753190246,
        source: "Marabout 442",
        rating: 4,
        comments: "This is a long comment"
      }
  },
  {
    id: "this-is-id-2",
    data: {
      name: "Menu d'été #12",
      count: 1,
      lastTime: 753190246,
      source: "Batch cooking",
      rating: 5
    }
  }
]);

export {
  readMeals
};
