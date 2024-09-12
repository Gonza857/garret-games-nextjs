import { getDataBaseCategory } from "./categories";

const buildGiftCard = (values) => {
  return {
    title: values.get("title"),
    price: values.get("price"),
    value: values.get("value"),
    stock: values.get("stock"),
    region: values.get("region"),
    category: "giftcard",
    image: values.get("img"),
  };
};

const buildSubscription = (values) => {
  let consolesModified = values.get("console");
  return {
    title: values.get("title"),
    price: values.get("price"),
    duration: values.get("duration"),
    console: consolesModified.split("-"),
    category: "subscription",
    stock: values.get("stock"),
    image: values.get("img"),
  };
};

const buildGame = (values) => {
  let consolesModified = values.get("console");
  return {
    title: values.get("title"),
    console: consolesModified.split("-"),
    accountType: values.get("accountType"),
    stock: values.get("stock"),
    description: values.get("description"),
    category: "game",
    price: values.get("price"),
    image: values.get("img"),
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
