import { AuthTable, TIAuth, TSAuth, UsersTable } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";
import { loginUserSchema } from "../validators";
import type { z } from "zod";
import bycrpt from "bcrypt";

type LoginInput = z.infer<typeof loginUserSchema>;

//create auth user service
export const createAuthUserService = async (userData: any): Promise<string | null> => {
    try {
        // First check if email already exists
        const existingUser = await db.query.UsersTable.findFirst({
            where: (users, { eq }) => eq(users.email, userData.email)
        });

        if (existingUser) {
            throw new Error("Email already registered");
        }

        // Hash the password
        const hashedPassword = await bycrpt.hash(userData.password, 10);

        // If email doesn't exist, create the user record
        const userResult = await db.insert(UsersTable).values({
            username: userData.username,
            email: userData.email,
        }).returning();

        if (!userResult.length) {
            throw new Error("Failed to create user");
        }

        // Then create the auth record with the user's ID
        const authData: TIAuth = {
            userid: userResult[0].userid,
            password: hashedPassword,
            role: userData.role || 'user',
        };

        await db.insert(AuthTable).values(authData);
        return "User created successfully";
    } catch (error: any) {
        if (error.message.includes("users_email_unique")) {
            throw new Error("Email already registered");
        }
        throw error;
    }
}


//user login service
export const userLoginService = async (loginData: LoginInput) => {
    const { email, password } = loginData;
    return await db.query.AuthTable.findFirst({
        columns: {
            authid: true,
            role: true,
            password: true
        },
        where: (auth, { eq }) => eq(auth.userid, 
            db.select({ userid: UsersTable.userid })
              .from(UsersTable)
              .where(eq(UsersTable.email, email))
        ),
        with: {
            user: {
                columns: {
                    email: true,
                    userid: true
                }
            }
        }
    });
};



//get email by user id service
export const getEmailByUserId = async (id: number): Promise<string | null> => {
    const result = await db.query.UsersTable.findFirst({
        columns: {
            email: true,
        },
        where: (usr, { eq }) => eq(usr.userid, id),
    });
    return result?.email || null;
} 

//