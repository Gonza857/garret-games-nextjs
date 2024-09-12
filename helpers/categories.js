const GAMES = "game";
const SUBSCRIPTION = "subscription";
const GIFTCARD = "giftcard";
export const getDataBaseCategory = (c) => {
  switch (c) {
    case GAMES:
      return "games";
    case SUBSCRIPTION:
      return "subscriptions";
    case GIFTCARD:
      return "giftcards";
    default:
      return "todos";
  }
};
