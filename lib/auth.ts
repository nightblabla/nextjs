import { Console } from "console";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Pool } from 'pg';

const conn: Pool = new Pool({
 
  user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    host: process.env.PGSQL_HOST,
    port: 5432,
    database: process.env.PGSQL_DATABASE,
});
const checkUserCredentials = async (email: any, password: any) => {
    try {
      
      const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
      const values = [email, password];
      const result = await conn.query(query, values);
  
      if (result.rows.length > 0) {
        const user = result.rows[0];
        return {
          id: user.id,
          email: user.email,
          username: user.user_name,
        };
      } else {
        // If no user is found, return null
        return null;
      }
    } catch (error) {
      // Handle any database query errors
      console.error('Error checking user credentials:', error);
      return null;
    }
  };

export const authOptions: NextAuthOptions={
    secret: "yes",
    session:{
      strategy: 'jwt'
    },
    pages:{
        signIn:'/login',

    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            const user = await checkUserCredentials(
              credentials?.username ,
              credentials?.password
            );
      
            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              console.log("the great user is",user);
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
      ]
      
}
