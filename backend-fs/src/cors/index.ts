// cors/index.ts
import cors from "cors";

// 허용 url
const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:8000",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:3002",
  "http://127.0.0.1:8000",
];

// 옵션
const corsOptions: cors.CorsOptions = {
  origin: whitelist,
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
