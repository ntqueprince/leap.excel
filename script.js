// script.js
// Quiz logic with 25 questions: first 10 preserved, last 15 replaced with improved questions.
// Local storage key
const STORAGE_KEY = 'wps_quiz_state_final_v1';

// ====== QUESTIONS ARRAY (25 items) ======
// First 10 are kept exactly (from chat); next 15 are improved/selected by assistant.
const questions = [
  // 1-10: from chat (preserved)
  {
    id: "q01",
    question: "Q1. Which of the following is NOT a key feature of Excel?",
    options: ["Data entry and formatting", "Pivot tables", "Charts and graphs", "Image formatting"],
    answerIndex: 3,
    explanation: "Excel focuses on data entry, analysis and charts. Image formatting is not a main Excel feature."
  },
  {
    id: "q02",
    question: "Q2. Which sign is used to initiate a formula in a cell?",
    options: ["Equal to (=)", "Comma (,)", "Minus (-)", "Hyphen (-)"],
    answerIndex: 0,
    explanation: "All formulas in Excel start with the equal sign (=). For example: =SUM(A1:A5)."
  },
  {
    id: "q03",
    question: "Q3. Which formula helps execute actions based on conditions?",
    options: ["AND", "IF", "COUNT", "AVERAGE"],
    answerIndex: 1,
    explanation: "IF tests a condition and returns one result if TRUE and another if FALSE, e.g., =IF(A1>50,'Pass','Fail')."
  },
  {
    id: "q04",
    question: "Q4. Which of the following is NOT a type of graph?",
    options: ["Bar", "Line", "Pivot", "Pie Chart"],
    answerIndex: 2,
    explanation: "Pivot refers to Pivot Table (a data summary tool), not a chart type like Bar/Line/Pie."
  },
  {
    id: "q05",
    question: "Q5. Which type of function is part of sorting data?",
    options: ["Ascending and descending", "Number filter", "Calculated fields", "Data labels"],
    answerIndex: 0,
    explanation: "Sorting arranges data in Ascending (A→Z / 1→10) or Descending (Z→A / 10→1) order."
  },
  {
    id: "q06",
    question: "Q6. What is the primary purpose of VLOOKUP?",
    options: ["To consolidate multiple datasets", "To create dynamic reports", "To calculate totals", "To retrieve specific data from another sheet/place"],
    answerIndex: 3,
    explanation: "VLOOKUP finds a value in the left column of a table and returns a related value from the same row."
  },
  {
    id: "q07",
    question: "Q7. Why should you add data labels to graphs?",
    options: ["For easy visibility on data points", "For functions related to maths, statistics, and logic", "To save time by auto-saving formulas", "To copy formulas"],
    answerIndex: 0,
    explanation: "Data labels show exact values on chart points so readers can see numbers without guessing."
  },
  {
    id: "q08",
    question: "Q8. Which formula is used to calculate the mean of data?",
    options: ["SUM", "IF", "AND", "AVERAGE"],
    answerIndex: 3,
    explanation: "Mean = Average. Use =AVERAGE(range) to compute the mean of numbers in Excel."
  },
  {
    id: "q09",
    question: "Q9. Which of the following is NOT an element of Pivot Tables?",
    options: ["Rows", "Values", "Filters", "Formulas"],
    answerIndex: 3,
    explanation: "Pivot Tables have Rows, Values, and Filters. 'Formulas' are not a structural element inside the Pivot layout."
  },
  {
    id: "q10",
    question: "Q10. Which of the following is NOT an important part of formula arguments?",
    options: ["Values", "Cell references", "Sheet location", "Ranges"],
    answerIndex: 2,
    explanation: "Values, cell references and ranges are main formula arguments. Sheet name is used sometimes but is not a core argument type."
  },

  // 11-25: assistant-selected improved questions
  {
    id: "q11",
    question: "Q11. What does the =SUM function do?",
    options: ["Adds numbers", "Calculates an average", "Joins text", "Formats cells"],
    answerIndex: 0,
    explanation: "=SUM(range) returns the total of all numeric values in the specified range."
  },
  {
    id: "q12",
    question: "Q12. Which function joins text from two or more cells into one?",
    options: ["CONCAT (or CONCATENATE)", "SPLIT", "PROPER", "TRIM"],
    answerIndex: 0,
    explanation: "CONCAT or CONCATENATE combines text values from multiple cells into a single text string."
  },
  {
    id: "q13",
    question: "Q13. Which function counts cells that meet a specific condition?",
    options: ["COUNTIF", "COUNT", "COUNTA", "COUNTBLANK"],
    answerIndex: 0,
    explanation: "COUNTIF(range, criteria) counts cells in a range that match the criteria you give."
  },
  {
    id: "q14",
    question: "Q14. Which function returns the first n characters of a text string?",
    options: ["LEFT", "RIGHT", "MID", "LEN"],
    answerIndex: 0,
    explanation: "LEFT(text, n) returns the first n characters from the start (left) of the text."
  },
  {
    id: "q15",
    question: "Q15. What does the MID(text, start, length) function do?",
    options: ["Returns characters from the middle of text", "Returns text in uppercase", "Removes spaces", "Counts characters"],
    answerIndex: 0,
    explanation: "MID extracts characters starting at a specific position for a given length."
  },
  {
    id: "q16",
    question: "Q16. Which function removes extra spaces from text (but keeps single spaces between words)?",
    options: ["TRIM", "CLEAN", "SUBSTITUTE", "REPLACE"],
    answerIndex: 0,
    explanation: "TRIM(text) removes extra leading/trailing and duplicate spaces inside text."
  },
  {
    id: "q17",
    question: "Q17. Which function gives the number of characters in a text string?",
    options: ["LEN", "FIND", "SEARCH", "TEXT"],
    answerIndex: 0,
    explanation: "LEN(text) returns the count of characters, including spaces."
  },
  {
    id: "q18",
    question: "Q18. Which feature keeps header row visible while you scroll a long sheet?",
    options: ["Freeze Panes", "Split Cells", "Protect Sheet", "Hide Row"],
    answerIndex: 0,
    explanation: "Freeze Panes keeps specified rows/columns fixed so they remain visible during scrolling."
  },
  {
    id: "q19",
    question: "Q19. Which feature automatically colors cells based on rules (e.g., highlight values > 100)?",
    options: ["Conditional Formatting", "Data Validation", "Sort", "Filter"],
    answerIndex: 0,
    explanation: "Conditional Formatting changes cell appearance when they meet rules you define."
  },
  {
    id: "q20",
    question: "Q20. Which tool copies formatting from one cell to another?",
    options: ["Format Painter", "Paste Special - Values", "Fill Handle", "Text to Columns"],
    answerIndex: 0,
    explanation: "Format Painter copies style (font, color, borders) from one cell so you can apply it elsewhere."
  },
  {
    id: "q21",
    question: "Q21. Which pair of functions is more flexible than VLOOKUP for lookups?",
    options: ["INDEX and MATCH", "SUM and AVERAGE", "LEFT and RIGHT", "CONCAT and TRIM"],
    answerIndex: 0,
    explanation: "INDEX + MATCH can look up values regardless of column order and can search right-to-left."
  },
  {
    id: "q22",
    question: "Q22. Which function counts only numeric cells in a range?",
    options: ["COUNT", "COUNTA", "COUNTIF", "COUNTBLANK"],
    answerIndex: 0,
    explanation: "COUNT(range) counts cells that contain numbers only."
  },
  {
    id: "q23",
    question: "Q23. What does Data Validation let you do?",
    options: ["Restrict the type of data users can enter", "Create a pivot table", "Sort automatically", "Format charts"],
    answerIndex: 0,
    explanation: "Data Validation restricts inputs (e.g., allow only dates, numbers in a range) and can show input help."
  },
  {
    id: "q24",
    question: "Q24. Which lookup function searches horizontally across the top row?",
    options: ["HLOOKUP", "VLOOKUP", "XLOOKUP", "MATCH"],
    answerIndex: 0,
    explanation: "HLOOKUP searches the top row and returns a value from a specified row below."
  },
  {
    id: "q25",
    question: "Q25. Which function returns the largest number in a range?",
    options: ["MAX", "MIN", "AVERAGE", "MEDIAN"],
    answerIndex: 0,
    explanation: "MAX(range) returns the highest number from the given range."
  }
];

