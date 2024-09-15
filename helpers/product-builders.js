import { getDataBaseCategory } from "./categories";

const buildGiftCard = (values) => {
  return {
    title: values.get("title"),
    price: values.get("price"),
    value: values.get("value"),
    stock: values.get("stock"),
    region: values.get("region"),
    category: "giftcard",
    image: values.get("image"),
  };
};

const buildSubscription = (values) => {
  return {
    title: values.get("title"),
    price: values.get("price"),
    duration: values.get("duration"),
    console: values.get("console").split("-"),
    category: "subscription",
    stock: values.get("stock"),
    image: values.get("image"),
  };
};

const buildGame = (values) => {
  return {
    title: values.get("title"),
    accountType: values.get("accountType"),
    console: values.get("console"),
    console: values.get("console").split("-"),
    price: values.get("price"),
    stock: Number(values.get("stock")),
    description: values.get("description"),
    image: values.get("image"),
    category: "game",
  };
};

export const buildObject = (values, category) => {
  if (getDataBaseCategory(category) == "games") return buildGame(values);
  if (getDataBaseCategory(category) == "subscriptions")
    return buildSubscription(values);
  if (getDataBaseCategory(category) == "giftcards")
    return buildGiftCard(values);
  return null;
};
