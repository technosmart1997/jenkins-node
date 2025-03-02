"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const numCPUs = os_1.default.cpus().length;
if (cluster_1.default.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster_1.default.fork();
    });
}
else {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.get("/ping", (req, res) => {
        res.status(200).json({ status: true, message: "Pong" });
    });
    const PORT = parseInt(process.env.PORT || "3002", 10);
    app.listen(PORT, () => {
        console.log(`Worker process ${process.pid} is listening on port ` + PORT);
    });
}
