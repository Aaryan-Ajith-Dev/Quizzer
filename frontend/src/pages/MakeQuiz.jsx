import React, { useContext, useEffect, useState } from 'react';
import '../css/MakeQuiz.css';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Box, Button, Checkbox, List, ListItem } from '@mui/material';
import { GlobalContext } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';

const MakeQuiz = () => {
  const { user, setUser, token } = useContext(GlobalContext)
  const navigate = useNavigate();
  const location = useLocation();
  const [quiz, setQuiz] = useState(location.state && location.state.quiz ? location.state.quiz :
  {
    name: "",
    team_size: null,
    elements: [
      {
        question: "",
        noOfOptions: 0,
        options: [],
      }
    ]
  });

  const saveQuiz = async (quiz, id) => {
    const response = await fetch('http://localhost:3000/quiz', { 
      method: location.state ? "POST" : "PUT", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(quiz), 
    })
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      alert(data.msg);
      navigate('/dashboard');
    }
  }

  const handleDeleteQuestion = (index) => {
    setQuiz((prev) => ({
      name: prev.name,
      elements: prev.elements.filter((ele, i) => i !== index)
    }));
  }

  const handleOptionCreate = (index, event) => {
    const value = event.target.value;
    if (value < 0 || value > 5) {
      event.target.value = null;
      return;
    }
    setQuiz((prev) => {
      const newQuiz = { ...prev };
      const newElements = [...newQuiz.elements];
      newElements[index] = {
        ...newElements[index],
        noOfOptions: Number(value),
        options: Array.from({ length: Number(value) }, () => ({ value: "", isAnswer: false })),
      };
      newQuiz.elements = newElements;
      return newQuiz;
    });
  };

  const handleOptionChange = (i, questionIndex, value) => {
    setQuiz((prevQuiz) => {
      const newQuiz = { ...prevQuiz };
      const newElements = newQuiz.elements.map((element, qIndex) => {
        if (qIndex === questionIndex) {
          const newOptions = element.options.map((option, oIndex) => {
            if (oIndex === i) {
              return { ...option, value: value };
            }
            return option;
          });
          return { ...element, options: newOptions };
        }
        return element;
      });
      newQuiz.elements = newElements;
      return newQuiz;
    });
  };

  const handleCheckBoxChange = (oIndex, questionIndex) => {
    setQuiz((prevQuiz) => {
      const newQuiz = { ...prevQuiz };
      const newElements = newQuiz.elements.map((element, qIndex) => {
        if (qIndex === questionIndex) {
          const newOptions = element.options.map((opn, index) => {
            if (index === oIndex) {
              return { ...opn, isAnswer: !opn.isAnswer };
            }
            return opn;
          });
          return { ...element, options: newOptions };
        }
        return element;
      });
      newQuiz.elements = newElements;
      return newQuiz;
    });
  };

  const handleQuestionChange = (index, value) => {
    setQuiz((prev) => {
      const newQuiz = { ...prev };
      const newElements = [...newQuiz.elements];
      newElements[index] = {
        ...newElements[index],
        question: value
      };
      newQuiz.elements = newElements;
      return newQuiz;
    });
  }

  const renderQuiz = (quiz) => (
    quiz.elements.map((ele, index) => (
      <Paper elevation={2} className='element' key={index}>
        <span className='index'>Question {index + 1}</span>
        <TextField
          className='question'
          margin="normal"
          required
          id={`question-${index}`}
          value={ele.question}
          label="Enter question"
          onChange={(event) => handleQuestionChange(index, event.target.value)}
          name="question"
          autoFocus
        />
        <TextField
          className='optn-number'
          margin="normal"
          required
          value={ele.noOfOptions}
          id={`optn-number-${index}`}
          label="Number of options"
          name="optn-number"
          type='number'
          onChange={(event) => handleOptionCreate(index, event)}
          autoFocus
        />
        <div className='options'>
          <List>
            {[...Array(ele.noOfOptions)].map((_, i) => renderOption(i, index))}
          </List>
        </div>
        <div className='answers'>
          {/* Display selected answers */}
          Selected Answers: {ele.options.filter(option => option.isAnswer).map(option => option.value).join(", ")}
        </div>
        <Button
          variant='outlined'
          className='delete'
          onClick={() => handleDeleteQuestion(index)}
        >
          Delete
        </Button>
      </Paper>
    ))
  );

  const renderOption = (i, index) => (
    <ListItem key={`option-${index}-${i}`} alignItems="center">
      <Checkbox
        checked={quiz.elements[index].options[i]?.isAnswer || false}
        onChange={() => handleCheckBoxChange(i, index)}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      <TextField
        className='option'
        margin="normal"
        required
        id={`option-${index}-${i}`}
        label={`Enter option ${i + 1}`}
        name={`option-${index}-${i}`}
        value={quiz.elements[index].options[i]?.value || ""}
        onChange={(event) => handleOptionChange(i, index, event.target.value)}
        autoFocus
      />
    </ListItem>
  );

  return (
    <div className='quiz'>
      <span className='intro-text'>Create your quiz</span>
      <div className='title'>
        <TextField
          margin="normal"
          required
          fullWidth
          id="quiz-name"
          label="Quiz Name"
          name="quiz-name"
          value={ quiz.name }
          autoComplete="quiz_name"
          onChange={(e) => setQuiz((prev) => ({ ...prev, name: e.target.value }))}
          autoFocus
        />
        <TextField
          className='team-size'
          margin="normal"
          id={`team-size`}
          label="Team size"
          value={ quiz.team_size }
          name="team-size"
          type='number'
          onChange={(e) => setQuiz((prev) => ({ ...prev, team_size: e.target.value }))}
          autoFocus
        />
      </div>
      {renderQuiz(quiz)}

      <br />
      <div className='buttons'>
        <Button variant='outlined' onClick={() => {
          setQuiz((prev) => ({
            ...prev,
            elements: [
              ...prev.elements,
              {
                question: "",
                options: [],
                noOfOptions: 0,
              }
            ]
          }));
        }}>Add Question</Button>
        <Button
          variant='contained'
          onClick={() => {
            saveQuiz(quiz, quiz._id);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default MakeQuiz;
