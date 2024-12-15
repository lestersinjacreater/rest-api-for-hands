import { Context } from "hono";
import { createTestimonialService, getTestimonialByIdService,getTestimonialsService ,deleteTestimonialService } from "./testimonial.service";

//create a testimonial
export const createTestimonial = async (c: Context) => {
    const testimonial = await c.req.json();
    const createdTestimonial = await createTestimonialService(testimonial);
    return c.json(createdTestimonial, 200);
}

//delete a testimonial (admin only)
export const deleteTestimonial = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const deletedTestimonial = await deleteTestimonialService(id);
    return c.json(deletedTestimonial, 200);
}
 //get all testimonials
export const getTestimonials = async (c: Context) => {
    const testimonials = await getTestimonialsService();
    return c.json(testimonials, 200);
}   

//get testimonial by id
export const getTestimonialById = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const testimonial = await getTestimonialByIdService(id);
    return c.json(testimonial, 200);
}


