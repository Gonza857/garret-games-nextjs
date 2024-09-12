import { db, storage, auth } from "@/firebase/config";
import { getDataBaseCategory } from "@/helpers/categories";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";

export default class Firebase {
  static FIRESTORE = db;
  static STORAGE = storage;
  static AUTH = auth;

  static async postProductAndImage(product, isImageChanged) {
    console.log("postProductAndImage()");
    let imageToPost = product.image;
    product.image = null;
    let category = getDataBaseCategory(product.category);
    await this.updateSingleProduct(category, product);
    if (isImageChanged) {
      console.log("La imagen se cambio!");
      let newImageUrl = await this.postProductImage(
        product.id,
        category,
        imageToPost
      );
      console.log("tu url: ", newImageUrl);
      product.image = newImageUrl;
    }

    await this.updateSingleProduct(category, product);
  }

  static async postProduct(product, category) {
    try {
      const docref = collection(this.FIRESTORE, category);
      let result = await addDoc(docref, product);
      console.log("Producto subido.");
      return result.id;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async postProductImage(id, category, file) {
    try {
      const storageRef = ref(this.STORAGE, `${category}/${id}`);
      await uploadString(storageRef, file, "data_url");
      return await getDownloadURL(storageRef);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async updateSingleProduct(dataBaseCategory, product) {
    console.log("dataBaseCategory", dataBaseCategory);
    console.log(product);
    try {
      const docRef = doc(this.FIRESTORE, dataBaseCategory, product.id);
      await updateDoc(docRef, product);
      console.log("Producto actualizado.");
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export const myFirebase = new Firebase();
