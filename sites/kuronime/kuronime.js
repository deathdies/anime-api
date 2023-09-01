"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parser_1 = require("./grabber");
const app = express_1.default.Router();
app.get("/", async (req, res) => {
    return res.status(200).send("😍 GG Nime Server => 1 is Ready! 🚀");
});
app.get("/ongoing", async (req, res) => {
    try {
        const { page } = req.query;
        const data = await (0, parser_1.OnGoing)(page);
        return res.status(200).json(data);
    }
    catch (err) {
        return res.status(500).json({
            error: "Internal Error",
            message: err.toString(),
        });
    }
});
exports.default = app;
