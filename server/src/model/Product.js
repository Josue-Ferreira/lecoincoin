const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'josueferreira', 
    api_key: '877172724662548', 
    api_secret: 'yWrfcVEPHDzBV4iDG9_iuFo51P0' 
  });

class Product{
    constructor(dbPoolPromise){
        this.db = dbPoolPromise;
    }

    async create(name, price, description, user_id){
        const [results] = await this.db.query(
            'INSERT INTO product(name, price, description, user_id) VALUES (?,?,?,?)',
            [name, price, description, user_id]
        );
        return results.insertId;
    }

    async get(id){
        const [results] = await this.db.query("SELECT p.name, p.price, p.description, p.id, im.url FROM product AS p LEFT JOIN image_product AS im ON im.product_id=p.id WHERE p.id=?",[id]); //AND im.is_principal='1'
        return results[0];
    }

    async getAll(){
        const [results] = await this.db.query("SELECT p.name, p.price, p.description, p.id, im.url FROM product AS p LEFT JOIN image_product AS im ON im.product_id=p.id WHERE im.is_principal='1'");
        return results;
    }

    async getUserAuthor(productId){
        const [results] = await this.db.query("SELECT u.email FROM user AS u INNER JOIN product AS p ON p.user_id=u.id WHERE p.id=?",[productId]);
        return results[0];
    }

    async update(name, price, description, id){
        await this.db.query('UPDATE product SET name=?, price=?, description=? WHERE id=?',[name, price, description, id]);
        const result = await this.get(id);
        return result;
    }

    async delete(id){
        await this.db.query('DELETE FROM product WHERE id=?',[id]);
    }

    async seeder(){
        const clothesRawData = await fetch('https://fakestoreapi.com/products');
        const clothesJson = await clothesRawData.json();
        clothesJson.forEach(async(product) => {
            const product_id_created = await this.create(product.title, product.price, product.description, product.id);
            cloudinary.v2.uploader
                    .upload(product.image, {folder: 'lecoincoin'}, (error, result) => {
                        this.createImage(product.category, result.public_id, 1, product_id_created);
                    });
        });
    }

    async createImage(description, url, is_principal, product_id){
        await this.db.query(
            'INSERT INTO image_product(description, url, is_principal, product_id) VALUES (?,?,?,?)',
            [description, url, is_principal, product_id]
        );
    }

    async getImages(productId){
        const [results] = await this.db.query('SELECT description, url, id FROM image_product WHERE product_id=?',[productId]);
        return results;
    }

    async deleteImage(imageId){
        await this.db.query("DELETE FROM image_product WHERE id=? AND is_principal='0'",[imageId]);
    }

    async createComment(comment, user_id, productId){
        await this.db.query(
            'INSERT INTO comment(comment, user_id, product_id, created_at) VALUES (?,?,?,NOW())',
            [comment, user_id, productId]
        );
    }

    async getAllComments(product_id){
        const [results] = await this.db.query('SELECT c.id, c.comment, c.created_at, c.updated_at, u.firstname, u.lastname FROM comment AS c INNER JOIN user AS u ON u.id=c.user_id WHERE product_id=?', [product_id]);
        return results;
    }

    async getComment(comment_id){
        const [results] = await this.db.query('SELECT c.id, c.comment, c.created_at, c.updated_at, u.firstname, u.lastname FROM comment AS c INNER JOIN user AS u ON u.id=c.user_id WHERE c.id=?', [comment_id]);
        return results[0];
    }

    async getCommentUserAuthor(productId){
        const [results] = await this.db.query("SELECT u.email FROM user AS u INNER JOIN comment AS c ON c.user_id=u.id WHERE c.id=?",[productId]);
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