const db = localStorage;
let currentId;

// Wrappers
setItem = obj => {
    db.setItem(Date.now(), JSON.stringify(obj));
};

getItem = key => {
    return JSON.parse(db.getItem(key));
};

removeItem = key => {
    db.removeItem(key);
}

// Methods
removeCard = () => {

    if(confirm("Tem certeza que deseja excluir?")) {
        removeItem(currentId);
        $( '#' + currentId ).remove();
    }

    console.log('removido: ', currentId);
}

toggleAnswer = uniqid => {
    let node = document.getElementById(uniqid);

    let item = getItem(uniqid);
    let answer = item['answer']
    let question = item['question'];

    let toggle = node.getAttribute('toggle') == 'true';

    if(toggle)
        node.innerText = answer;
    else
        node.innerText = question;

    node.setAttribute('toggle', !toggle);
}

// Inserir os flashcards do localStorage...
let doc = document.getElementById('cards');
for (var i = 0; i < localStorage.length; i++){
    let uniqid = localStorage.key(i);
    let question = getItem( uniqid )['question'];

    if(uniqid != 'currentId') {

        // grava o primeiro currentId
        if(i == 0) {
            db.setItem('currentId', uniqid);
            currentId = uniqid;
        }
    
        let node = document.createElement('div');
        node.setAttribute('class', 'card');
        node.setAttribute('id', uniqid);
        node.setAttribute('toggle', false);
    
        node.appendChild( document.createTextNode( question ) );
        node.addEventListener('click', function() { toggleAnswer( uniqid ) }, false);
    
        doc.appendChild(node);
    }

}

// inicializar slick carousel
$(document).ready(function(){
    $('.cards').slick({
      arrows: false,
      centerMode: true,
      centerPadding: "10px",
      infinite: false,
    });

    let elementCounter = document.getElementById("counter");

    if (parseInt(db.length) == 0)
        elementCounter.innerText = "Adicione um novo card";
    else if (parseInt(db.length) == 1)
        elementCounter.innerText = "Card 1/1";
    else
        elementCounter.innerText = "Card 1/" + (parseInt(db.length) - 1);
});

$('.cards').on('afterChange', function(event, slick, currentSlide){
    let elementCounter = document.getElementById("counter");
    elementCounter.innerText = "Card " + (parseInt(currentSlide) + 1) + "/" + (parseInt(db.length) - 1);

    currentId = slick.$slides.get(currentSlide)['id'];
    db.setItem('currentId', currentId);
});   
