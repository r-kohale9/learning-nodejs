const express = require("express");
const Joi = require("joi");
const router = express.Router();

// Database
const courses = [
  { id: 1, course: "course1" },
  { id: 2, course: "course2" },
  { id: 3, course: "course3" }
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(400).send("The course with given ID wasn't not found!");
  res.send(course);
});

// Post/Create request api's
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

// Function for coder reusability
function validateCourse(course) {
  const schema = {
    course: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

module.exports = router;
