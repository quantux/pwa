const db = localStorage;

let currentId = db.getItem('currentId');
let item = JSON.parse(db.getItem(currentId));

let question = item['question'];
let answer = item['answer'];

let card_question = document.getElementById('card_question');
let card_answer = document.getElementById('card_answer');

card_question.innerText = question;
card_answer.innerText = answer;

