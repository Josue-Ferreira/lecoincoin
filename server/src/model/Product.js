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

    async seeder(){
        const clothesRawData = await fetch('https://fakestoreapi.com/products');
        const clothesJson = await clothesRawData.json();
        clothesJson.forEach(product => {
            this.create(product.title, product.price, product.description, product.id);
        });
    }

    async createComment(comment, user_id, productId){
        await this.db.query(
            'INSERT INTO comment(comment, user_id, product_id, created_at) VALUES (?,?,?,NOW())',
            [comment, user_id, productId]
        );
    }

    async getAllComments(product_id){
        const [results] = await this.db.query('SELECT user_id, comment, created_at, updated_at FROM comment WHERE product_id=?', [product_id]);
        return results;
    }

    async getComment(comment_id){
        const [results] = await this.db.query('SELECT comment, created_at, updated_at FROM comment WHERE id=?', [comment_id]);
        return results[0];
    }

    async updateComment(comment, commentId){
        await this.db.query('UPDATE comment SET comment=?, updated_at=NOW() WHERE id=?',[comment, commentId]);
        const result = this.getComment(commentId);
        return result;
    }

    async deleteComment(comment_id){
        await this.db.query('DELETE FROM comment WHERE id=?',[comment_id]);
    }
}

module.exports = Product;