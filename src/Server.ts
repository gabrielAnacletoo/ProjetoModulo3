import { initializeApp } from './Index';

const startServer = async () => {
  const app = await initializeApp();

  const port = process.env.PORT || 3333;
  app.listen(port, () => console.log(`Server Running at port ${port}`));
};

startServer();
