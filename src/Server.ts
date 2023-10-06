import {app} from './Index'

const port = process.env.PORT || 3333

app.listen(port, () => console.log(`Server Running at port ${port}`));
