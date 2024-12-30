// Function to get books from localStorage
function getBooks() {
    const books = localStorage.getItem('books');
    return books ? JSON.parse(books) : [];
}

// Function to save books to localStorage
function saveBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

// Function to display books
function displayBooks() {
    const books = getBooks();
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    
    books.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${book}
            <button class="edit" onclick="editBook(${index})">Edit</button>
            <button class="delete" onclick="deleteBook(${index})">Hapus</button>
        `;
        bookList.appendChild(li);
    });
}

// Function to add a book
document.getElementById('add-book').addEventListener('click', function() {
    const bookTitle = document.getElementById('book-title').value.trim();
    
    if (bookTitle) {
        const books = getBooks();
        books.push(bookTitle);
        saveBooks(books);
        document.getElementById('book-title').value = '';
        displayBooks();
    }
});

// Function to delete a book
function deleteBook(index) {
    const books = getBooks();
    books.splice(index, 1);
    saveBooks(books);
    displayBooks();
}

// Function to edit a book
function editBook(index) {
    const newTitle = prompt('Edit judul buku:', getBooks()[index]);
    if (newTitle) {
        const books = getBooks();
        books[index] = newTitle;
        saveBooks(books);
        displayBooks();
    }
}

// Initial display
displayBooks();
