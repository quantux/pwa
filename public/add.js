const db = localStorage;

setItem = obj => {
    db.setItem(Date.now(), JSON.stringify(obj));
};

addCard = () => {
    question = document.getElementById('card_question').value;
    answer = document.getElementById('card_answer').value;
    
    setItem({ question, answer });

    history.back();
}