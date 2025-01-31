

const defaultProducts: Array<{
  
 
  name: string;
  price: number;
  image: string;
  seller: string;
  description: string;
  stock: number;
  category: string;
  
}> = [
  {
    name: "Beyerdynamic MMX 150",
    price: 209,
    description : "Beyerdynamic_MMX_150" ,
    seller:'679ba269b67e3f046d752740',
    image: "https://res.cloudinary.com/dbhhy5tng/image/upload/v1738267029/Beyerdynamic_MMX_150_Gris_wlusli.jpg",
    category:"Headset",
    stock: 10,
  },
  {
    name: "Razer Kraken Kitty V2 Pro",
    price: 209,
    description : "Razer Kraken Kitty V2 Pro" ,
    seller:'679ba269b67e3f046d752740',
    image: "https://res.cloudinary.com/dbhhy5tng/image/upload/v1738267031/kraken-kitty-v2-pro_nx3fhk.webp",
    category:"Headset",
    stock: 100,
  },
];

export default defaultProducts;
