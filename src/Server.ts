import {app} from './Index'
import mongoose from "mongoose"
import { DatabaseConfig } from './Database/Database'

const port = process.env.PORT || 3333
DatabaseConfig.initialize()

app.listen(port, () => console.log(`Server Running at port ${port}`));
