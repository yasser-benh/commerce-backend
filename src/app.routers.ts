import { Express } from "express";
import userRoutes from "./routes/user.routes";


function AppRouter (app:Express) { 
    app.use('/api/users' , userRoutes)
}
export default AppRouter