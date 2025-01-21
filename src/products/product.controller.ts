import { Context } from "hono";
import { createProductService,deleteProductService,getProductsService } from "./product.service";

//Create a product
export const createProduct = async (c: Context) => {
    try{
        const productData = await c.req.json();
        const createdProduct = await createProductService(productData);
        return c.json(createdProduct, 200);
    } catch (error) {
        console.error ("Error creating product", error);
        return c.json({error: "Failed to create product"}, 500);
    }
}



//delete a product
export const deleteProduct = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const product = await deleteProductService(id);
        if (product == undefined) return c.text("product not found", 404);
        const res = await deleteProductService(id);
        if (!res) return c.text("product not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error:any) {
        return c.json({ error: error?.message }, 400);
    }

}

//get all products
export const getProducts = async (c: Context) => {
    try {
        const products = await getProductsService();
        return c.json(products, 200);
    } catch (error) {
        console.error("Error fetching products", error);
        return c.json({ error: "Failed to get products" }, 500);
    }
}