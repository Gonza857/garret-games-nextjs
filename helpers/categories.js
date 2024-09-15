const GAME = "game";
const SUBSCRIPTION = "subscription";
const GIFTCARD = "giftcard";
export const getDataBaseCategory = (c) => {
  console.log("me llega: ", c);
  switch (c) {
    case GAME:
      return "games";
    case SUBSCRIPTION:
      return "subscriptions";
    case GIFTCARD:
      return "giftcards";
    default:
      return "todos";
  }
};
export const getProductCategory = (c) => {
  switch (c) {
    case "games":
      return GAME;
    case "subscriptions":
      return SUBSCRIPTION;
    case "giftcards":
      return GIFTCARD;
    default:
      return "todos";
  }
};
