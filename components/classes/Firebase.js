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

  static async postProductAndImage(product, isImageChanged) {
    let imageToPost = product.image;
    product.image = null;
    let id = await this.postProduct(product);
    if (isImageChanged) {
      let newImageUrl = await this.postProductImage(id, imageToPost);
      product.image = newImageUrl;
      await this.updateSingleProduct(product, id);
    }
  }

  static async updateProduct(product, isImageChanged) {
    let imageToPost = product.image;
    product.image = null;
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
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async makeOrder(order) {
    let enStock = [];
    let fueraStock = [];
    let { items } = order;
    // Recorremos el array de productos
    for (const prod of items) {
      const productoRef = doc(this.FIRESTORE, "productos", prod.id); // Reemplaza 'productos' por el nombre de tu colección
      const productoSnap = await getDoc(productoRef);
      // Verificar si el producto existe
      if (productoSnap.exists()) {
        const datosProducto = productoSnap.data();
        // Verificar si hay suficiente stock
        if (datosProducto.stock >= prod.quantity) {
          datosProducto.stock -= prod.quantity;
          await this.updateSingleProduct(datosProducto, productoSnap.id);
          enStock.push({ ...prod });
        } else {
          fueraStock.push({ ...prod });
        }
      }
    }

    if (fueraStock.length > 0) return `Fuera de stock ${fueraStock.length}`;
    if (fueraStock.length == 0) {
      try {
        const docref = collection(this.FIRESTORE, "orders");
        let result = await addDoc(docref, order);
        return result.id;
      } catch (e) {
        throw new Error(e.message);
      }
    } else {
      throw new Error("Algo salio mal");
    }
  }

  static async getDocsToSubstractProductQuantity(items) {
    let success = true;
    let outOfStock = [];
    let inStock = [];
    for (const item in items) {
      const singleDocRef = doc(this.FIRESTORE, "productos", item.id);
      await getDoc(singleDocRef).then((r) => {
        let product = {
          ...r.data(),
          id: r.id,
        };
        if (product.stock >= item.quantity) {
          inStock.push(item);
        } else {
          outOfStock.push(item);
        }
      });
    }

    if (outOfStock.length > 0) success = false;

    return { success, outOfStock, inStock };
  }
}
