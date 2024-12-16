import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TITestimonial, TSTestimonial, TestimonialsTable } from "../drizzle/schema";

// Get all testimonials
// export const getTestimonialsService = async (): Promise<TSTestimonial[]> => {
//   //  {
//   //   return await db.query.TestimonialsTable.findMany({
//   //     limit,
//   //     with: {
//   //       user: {
//   //         columns: {
//   //           name: true,
//   //         }
//   //       }
//   //     }
//   //   });
//   // }
//   return await db.query.TestimonialsTable.findMany({
//     with: {
//       user: {
//         columns: {
//           name: true,
//         }
//       }
//     }
//   });
// };



export const getTestimonialsService = async (limit?: number): Promise<TSTestimonial[]> => {
  if (limit) {
    return await db.query.TestimonialsTable.findMany({
      limit,
      orderBy: (updates, { desc }) => [desc(updates.createdAt)]
    });
  }
  return await db.query.TestimonialsTable.findMany({
    orderBy: (updates, { desc }) => [desc(updates.createdAt)]
  });
};

// Create testimonial
export const createTestimonialService = async (testimonial: TITestimonial): Promise<string> => {
  await db.insert(TestimonialsTable).values(testimonial);
  return "Testimonial created successfully";
};

// Delete testimonial (admin only)
export const deleteTestimonialService = async (id: number): Promise<string> => {
  await db.delete(TestimonialsTable).where(eq(TestimonialsTable.testimonialid, id));
  return "Testimonial deleted successfully";
}; 

//get testimonial by id
export const getTestimonialByIdService = async (id: number): Promise<TSTestimonial | null> => {
  const testimonial = await db.query.TestimonialsTable.findFirst({
    where: (testimonial, { eq }) => eq(testimonial.testimonialid, id),
  });
  return testimonial || null;
};

