function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('authors');
const url = 'https://randomuser.me/api/?results=10';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let authors = data.results;
  console.log(authors)
  return authors.map(function(author) {
    // lets convert to jquery
    let li = $('<li>')
    let img = $('<img>')
    let span = $('<span>')
    img.attr('src', author.picture.medium)
    span.html(`${author.name.first} ${author.name.last}`)
    li.append(img)
    li.append(span)
    $('ul').append(li)
    


    // let li = createNode('li');
    // let img = createNode('img');
    // let span = createNode('span');
    // img.src = author.picture.medium;
    // span.innerHTML = `${author.name.first} ${author.name.last}`;
    // append(li, img);
    // append(li, span);
    // append(ul, li);
  })
})
.catch(function(error) {
  console.log(error);
});