// ====== App state ======
let state = {
  order: [],         // array of question indices in shuffled order
  optionOrder: {},   // map: qIndex -> shuffled indices of options
  currentIndex: 0,   // 0-based index into state.order
  answers: {},       // map: qIndex -> { selected: optionIndex, checked: bool, correct: bool }
  score: 0
};

// ====== DOM refs ======
const qNumEl = document.getElementById('qNum');
const scoreEl = document.getElementById('score');
const questionTextEl = document.getElementById('questionText');
const optionsForm = document.getElementById('optionsForm');
const explainBox = document.getElementById('explainBox');
const checkBtn = document.getElementById('checkBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const barEl = document.getElementById('bar');
const resultArea = document.getElementById('resultArea');
const finalScore = document.getElementById('finalScore');
const finalMsg = document.getElementById('finalMsg');
const retryBtn = document.getElementById('retryBtn');
const retryEndBtn = document.getElementById('retryEndBtn');
const reviewBtn = document.getElementById('reviewBtn');
const reviewEndBtn = document.getElementById('reviewEndBtn');
const reviewArea = document.getElementById('reviewArea');
const reviewList = document.getElementById('reviewList');
const closeReviewBtn = document.getElementById('closeReviewBtn');
const clearBtn = document.getElementById('clearBtn');

// ====== Utilities ======
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Save failed', e);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const obj = JSON.parse(raw);
    if (obj && obj.order && Array.isArray(obj.order)) {
      state = obj;
      return true;
    }
  } catch (e) {
    console.warn('Load failed', e);
  }
  return false;
}

