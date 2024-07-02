// db uri
export const uri =
  "mongodb+srv://j93es:Ob6uXDFQR7mxiJyt@cluster0.brhm8vj.mongodb.net/";

// 포트
export const PORT = 8080;

// cors 허용 url
export const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:8000",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:3002",
  "http://127.0.0.1:8000",
];

export const JWT_SECRET_KEY =
  "MIIBOwIBAAJBAKfk7JEWKuRoiUC61h/7OYLrCTS0eItF5JFhuvKy9e9oUiGc52OTFKDjPSSx6ue2OsDXR/Ha0M1a1CFqucTsr7sCAwEAAQJAGU2aDZ+upS/QB65g2P8OwtlTUNsmE69b7EEzYKJyCDuMu9jnz7HcujmiqDTvibpz6kySJq6csM83kQeGrjBHGQIhAOnRHdneFR1ncNHT/yKvwgq5hLVbvoYJN2c7TLZ5otEfAiEAt9KyHygW0ujvCjOaI9MGupIu0aPny/yDoFC+qkU5geUCIQCaIOgdkuC2VlavaqDXe6ZcrXhGmKiZ8H9eBGAINVxXnwIhAJxDKJXhv101FBcI/KwddKffIpuliKNYGhCK8znNNPCdAiB0ckPMhrGVLd5uC479xkyt8rL3i34qN7iTLjLUrc+sxQ==";

export const ADMIN_DATA = [{ id: "admin", password: "1234" }];
