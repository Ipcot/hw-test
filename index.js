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

function createList() {
  const markup = books
    .map(
      (book) =>
        `<li id="${book.id}" class="list"><p class="text">${book.title}</p><button class="edit_btn">Edit</button><button class="delete_btn">Delete</button></li>`
    )
    .join("");

  ulEl.insertAdjacentHTML("afterbegin", markup);

  const pEl = document.querySelectorAll(".text");
  pEl.forEach((el) => el.addEventListener("click", showPreiw));

  const editBtnEl = document.querySelectorAll(".edit_btn");
  editBtnEl.forEach((el) => el.addEventListener("click", editBook));

  const deleteBtnEl = document.querySelectorAll(".delete_btn");
  deleteBtnEl.forEach((el) => el.addEventListener("click", deleteBook));
}

createList();

function showPreiw(event) {
  const book = books.find((book) => event.target.textContent === book.title);
  renderPreiw(book);
}

function renderPreiw(book) {
  divRight.innerHTML = "";
  divRight.insertAdjacentHTML("afterbegin", createPreiwMarkup(book));
}

function createPreiwMarkup(obj) {
  return `<h2>${obj.title}</h2><p>${obj.author}</p><img src="${obj.img}"><p>${obj.plot}</p>`;
}

function editBook(event) {
  const book = books.find((book) => event.target.parentNode.id === book.id);
  console.log(book);
}

function deleteBook() {
  console.log("delete");
}
