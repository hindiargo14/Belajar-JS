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
                <div class="book-details">
                    <span>Penulis: ${book.author}</span>
                    <span>Penerbit: ${book.publisher}</span>
                    <span>Tahun Terbit: ${book.year}</span>
                </div>
                <div class="actions">
                    <button class="delete" onclick="deleteBook(${index})">Hapus</button>
                </div>
            </div>
        `;
        bookList.appendChild(bookItem);
    });
}

// Function to add a book
document.getElementById('add-book').addEventListener('click', function () {
    const bookTitle = document.getElementById('book-title').value.trim();
    const bookAuthor = document.getElementById('book-author').value.trim();
    const bookPublisher = document.getElementById('book-publisher').value.trim();
    const bookYear = document.getElementById('book-year').value.trim();
    const bookCover = document.getElementById('book-cover').value.trim();

    if (bookTitle && bookAuthor && bookPublisher && bookYear && bookCover) {
        const books = getBooks();
        books.push({
            title: bookTitle,
            author: bookAuthor,
            publisher: bookPublisher,
            year: bookYear,
            cover: bookCover,
        });
        saveBooks(books);

        // Clear form inputs
        document.getElementById('book-title').value = '';
        document.getElementById('book-author').value = '';
        document.getElementById('book-publisher').value = '';
        document.getElementById('book-year').value = '';
        document.getElementById('book-cover').value = '';

        displayBooks();
    } else {
        alert('Mohon isi semua data buku!');
    }
});

// Function to delete a book
function deleteBook(index) {
    const books = getBooks();
    books.splice(index, 1);
    saveBooks(books);
    displayBooks();
}

// Initial display
displayBooks();
