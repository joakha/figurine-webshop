import { appBackend } from "./src/app-backend.js";

appBackend.listen(3000, () => {
    console.log("Server started in port: 3000");
});