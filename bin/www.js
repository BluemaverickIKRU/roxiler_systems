const app = require('../server');
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});
