import { db, storage, auth } from "@/firebase/config";
import { getDataBaseCategory } from "@/helpers/categories";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
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
  static COLLECTIONS = ["giftcards", "games", "subscriptions"];

  static async postProductAndImage(product, isImageChanged) {
    let imageToPost = product.image;
    product.image = null;
    console.log("imageToPost: ", imageToPost);
    let id = await this.postProduct(product);
    if (isImageChanged) {
      let newImageUrl = await this.postProductImage(id, imageToPost);
      product.image = newImageUrl;
      await this.updateSingleProduct(product, id);
    }
  }

  static async updateProduct(product, isImageChanged) {
    console.log("Actualizo:");
    console.log(product);
    let imageToPost = product.image;
    product.image = null;
    console.log("imageToPost: ", imageToPost);
    await this.updateSingleProduct(product, product.id);
    if (isImageChanged) {
      let newImageUrl = await this.updateProductImage(product.id, imageToPost);
      product.image = newImageUrl;
      await this.updateSingleProduct(product, product.id);
    }
  }

  static async postProduct(product) {
    try {
      const docref = collection(this.FIRESTORE, "productos");
      let result = await addDoc(docref, product);
      console.log("Producto subido.");
      return result.id;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async postProductImage(id, file) {
    try {
      const storageRef = ref(this.STORAGE, `productos/${id}`);
      await uploadBytes(storageRef, file, "data_url");
      return await getDownloadURL(storageRef);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async updateProductImage(id, file) {
    try {
      const storageRef = ref(this.STORAGE, `productos/${id}`);
      await uploadString(storageRef, file, "data_url");
      return await getDownloadURL(storageRef);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async updateSingleProduct(product, id) {
    try {
      const docRef = doc(this.FIRESTORE, "productos", id);
      await updateDoc(docRef, product);
      console.log("Producto actualizado.");
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async makeOrder(order) {
    let { canMakeOrder, batch } = await this.getDocsToSubstractProductQuantity(
      order.items
    );
    // if (canMakeOrder == true) {
    //   try {
    //     const docref = collection(this.FIRESTORE, "orders");
    //     await batch.commit();
    //     let result = await addDoc(docref, order);
    //     console.log("Orden subida.");
    //     return result.id;
    //   } catch (e) {
    //     throw new Error(e.message);
    //   }
    // } else {
    //   throw new Error("Algo salio mal");
    // }
  }

  static async getDocsToSubstractProductQuantity(items) {
    console.log("Items");
    console.log(items);
    console.log("colecciones: ", this.COLLECTIONS);
    let success = false;
    let docPromises = [];

    this.COLLECTIONS.forEach(async (col) => {
      docPromises = items.map(async (i) => {
        const singleDocRef = doc(this.FIRESTORE, col, i.id);
        if (singleDocRef) {
          return await getDoc(singleDocRef);
        }
      });
    });

    console.log(docPromises);
    // const docPromises = items.map((i) => {
    //   this.COLLECTIONS.map((e) => {
    //     const singleDocRef = doc(this.FIRESTORE, e, i.id);
    //     console.log(singleDocRef);
    //     return getDoc(singleDocRef);
    //   });
    // });

    // console.log(docPromises);

    const docs = await Promise.all(docPromises);
    const batch = writeBatch(this.FIRESTORE);
    const noStockProducts = [];
    docs.forEach((doc) => {
      console.log(doc);
      // const { inStock } = doc.data();
      // const itemInCart = items.find((item) => item.id == doc.id);
      // if (itemInCart.quantity >= inStock) {
      //   batch.update(doc.ref, { inStock: inStock - itemInCart.quantity });
      // } else {
      //   noStockProducts.push(itemInCart);
      // }
    });

    if (noStockProducts.length > 0) return noStockProducts;
    success = true;
    return { success, batch };
  }
}
