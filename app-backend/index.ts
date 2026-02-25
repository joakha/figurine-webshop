import { appBackend } from "./src/app-backend.js";

const port = process.env.PORT || 3000

appBackend.listen(port, () => {
    console.log(`Server started in port: ${port}`);
});
