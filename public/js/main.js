

document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();

    const btnAdd = document.getElementById('btn-add');
    if (btnAdd) {
        btnAdd.addEventListener('click', addBook);
    }

    const btnSearch = document.getElementById('btn-search');
    if (btnSearch) {
        btnSearch.addEventListener('click', searchBook);
    }
});


function fetchBooks() {
    fetch('/books')
        .then(res => res.json())
        .then(data => {
            const tableBody = document.getElementById('bookTableBody');
            tableBody.innerHTML = '';
            data.forEach((book, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${book.author}</td>
                    <td>${book.title}</td>
                    <td>
                        <button class="btn btn-delete" onclick="deleteBook(${book.id})">Xóa</button>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        })
        .catch(err => console.error('Lỗi lấy sách:', err));

}

function addBook() {
    const authorInput = document.getElementById('authorInput');
    const bookInput = document.getElementById('bookInput');

    const author = authorInput.value.trim();
    const title = bookInput.value.trim();

    if (!author || !title) {
        alert('Vui lòng nhập đầy đủ Tên tác giả và Tên sách!');
        return;
    }

    fetch('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, title })
    })
        .then(res => res.json())
        .then(() => {
            authorInput.value = '';
            bookInput.value = '';
            fetchBooks();
        })
        .catch(err => console.error('Lỗi thêm sách:', err));
}

function deleteBook(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) return;

    fetch(`/books/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(() => {
            fetchBooks();
        })
        .catch(err => console.err('Lỗi xoá sách:', err));
}

function searchBook() {
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput ? searchInput.value.trim() : '';

    fetch(`/books/search?q=${encodeURIComponent(keyword)}`)
        .then(res => res.json())
        .then(data => {
            const books = Array.isArray(data) ? data : (data.data || []);
            renderTable(books);
        })
        .catch(err => console.error('Lỗi tìm kiếm sách :', err));
}

function renderTable(books) {
    const tableBody = document.getElementById('bookTableBody');
    tableBody.innerHTML = '';
    if (books.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Không tìm thấy dữ liệu</td></tr>'
        return;
    }
    books.forEach((book, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${book.author}</td>
        <td>${book.title}</td>
        <td>
        <button class="btn btn-delete" onclick="deleteBook(${book.id})">Xóa</button>
        </td>
        `;
        tableBody.appendChild(tr);
    });
}