function clearSaved() {
  localStorage.removeItem(STORAGE_KEY);
}

// ====== Initialization ======
function init(reset = false) {
  // reset or load
  if (!reset && loadState()) {
    // loaded from storage
  } else {
    // fresh start
    state.order = shuffleArray(questions.map((_, i) => i));
    state.optionOrder = {};
    for (let i = 0; i < questions.length; i++) {
      state.optionOrder[i] = shuffleArray([0,1,2,3]);
    }
    state.currentIndex = 0;
    state.answers = {};
    state.score = 0;
    saveState();
  }
  renderCurrent();
  updateProgressBar();
  hideResult();
  hideReview();
}

// ====== Rendering ======
function renderCurrent() {
  const qPos = state.currentIndex;
  const qIdx = state.order[qPos];
  const qObj = questions[qIdx];

  qNumEl.textContent = `Question ${qPos+1} / ${questions.length}`;
  scoreEl.textContent = `Score: ${state.score}`;
  questionTextEl.textContent = qObj.question;

  // render options in shuffled order
  const optOrder = state.optionOrder[qIdx] || [0,1,2,3];
  optionsForm.innerHTML = '';
  for (let i = 0; i < optOrder.length; i++) {
    const optIndex = optOrder[i];
    const id = `opt_${qIdx}_${optIndex}`;
    const label = document.createElement('label');
    label.className = 'option';
    label.setAttribute('tabindex','0');

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'option';
    radio.value = String(optIndex);
    radio.id = id;
    radio.setAttribute('aria-label', qObj.options[optIndex]);

    const span = document.createElement('div');
    span.textContent = qObj.options[optIndex];

    label.appendChild(radio);
    label.appendChild(span);
    optionsForm.appendChild(label);

    // Click label should select radio
    label.addEventListener('click', () => {
      radio.checked = true;
    });
  }

  // restore selection if any
  const saved = state.answers[qIdx];
  explainBox.style.display = 'none';
  explainBox.className = 'explain';
  if (saved) {
    // pre-select
    const chosen = saved.selected;
    if (typeof chosen === 'number') {
      const radios = optionsForm.querySelectorAll('input[type=radio]');
      radios.forEach(r => {
        if (r.value === String(chosen)) r.checked = true;
      });
    }
    // if checked show feedback
    if (saved.checked) {
      showFeedback(qIdx, saved.selected);
    }
  }
  // focus first option for keyboard flow
  const firstLabel = optionsForm.querySelector('label.option');
  if (firstLabel) firstLabel.focus();
}

