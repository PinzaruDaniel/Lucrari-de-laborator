# Database Study Quiz Application

A simple, interactive web-based quiz application to help study database concepts from an Excel file containing questions and answers.

## Features

- 📚 **230 Database Questions**: Comprehensive coverage of database topics
- ✅ **Instant Feedback**: Shows correct/incorrect answers immediately
- 📊 **Progress Tracking**: Real-time score percentage calculation
- 🎯 **Visual Indicators**: Color-coded feedback (green for correct, red for incorrect)
- 📖 **Explanations**: Shows the correct answer when you make a mistake
- 🔄 **Restart Capability**: Restart the quiz at any time
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## How to Use

### Quick Start

1. Open `index.html` in your web browser
2. Read each question carefully
3. Click on your answer choice
4. Review the feedback and explanation
5. Click "Next Question" to continue
6. View your final score at the end

### Running with a Local Server

For the best experience, serve the files using a local web server:

```bash
# Using Python 3
python3 -m http.server 8080

# Then open http://localhost:8080/index.html in your browser
```

## Files

- **index.html** - Main quiz interface
- **style.css** - Styling and responsive design
- **quiz.js** - Quiz logic and functionality
- **questions.json** - Question data (generated from Excel)
- **parse_questions.py** - Python script to parse Excel file
- **Database_Tests_ALL_QUESTIONS.xlsx** - Source Excel file with questions

## Question Format

The Excel file contains questions with:
- Question ID
- Topic category
- Question text
- Multiple choice answers (A, B, C, D, E, F)
- Correct answers marked with yellow highlighting

## Regenerating Questions

If you update the Excel file, regenerate the questions.json:

```bash
python3 parse_questions.py
```

This will parse the Excel file and create an updated questions.json file.

## Technical Details

- Pure HTML/CSS/JavaScript - no frameworks required
- Uses openpyxl for Excel parsing
- Color detection for yellow-highlighted correct answers
- Client-side only - no server required after parsing

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Requirements

For parsing Excel files:
```bash
pip install openpyxl
```

No requirements for running the quiz - just a web browser!

## Tips for Studying

1. Take your time reading each question
2. Review the explanations for incorrect answers
3. Restart the quiz multiple times to reinforce learning
4. Focus on topics where you score lower
5. Aim for 100% mastery!

## License

This is a study tool. Use it to learn and improve your database knowledge!
