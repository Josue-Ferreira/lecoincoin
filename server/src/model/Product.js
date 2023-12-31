const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

class Product{
    constructor(dbPoolPromise){
        this.db = dbPoolPromise;
    }

    async create(name, price, description, category, user_id){
        const [results] = await this.db.query(
            'INSERT INTO product(name, price, description, category, user_id) VALUES (?,?,?,?,?)',
            [name, price, description, category, user_id]
        );
        const result = await this.get(results.insertId);
        return result;
    }

    async get(id){
        const [results] = await this.db.query("SELECT p.name, p.price, p.description, p.category, p.id, u.firstname, u.lastname, u.email, u.avatar_cloud, im.url AS image_url FROM product AS p INNER JOIN user AS u ON u.id=p.user_id LEFT JOIN image_product AS im ON im.product_id=p.id AND im.is_principal='1' WHERE p.id=?",[id]);
        return results[0];
    }

    async getAll(){
        const [results] = await this.db.query("SELECT p.name, p.price, p.description, p.category, p.id, im.url AS image_url FROM product AS p LEFT JOIN image_product AS im ON im.product_id=p.id AND im.is_principal='1'");
        return results;
    }

    async getAllOfUser(email){
        const [results] = await this.db.query("SELECT p.name, p.price, p.description, p.category, p.id, im.url AS image_url FROM product AS p INNER JOIN user AS u ON u.id=p.user_id LEFT JOIN image_product AS im ON im.product_id=p.id AND im.is_principal='1' WHERE u.email=?",[email]);
        return results;
    }

    async getUserAuthor(productId){
        const [results] = await this.db.query("SELECT u.email FROM user AS u INNER JOIN product AS p ON p.user_id=u.id WHERE p.id=?",[productId]);
        return results[0];
    }

    async update(name, price, description, category, id){
        await this.db.query('UPDATE product SET name=?, price=?, description=?, category=? WHERE id=?',[name, price, description, category, id]);
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
            let titleSplited = product.title.slice(0, 45).split(" ");
            titleSplited.pop();
            const titleShort = titleSplited.join(' ');
            const product_created = await this.create(titleShort, product.price, product.description, product.category, product.id);
            cloudinary.v2.uploader
                    .upload(product.image, {folder: 'lecoincoin'}, (error, result) => {
                        this.createImage(product.category, result.public_id, 1, product_created.id);
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

    async updateImagePrincipal(url, productId){
        const [results] = await this.db.query("UPDATE image_product SET url=? WHERE product_id=? AND is_principal='1'",[url, productId]);
        return results;
    }

    async deleteImage(imageId){
        await this.db.query("DELETE FROM image_product WHERE id=? AND is_principal='0'",[imageId]);
    }

    async createComment(comment, user_id, productId){
        const [result] = await this.db.query(
            'INSERT INTO comment(comment, user_id, product_id, created_at) VALUES (?,?,?,NOW())',
            [comment, user_id, productId]
        );
        return result;
    }

    async getAllComments(product_id){
        const [results] = await this.db.query("SELECT c.id, c.comment, DATE_FORMAT(c.created_at, '%H:%i - %e %b %Y') AS created_at, DATE_FORMAT(c.updated_at, '%H:%i - %e %b %Y') AS updated_at, u.firstname, u.lastname, u.avatar_cloud, u.email FROM comment AS c INNER JOIN user AS u ON u.id=c.user_id WHERE product_id=?", [product_id]);
        return results;
    }

    async getComment(comment_id){
        const [results] = await this.db.query("SELECT c.id, c.comment, DATE_FORMAT(c.created_at, '%H:%i - %e %b %Y') AS created_at, DATE_FORMAT(c.updated_at, '%H:%i - %e %b %Y') AS updated_at, u.firstname, u.lastname, u.avatar_cloud, u.email FROM comment AS c INNER JOIN user AS u ON u.id=c.user_id WHERE c.id=?", [comment_id]);
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