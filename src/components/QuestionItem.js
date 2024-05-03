import React from "react";

function QuestionItem({ question, onDeleteClick, onAnswerChange }) {
  // Destructure the question object to access its properties.
  const { id, prompt, answers, correctIndex } = question;

  // Create an array of options for the select element.
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  // Define two functions to handle the deletion and answer change of a question.
  function handleDeleteClick() {
    // Call the onDeleteClick function and pass the id of the question as an argument.
    onDeleteClick(id);
  }

  function handleAnswerChange(event) {
    // Call the onAnswerChange function and pass the id of the question and the parsed value of the selected option as arguments.
    onAnswerChange(id, parseInt(event.target.value));
  }

  // Return a single list item that contains the question's details and the buttons to delete and change the answer of the question.
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;