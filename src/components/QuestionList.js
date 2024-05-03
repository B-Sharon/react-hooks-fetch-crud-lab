import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList(){ 

  const [questions, setQuestions] = useState([]); // State to hold the list of questions.

  //Get Request
  useEffect(()=>{
    fetch("http://localhost:4000/questions") // Fetch the list of questions from the server.
      .then((r) => r.json())
      .then((questions) => {
        setQuestions(questions); // Set the fetched questions to the state.
  });}, []);

  //Function to handleDelete
  function handleDeleteClick(id) { // Function to handle the deletion of a question.
    fetch(`http://localhost:4000/questions/${id}`, { // Send a DELETE request to the server to delete the question with the given id.
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => { // After the deletion is successful, update the list of questions in the state.
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
  }
  

  //function to handle change in answers
  function handleAnswerChange(id, correctIndex) { // Function to handle the change in the answer of a question.
    fetch(`http://localhost:4000/questions/${id}`, { // Send a PATCH request to the server to update the answer of the question with the given id.
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => { // After the answer is updated, update the list of questions in the state.
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestions(updatedQuestions);
      });
  }

  const questionItems = questions.map((q) => ( // Create an array of QuestionItem components for each question in the state.
    <QuestionItem
      key={q.id}
      question={q}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ));


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul> // Render the array of QuestionItem components in the UI.
    </section>
  );

}


export default QuestionList;