import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import path from "path";

import primitivesRoutes from "./routes/primitives";

const app = express();
app.use(express.static(path.join(__dirname, "../client")));
app.use(json());
app.use("/primitives", primitivesRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
