const { PORT = 3000 } = process.env;
const { JWT_SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2OTg3OTQ5MiwiaWF0IjoxNjY5ODc5NDkyfQ.hfygoNqljHro7HFJVzeEcoiy7EE-mmxw3e25rNK2gxM' } = process.env;
const { DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const { NODE_ENV = 'developement' } = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  DB_ADDRESS,
  NODE_ENV,
};
