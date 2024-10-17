import { useState, useEffect } from "react";
import MyContext from "./myContext";

import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";

const MyState = (props) => {
  // Determine initial mode based on the time of the day
  const timee = new Date();
  const limitTime = timee.getHours();
  const initialMode = limitTime >= 20 || limitTime < 6 ? "dark" : "light";
  const [mode, setMode] = useState(initialMode);
  const navigatee = useNavigate();
  // Separate state for new product form and product list
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add product to Firestore
  const addProduct = async () => {
    const { title, price, imageUrl, category, description } = newProduct;

    // Form validation: check for empty fields
    if (!title || !price || !imageUrl || !category || !description) {
      return toast.error("Please fill all the fields");
    }

    const productRef = collection(fireDB, "products");
    setLoading(true);

    try {
      await addDoc(productRef, newProduct);
      toast.success("Product Added Successfully");

      getProductsData();

      setNewProduct({
        title: "",
        price: "",
        imageUrl: "",
        category: "",
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      navigatee("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Error adding product");
    } finally {
      setLoading(false); // Ensure loading is false after completion
    }
  };

  // Fetch products from Firestore
  const getProductsData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProducts(productsArray);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
      toast.error("Error fetching products");
      setLoading(false);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    getProductsData();
    getOrderData();
    getUserData();
  }, []);

  // Apply background based on the mode
  useEffect(() => {
    document.body.style.backgroundColor =
      mode === "dark" ? "rgb(17,24,39)" : "white";
  }, [mode]); // Update when mode changes

  //update products function
  const editEventHandle = async (item) => {
    setProducts(item);
  };

  const updateProduct = async (item) => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product updated successfully");

      setTimeout(() => {
        navigatee("/dashboard");
      }, 1000);

      getProductsData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts("");
  };

  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product deleted successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "orders", orderId));
      toast.success("Product deleted successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Toggle between dark and light mode
  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };

  const [orders, setOrders] = useState([]);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(fireDB, "order"));
      const ordersArray = [];
      querySnapshot.forEach((doc) => {
        ordersArray.push({ ...doc.data(), id: doc.id });
      });
      setOrders(ordersArray);
      console.log(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const userArray = [];
      result.forEach((doc) => {
        userArray.push(doc.data());
        setLoading(false);
      });
      setUser(userArray);
      console.log("userDetails", userArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        addProduct,
        newProduct,
        setNewProduct,
        products,
        setProducts,
        updateProduct,
        deleteProduct,
        editEventHandle,
        orders,
        user,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
        deleteOrder,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
