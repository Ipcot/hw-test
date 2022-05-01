const books = [
  {
    id: "1",
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  },
  {
    id: "2",
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
  },
  {
    id: "3",
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
  },
];
const BOOKS = "books";
// const booksJson = JSON.stringify(books)
if (!localStorage.getItem(BOOKS)) {
  localStorage.setItem(BOOKS, JSON.stringify(books));
}
console.log(books);

const divEl = document.querySelector("#root");

const divLeft = document.createElement("div");
const divRight = document.createElement("div");

divEl.prepend(divLeft, divRight);

divLeft.classList.add("left_container");
divRight.classList.add("right_container");

const title = document.createElement("h1");
title.textContent = "Biblioteka";
const ulEl = document.createElement("ul");
const btnEl = document.createElement("button");
btnEl.textContent = "ADD";

divLeft.prepend(title, ulEl, btnEl);

title.classList.add("title");
ulEl.classList.add("ul");
btnEl.classList.add("btn_add");
createList();
function createList() {
  const books = JSON.parse(localStorage.getItem(BOOKS));
  const markup = books
    .map(
      (book) =>
        `<li id="${book.id}" class="list"><p class="text">${book.title}</p><button class="edit_btn">Edit</button><button class="delete_btn">Delete</button></li>`
    )
    .join("");

  ulEl.insertAdjacentHTML("afterbegin", markup);

  const pEl = document.querySelectorAll(".text");
  pEl.forEach((el) => el.addEventListener("click", showPriew));

  const editBtnEl = document.querySelectorAll(".edit_btn");
  editBtnEl.forEach((el) => el.addEventListener("click", editBook));

  const deleteBtnEl = document.querySelectorAll(".delete_btn");
  deleteBtnEl.forEach((el) => el.addEventListener("click", deleteBook));
}



const addBookEl = document.querySelector(".btn_add");
addBookEl.addEventListener("click", addBookFunc);

function showPriew(event) {
  const books = JSON.parse(localStorage.getItem(BOOKS));
  const book = books.find((book) => event.target.textContent === book.title);
  renderPriew(book);
}

function renderPriew(book) {
  divRight.innerHTML = "";
  divRight.insertAdjacentHTML("afterbegin", createPriewMarkup(book));
}

function createPriewMarkup(obj) {
  return `<div class="right-preview" id ="${obj.id}"><h2>${obj.title}</h2><p>${obj.author}</p><img src="${obj.img}"><p>${obj.plot}</p></div>`;
}

function editBook(event) {
  const books = JSON.parse(localStorage.getItem(BOOKS));
  const book = books.find((book) => event.target.parentNode.id === book.id);
  divRight.innerHTML = "";
  divRight.insertAdjacentHTML("afterbegin", createFormMarkup(book));

}

function deleteBook(event) {
  const books = JSON.parse(localStorage.getItem(BOOKS));
  const book = books.filter((book) => event.target.parentNode.id !== book.id);
  localStorage.setItem(BOOKS, JSON.stringify(book));
  ulEl.innerHTML = "";
  createList();

  if (divRight.innerHTML !== "") {
    const divRightEl = document.querySelector(".right-preview");
    if (divRightEl.id === event.target.parentNode.id) {
      console.log(event.target.parentNode.id);
      divRight.innerHTML = "";
      
    }
  }
}

function addBookFunc() {
  
  const newBook = {
    id: `${Date.now()}`,
    author: "",
    title: "",
    plot: "",
    img: "",
  };
  divRight.innerHTML = "";
  divRight.insertAdjacentHTML("afterbegin", createFormMarkup(newBook));
  
  fillObject(newBook);

  const saveBtnEl = document.querySelector(".save");
  saveBtnEl.addEventListener("click", saveBook);

  function saveBook() {
    const books = JSON.parse(localStorage.getItem(BOOKS));
    books.push(newBook);
    localStorage.setItem(BOOKS, JSON.stringify(books));
    ulEl.innerHTML = "";
    createList();
    renderPriew(newBook);
  }
}

function createFormMarkup(book) {
  return `<form class='add_book'>
  <label>Author<input value="${book.author}" name="author" class="form_input" type = 'text'></label>
  <label>Title<input value="${book.title}" name="title" class="form_input" type = 'text'></label>
  <label>Image<input value="${book.img}" name="img" class="form_input" type = 'text'></label>
  <label>Plot<input value="${book.plot}" name="plot" class="form_input" type = 'text' ></label>
  <button class="save" type="button">Save</button>
  </form>`;
}

function fillObject(book) {
  const inputsAll = document.querySelectorAll("input");
  inputsAll.forEach((el) => {
    el.addEventListener("input", addValue);
  });
  function addValue(event) {
    book[event.target.name] = event.target.value;
  }
}