function updateProgressBar() {
  const percent = Math.round(((state.currentIndex) / questions.length) * 100);
  barEl.style.width = `${percent}%`;
}

// ====== Actions ======
function getCurrentQ() {
  const qIdx = state.order[state.currentIndex];
  return { qIdx, qObj: questions[qIdx] };
}

function checkAnswer() {
  const { qIdx, qObj } = getCurrentQ();
  const radios = optionsForm.querySelectorAll('input[type=radio]');
  let selected = null;
  radios.forEach(r => { if (r.checked) selected = Number(r.value); });

  if (selected === null) {
    // nothing selected
    explainBox.style.display = 'block';
    explainBox.className = 'explain';
    explainBox.textContent = 'Please select an option first.';
    return;
  }

  // prevent re-checking
  const prev = state.answers[qIdx];
  if (prev && prev.checked) {
    // already checked; do nothing
    return;
  }

  // determine correctness
  const correct = (selected === qObj.answerIndex);
  // update state
  state.answers[qIdx] = { selected, checked: true, correct };
  if (correct) state.score += 1;
  saveState();
  scoreEl.textContent = `Score: ${state.score}`;
  showFeedback(qIdx, selected);
  // if all questions checked show result
  const allChecked = state.order.every(i => state.answers[i] && state.answers[i].checked);
  if (allChecked) showResult();
}

function showFeedback(qIdx, selected) {
  const qObj = questions[qIdx];
  const radios = optionsForm.querySelectorAll('input[type=radio]');
  // highlight correct and wrong choice
  const labels = optionsForm.querySelectorAll('label.option');
  labels.forEach(label => {
    const input = label.querySelector('input[type=radio]');
    label.style.borderColor = 'rgba(10,30,70,0.06)';
    label.style.background = '';
    label.style.borderLeft = '';
    label.classList.remove('correct','wrong');
    // reset
  });
  // show explainBox
  explainBox.style.display = 'block';
  if (selected === qObj.answerIndex) {
    explainBox.className = 'explain good';
    explainBox.textContent = `Correct ✅ — ${qObj.explanation}`;
  } else {
    explainBox.className = 'explain bad';
    explainBox.textContent = `Wrong ❌ — Correct: "${qObj.options[qObj.answerIndex]}". ${qObj.explanation}`;
  }

  // color options: find label for selected and correct
  const labelsArr = Array.from(optionsForm.querySelectorAll('label.option'));
  labelsArr.forEach(label => {
    const input = label.querySelector('input[type=radio]');
    const val = Number(input.value);
    if (val === qObj.answerIndex) {
      label.style.background = '#f3fff7';
      label.style.borderLeft = '4px solid #12a454';
    }
    if (val === selected && val !== qObj.answerIndex) {
      label.style.background = '#fff5f5';
      label.style.borderLeft = '4px solid #e04b4b';
    }
    // disable inputs
    input.disabled = true;
  });
}

function goNext() {
  if (state.currentIndex < state.order.length - 1) {
    state.currentIndex += 1;
    renderCurrent();
    updateProgressBar();
    saveState();
  } else {
    // end
    showResult();
  }
}

function goPrev() {
  if (state.currentIndex > 0) {
    state.currentIndex -= 1;
    renderCurrent();
    updateProgressBar();
    saveState();
  }
}

