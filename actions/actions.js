"use server";
import { db, storage } from "@/firebase/config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { buildObject } from "../helpers/product-builders";
import { getDataBaseCategory } from "../helpers/categories";
import { Firebase } from "@/components/classes/Firebase";

export const updateProduct = async (values, category, id) => {
  let buildedProduct = buildObject(values, category);
  buildedProduct.id = id;
  if (buildedProduct !== null) {
    if (getDataBaseCategory(buildedProduct.category) == "games") {
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
    } else if (
      getDataBaseCategory(buildedProduct.category) == "subscriptions"
    ) {
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
    } else if (getDataBaseCategory(buildedProduct.category) == "giftcards") {
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
  let buildedProduct = buildObject(values, category);
  if (buildedProduct !== null) {
    await Firebase.postProductAndImage(buildedProduct)
      .then(() => {
        console.log("Todo OK amigo");
      })
      .catch((e) => console.log(e));
    return true;
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
