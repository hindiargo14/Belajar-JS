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
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';

        bookItem.innerHTML = `
            <img src="${book.cover}" alt="Sampul Buku" class="book-cover">
            <div class="book-info">
                <span class="book-title">${book.title}</span>
                <div class="actions">
                    <button class="edit" onclick="editBook(${index})">Edit</button>
                    <button class="delete" onclick="deleteBook(${index})">Hapus</button>
                </div>
            </div>
        `;
        bookList.appendChild(bookItem);
    });
}

// Function to add a book
document.getElementById('add-book').addEventListener('click', function() {
    const bookTitle = document.getElementById('book-title').value.trim();
    const bookCover = document.getElementById('book-cover').value.trim();

    if (bookTitle && bookCover) {
        const books = getBooks();
        books.push({ title: bookTitle, cover: bookCover });
        saveBooks(books);
        document.getElementById('book-title').value = '';
        document.getElementById('book-cover').value = '';
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
    const books = getBooks();
    const newTitle = prompt('Edit Judul Buku:', books[index].title);
    const newCover = prompt('Edit URL Sampul Buku:', books[index].cover);

    if (newTitle && newCover) {
        books[index] = { title: newTitle, cover: newCover };
        saveBooks(books);
        displayBooks();
    }
}

// Initial display
displayBooks();