function showResult() {
  const total = questions.length;
  const score = state.score;
  resultArea.classList.remove('hidden');
  finalScore.textContent = `You scored ${score} of ${total} (${Math.round((score/total)*100)}%)`;
  let msg = '';
  const pct = (score/total) * 100;
  if (pct >= 80) msg = 'Excellent! Great job.';
  else if (pct >= 50) msg = 'Good — a little more practice and you will master it.';
  else msg = 'Keep practicing — review the explanations and try again.';
  finalMsg.textContent = msg;

  // scroll result into view
  resultArea.scrollIntoView({behavior:'smooth'});
}

function hideResult() {
  resultArea.classList.add('hidden');
}

function retry(resetLocal = false) {
  // reshuffle question & options
  state.order = shuffleArray(questions.map((_, i) => i));
  state.optionOrder = {};
  for (let i = 0; i < questions.length; i++) state.optionOrder[i] = shuffleArray([0,1,2,3]);
  state.currentIndex = 0;
  state.answers = {};
  state.score = 0;
  if (resetLocal) clearSaved();
  saveState();
  renderCurrent();
  updateProgressBar();
  hideResult();
  hideReview();
}

function showReview() {
  reviewList.innerHTML = '';
  state.order.forEach((qIdx, pos) => {
    const q = questions[qIdx];
    const ans = state.answers[qIdx];
    const div = document.createElement('div');
    div.style.padding = '10px';
    div.style.borderBottom = '1px solid rgba(10,30,70,0.04)';
    const h = document.createElement('div');
    h.style.fontWeight = '700';
    h.textContent = `${pos+1}. ${q.question}`;
    const user = document.createElement('div');
    user.className = 'small';
    if (ans && typeof ans.selected === 'number') {
      user.innerHTML = `Your answer: <strong>${q.options[ans.selected]}</strong> ${ans.correct ? '✅' : '❌'}`;
    } else {
      user.innerHTML = `Your answer: <em>Not answered</em>`;
    }
    const correctEl = document.createElement('div');
    correctEl.className = 'small';
    correctEl.innerHTML = `Correct: <strong>${q.options[q.answerIndex]}</strong>`;
    const expl = document.createElement('div');
    expl.className = 'small';
    expl.style.marginTop = '6px';
    expl.textContent = q.explanation;
    div.appendChild(h);
    div.appendChild(user);
    div.appendChild(correctEl);
    div.appendChild(expl);
    reviewList.appendChild(div);
  });
  reviewArea.classList.remove('hidden');
  reviewArea.scrollIntoView({behavior:'smooth'});
}

function hideReview() {
  reviewArea.classList.add('hidden');
}

// ====== Events ======
checkBtn.addEventListener('click', (e) => {
  e.preventDefault();
  checkAnswer();
});
nextBtn.addEventListener('click', (e) => { e.preventDefault(); goNext(); });
prevBtn.addEventListener('click', (e) => { e.preventDefault(); goPrev(); });
retryBtn.addEventListener('click', (e) => { e.preventDefault(); retry(true); });
retryEndBtn.addEventListener('click', (e) => { e.preventDefault(); retry(true); });
reviewBtn.addEventListener('click', (e) => { e.preventDefault(); showReview(); });
reviewEndBtn.addEventListener('click', (e) => { e.preventDefault(); showReview(); });
closeReviewBtn.addEventListener('click', (e) => { e.preventDefault(); hideReview(); });
clearBtn.addEventListener('click', (e) => { e.preventDefault(); clearSaved(); init(true); });

// keyboard: Enter on options to check, support Enter on buttons naturally
optionsForm.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    // if an option focused, toggle select
    const focused = document.activeElement;
    if (focused && focused.matches('label.option')) {
      const input = focused.querySelector('input[type=radio]');
      if (input) input.checked = true;
    } else {
      // otherwise check answer
      checkAnswer();
    }
  }
});

// init on load
window.addEventListener('load', () => {
  init();
});
