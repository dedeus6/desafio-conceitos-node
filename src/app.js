const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());


const repositories = [];


function validateId(request, response, next){
  const { id } = request.params;

  if (!isUuid(id)){
    return response.status(400).json({
      error: "Invalid ID!"
    })
  }

  return next();
}

//app.use('/repositories/:id', validateId);


app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const project = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(project);

  return response.status(200).json(project);
});


app.put("/repositories/:id", validateId, (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const putIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (putIndex < 0 ){
    return response.status(404).json({
      error: "Invalid ID!"
    })
  }

  const newRepository = {
    id,
    title,
    url,
    techs,
    likes: repositories[putIndex].likes
  }

  repositories[putIndex] = newRepository;

  return response.status(200).json(newRepository);
});


app.delete("/repositories/:id", validateId, (request, response) => {
  // TODO
  const { id } = request.params;

  const deleteIndex = repositories.findIndex(project => project.id === id);

  if (deleteIndex < 0){
    return response.status(404).json({
      error: "Invalid ID!"
    })
  }

  repositories.splice(deleteIndex, 1);

  return response.status(204).send();
});


app.post("/repositories/:id/like", validateId, (request, response) => {
  // TODO
  const { id } = request.params;

  const addLikeIndex = repositories.findIndex(project => project.id === id);

  repositories[addLikeIndex].likes = repositories[addLikeIndex].likes + 1;

  return response.json(repositories[addLikeIndex])
});

module.exports = app;
