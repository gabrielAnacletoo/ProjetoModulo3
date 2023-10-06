import { app } from './Index';
import { DatabaseConfig } from './Database/Database';

const startServer = async () => {
  try {
    await DatabaseConfig.initialize();

    const port = process.env.PORT || 3333;
    app.listen(port, () => console.log(`Server Running at port ${port}`));
  } catch (error) {
    console.error('Error initializing server:', error);
  }
};

startServer();
