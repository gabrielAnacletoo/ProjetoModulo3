import {app} from './Index'

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Server Running at port ${port}`));
