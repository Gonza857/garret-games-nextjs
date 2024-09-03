"use server";
import { db, storage } from "@/firebase/config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const GAMES = "game";
const SUBSCRIPTION = "subscription";
const GIFTCARD = "giftcard";

const knowCategory = (c) => {
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
  };
};

const buildGiftCard = (values) => {
  return {
    title: values.get("title"),
    price: values.get("price"),
    value: values.get("value"),
    stock: values.get("stock"),
    region: values.get("region"),
    category: "giftcard",
  };
};

const buildObject = (values, category) => {
  if (knowCategory(category) == "games") return buildGame(values);
  if (knowCategory(category) == "subscriptions")
    return buildSubscription(values);
  if (knowCategory(category) == "giftcards") return buildGiftCard(values);
  return null;
};

export const updateProduct = async (values, category, id) => {
  let buildedProduct = buildObject(values, category);
  buildedProduct.id = id;
  if (buildedProduct !== null) {
    if (knowCategory(buildedProduct.category) == "games") {
      await uploadImage(`games/${id}`, values.get("img"))
        .then((r) => {
          buildedProduct.image = {
            url: r,
            id: id,
          };
          console.log("imagen subida pa");
        })
        .catch((e) => {
          console.log(e.mmessage);
        });

      const docRef = doc(db, "games", buildedProduct.id);
      await updateDoc(docRef, buildedProduct);
      return true;
    } else if (knowCategory(buildedProduct.category) == "subscriptions") {
      await uploadImage(`subscriptions/${id}`, values.get("img"))
        .then((r) => {
          buildedProduct.image = {
            url: r,
            id: id,
          };
          console.log("imagen subida pa");
        })
        .catch((e) => {
          console.log(e.mmessage);
        });
      const docRef = doc(db, "subscriptions", buildedProduct.id);
      await updateDoc(docRef, buildedProduct);
      return true;
    } else if (knowCategory(buildedProduct.category) == "giftcards") {
      await uploadImage(`giftcards/${id}`, values.get("img"))
        .then((r) => {
          buildedProduct.image = {
            url: r,
            id: id,
          };
          console.log("imagen subida pa");
        })
        .catch((e) => {
          console.log(e.mmessage);
        });

      const docRef = doc(db, "giftcards", buildedProduct.id);
      await updateDoc(docRef, buildedProduct);
      return true;
    } else {
      return null;
    }
  }
};

export const uploadProduct = async (values, category) => {
  const id = v4();
  let buildedProduct = buildObject(values, category);
  if (buildedProduct !== null) {
    if (knowCategory(buildedProduct.category) == "games") {
      await uploadImage(`games/${id}`, values.get("img"))
        .then((r) => {
          buildedProduct.image = {
            url: r,
            id: id,
          };
          console.log("imagen subida pa");
        })
        .catch((e) => {
          console.log(e.mmessage);
        });

      const docref = collection(db, "games");
      let result = await addDoc(docref, { ...buildedProduct });
      console.log(result.id);
      return true;
    } else if (knowCategory(buildedProduct.category) == "subscriptions") {
      await uploadImage(`subscriptions/${id}`, values.get("img"))
        .then((r) => {
          buildedProduct.image = {
            url: r,
            id: id,
          };
          console.log("imagen subida pa");
        })
        .catch((e) => {
          console.log(e.mmessage);
        });
      const docref = collection(db, "subscriptions");
      let result = await addDoc(docref, { ...buildedProduct });
      console.log(result.id);
      return true;
    } else if (knowCategory(buildedProduct.category) == "giftcards") {
      await uploadImage(`giftcards/${id}`, values.get("img"))
        .then((r) => {
          buildedProduct.image = {
            url: r,
            id: id,
          };
          console.log("imagen subida pa");
        })
        .catch((e) => {
          console.log(e.mmessage);
        });
      const docref = collection(db, "giftcards");
      let result = await addDoc(docref, { ...buildedProduct });
      console.log(result.id);
      return true;
    } else {
      return null;
    }
  }
};

// const createProduct = async (values) => {
//   const docref = collection(db, "games");
//   let result = await addDoc(docref, { ...values });
//   console.log(result.id);

//   await uploadImage(`games/${result.id}`, values.imgUrl)
//     .then((r) => {
//       objetoX.imgUrl = r;
//       console.log("imagen subida pa");
//     })
//     .catch((e) => {
//       console.log(e);
//     });

//   const id = v4();
//   // let objetoX = { ...values };
//   // objetoX.id = id;

//   return true;
// };

const uploadImage = async (id, file) => {
  const storageRef = ref(storage, id);
  const fileSnapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(fileSnapshot.ref);
};

// export async function pushNewGame(formdata) {
//   let consolesModified = formdata.get("console");
//   const newObject = {
//     title: formdata.get("title"),
//     console: consolesModified.split("-"),
//     accountType: formdata.get("accountType"),
//     stock: formdata.get("stock"),
//     description: formdata.get("description"),
//     imgUrl: formdata.get("img"),
//     category: "game",
//     price: formdata.get("price"),
//   };

//   // let autoObject = Object.fromEntries(formdata);
//   // autoObject.console = autoObject.console.split("-");

//   // console.log(autoObject);
//   console.log(newObject);

//   return createProduct(newObject);
// }

export async function tryLogin(formdata) {
  const newObject = {
    email: formdata.get("email"),
    password: formdata.get("password"),
  };

  return true;
}
