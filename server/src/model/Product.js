class Product{
    constructor(dbPoolPromise){
        this.db = dbPoolPromise;
    }

    async create(name, price, description, user_id){
        await this.db.query(
            'INSERT INTO product(name, price, description, user_id) VALUES (?,?,?,?)',
            [name, price, description, user_id]
        );
    }

    async get(id){
        const [results] = await this.db.query('SELECT name, price, description FROM product WHERE id=?',[id]);
        return results[0];
    }

    async getAll(){
        const [results] = await this.db.query('SELECT name, price, description FROM product');
        return results;
    }

    async update(name, price, description, id){
        await this.db.query('UPDATE product SET name=?, price=?, description=? WHERE id=?',[name, price, description, id]);
        const result = this.get(id);
        return result;
    }

    async delete(id){
        await this.db.query('DELETE FROM product WHERE id=?',[id]);
    }
}

module.exports = Product;