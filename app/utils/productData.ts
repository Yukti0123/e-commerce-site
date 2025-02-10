// app/utils/productData.ts

const removeDuplicateProducts = (products: any[]): any[] => {
  const seen = new Set<number>(); 
  return products.filter((product) => {
    if (seen.has(product.id)) {
      return false;
    }
    seen.add(product.id); 
    return true; 
  });
};

export const fetchProducts = async () => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products"); 
    const data = await response.json();


    const uniqueData = removeDuplicateProducts(data);

    
    const products = uniqueData.map((item: any) => ({
      id: item.id,
      name: item.title, 
      description: item.description, 
      images: item.images || [], 
      category: item.category.name, 
      price: item.price,
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products"); 
    const data = await response.json();

    
    const uniqueData = removeDuplicateProducts(data);

  
    const categories = new Set<string>();

    uniqueData.forEach((item: any) => {
      if (item.category && item.category.name) {
        categories.add(item.category.name); 
      }
    });

    
    return Array.from(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
