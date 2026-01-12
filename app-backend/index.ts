import appBackend from "./src/app-backend.ts";

appBackend.listen(7000, () => {
    console.log("Server started on localhost:7000");
});