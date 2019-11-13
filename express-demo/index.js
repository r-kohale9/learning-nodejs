// Packages || Modules
const Joi = require("joi");
const express = require("express");
const app = express();

// Something related to json don't know (figuring...).
app.use(express.json());

// Database
const courses = [
  { id: 1, course: "course1" },
  { id: 2, course: "course2" },
  { id: 3, course: "course3" }
];

// Function for coder reusability
function validateCourse(course) {
  const schema = {
    course: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

// Get/Read request api's
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(400).send("The course with given ID wasn't not found!");
  res.send(course);
});

// Post/Create request api's
app.post("/api/courses", (req, res) => {
  const result = validateCourse(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  const course = {
    id: courses.length + 1,
    course: req.body.course
  };
  courses.push(course);
  res.send(course);
});

// Put/Update request api's
app.put("/api/courses/:id", (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(400).send("The course with given ID was'nt not found!");

  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update course
  // Return the updated course
  course.course = req.body.course;
  res.send(course);
});

// Delete request api's
app.delete("/api/courses/:id", (req, res) => {
  // Look up the course
  // Not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(400).send("The course with given ID was'nt not found!");

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return the same course
  res.send(course);
});

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));
