const synonyms = ['hello', 'hi', 'bye'];

const createElement = (array) =>{
    const htmlElement = array.map((el) => `<span class='btn'>${el}</span>`);
    console.log(htmlElement.join(' '));
    // return htmlElement.join(' ');
}


createElement(synonyms);