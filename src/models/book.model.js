let books = [{ id: 1, title: "Bảy viên ngọc rồng", author: "Phương" }, { id: 2, title: "Đắc nhân tâm", author: "Đức" },];
let nextId = 3;
const getAll = () => books;
const getById = (id) => books.find(b => b.id === id);
const search = (keyword) =>
    books.filter(b => b.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));
const create = (data) => {
    const newBook = { id: nextId++, ...data };
    books.push(newBook);
    return newBook;
};

const update = (id, data) => {
    const book = getById(id);
    if (!book) return null;
    Object.assign(book, data);
    return book;
};
const remove = (id) => {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
};

module.exports = { getAll, getById, search, create, update, remove };
