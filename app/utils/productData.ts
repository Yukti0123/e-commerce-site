// app/utils/productData.ts

export const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.in/api/products");
    const data = await response.json();

    console.log("Fetched products data:", data); // Log the response to check its structure

    // Check if data.products exists and is an array
    if (data.products && Array.isArray(data.products)) {
      const products = data.products.map((item: any) => ({
        id: item.id,
        name: item.title, 
        description: item.description, 
        images: item.image ? [item.image] : [], // Ensure it's an array of images
        category: item.category || '', // Handle category field
        price: item.price,
      }));

      return products;
    } else {
      console.error("Products data is not in the expected format:");
      return [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch("https://fakestoreapi.in/api/products"); // Fetch from the same API
    const data = await response.json();

    console.log("Fetched categories data:", data); // Log the response to check its structure

    // Check if data.products exists and is an array
    if (data.products && Array.isArray(data.products)) {
      const categories = new Set<string>();

      data.products.forEach((item: any) => {
        if (item.category) {
          categories.add(item.category); // Add category if it exists
        }
      });

      return Array.from(categories);
    } else {
      console.error("Categories data is not in the expected format:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
