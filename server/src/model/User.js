const uid = require('uid2');
const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

class User{
    constructor(dbPoolPromise){
        this.db = dbPoolPromise;
    }

    async createUser(firstname, lastname, email, hashedPassword, avatar_cloud, tokenSignupMailValidation){
        await this.db.query(
            'INSERT INTO user(firstname,lastname,email,password,avatar_cloud,token) VALUES (?,?,?,?,?,?)',
            [firstname, lastname, email, hashedPassword, avatar_cloud, tokenSignupMailValidation]
        );
    }

    async signupValidation(tokenSignupMailValidation){
        const [result] = await this.db.query("UPDATE user SET is_validated='1' WHERE token=?", [tokenSignupMailValidation]);
        return result;
    }

    async getUser(email){
        const [results] = await this.db.query('SELECT firstname, lastname, email, avatar_cloud FROM user WHERE email=?',[email]);
        return results[0];
    }

    async getUserCredentials(email){
        const [results] = await this.db.query('SELECT password AS hashedPassword, id, is_validated FROM user WHERE email=?',[email]);
        return results[0];
    }

    async updateUser(firstname, lastname, email, avatar_cloud){
        if(avatar_cloud)
            await this.db.query('UPDATE user SET firstname=?, lastname=?, avatar_cloud=? WHERE email=?',[firstname, lastname, avatar_cloud, email]);
        else
            await this.db.query('UPDATE user SET firstname=?, lastname=? WHERE email=?',[firstname, lastname, email]); 
        const result = this.getUser(email);
        return result;
    }

    async deleteUser(email){
        await this.db.query('DELETE FROM user WHERE email=?',[email]);
    }

    async usersSeeder(){
        const { faker } = require('@faker-js/faker');
        // or, if desiring a different locale
        // const { fakerDE: faker } = require('@faker-js/faker');users
        let randomFName, randomLName, randomEmail, randomPassword, randomAvatar, tokenSignupMailValidation;
    
        for(let i=0; i<100; i++){
            randomFName = faker.person.firstName(); // Rowan Nikolaus
            randomLName = faker.person.lastName(); // Rowan Nikolaus
            randomEmail = faker.internet.email({firstName: randomFName, lastName: randomLName}); // Kassandra.Haley@erich.biz
            randomPassword = faker.internet.password();
            randomAvatar = faker.image.avatar();
            tokenSignupMailValidation = uid(32);

            const result = await cloudinary.v2.uploader
                .upload(randomAvatar, {folder: 'lecoincoin'});
            
            await this.db.query(
                'INSERT INTO user(firstname,lastname,email,password,avatar_cloud,token) VALUES (?,?,?,?,?,?)',
                [randomFName,randomLName,randomEmail,randomPassword,result.public_id,tokenSignupMailValidation]
            );
        }
    }
}

module.exports = User;