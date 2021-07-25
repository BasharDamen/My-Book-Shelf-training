'use strict';


Books.globalArray = [];
let totalPages= 0;

function Books(name, page, category, price){
this.name = name;
this.page = page;
this.category = category;
this.price = price;
Books.globalArray.push(this);
}

// random number function 
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
console.log(getRandomNum(3, 8));
// 


// adding event

let bookForm = document.getElementById('BooksForm');
bookForm.addEventListener('submit', handleSubmit);

function handleSubmit(event){
    // event.preventDefault();

    let bookName = event.target.bookName.value

    let bookPages = event.target.bookPages.value

    let bookCategory = event.target.bookCategory.value

    let bookPrice = getRandomNum(3, 8);

    new Books(bookName, bookPages, bookCategory, bookPrice);
    // renderTable();

    saveToLocal();
}

let clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', handleClear);

function handleClear(){
    localStorage.clear();
    location.reload();
}
// 


// making TABLE 
let myBooks = document.getElementById('MyBookList')
let table = document.createElement('table')

myBooks.appendChild(table)

// ------------
function makeHeader(){
    let headerRow = document.createElement('tr');
    table.appendChild(headerRow);

    let th1 = document.createElement('th')
    let th2 = document.createElement('th')
    let th3 = document.createElement('th')
    let th4 = document.createElement('th')
    let th5 = document.createElement('th')

    headerRow.appendChild(th1)
    headerRow.appendChild(th2)
    headerRow.appendChild(th3)
    headerRow.appendChild(th4)
    headerRow.appendChild(th5)

    th1.textContent = 'Book Name'
    th2.textContent = 'Book\'s Pages'
    th3.textContent = 'Category'
    th4.textContent = 'Book Price'
}makeHeader();


// --------



function renderTable(){

    // makeHeader();

    for (let i = 0; i < Books.globalArray.length; i++) {
        
        let bookRow = document.createElement('tr');
        table.appendChild(bookRow)
        
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')
        
        
        bookRow.appendChild(td1)
        bookRow.appendChild(td2)
        bookRow.appendChild(td3)
        bookRow.appendChild(td4)
        
    
        td1.textContent = Books.globalArray[i].name
        td2.textContent = Books.globalArray[i].page
        td3.textContent = Books.globalArray[i].category
        td4.textContent = Books.globalArray[i].price
        
        let removeBtn = document.createElement('input');
        removeBtn.type = 'button';
        removeBtn.value = 'X';
        bookRow.appendChild(removeBtn);

        removeBtn.addEventListener('click', handleRemove);

        function handleRemove(event, i){
            Books.globalArray.splice(i, 1);
            saveToLocal();
            location.reload();
        }


    }


}

// ------
function makeFooter(){
    let footerRow = document.createElement('tr');
    table.appendChild(footerRow);

    let tdTotalTitle = document.createElement('th');
    footerRow.appendChild(tdTotalTitle);
    tdTotalTitle.textContent = 'Total Pages To Read';

    for (let i = 0; i < Books.globalArray.length; i++) {
        totalPages += Books.globalArray[i].page - 0;
        
    }

    let tdTotal = document.createElement('th');
    footerRow.appendChild(tdTotal);
    tdTotal.textContent = totalPages;

}
// ------

// 

// local storage functions
function saveToLocal(){
    localStorage.setItem('Books', JSON.stringify(Books.globalArray))
}

function getFromLocal(){
    let convertedData = JSON.parse(localStorage.getItem('Books'))

    if(convertedData !== null){
        Books.globalArray = convertedData
        renderTable();
        makeFooter();
    }
}

getFromLocal();
// 
