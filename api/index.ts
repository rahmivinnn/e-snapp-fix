// Vercel serverless function entry point
import express from "express";
import path from "path";
import { registerRoutes } from "../server/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files for Vercel
app.use(express.static(path.join(process.cwd(), 'dist/public')));

// Setup routes
(async () => {
  await registerRoutes(app);
})();

// Handle all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/public/index.html'));
});

export default app;