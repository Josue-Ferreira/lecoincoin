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
        await this.db.query('UPDATE user SET firstname=?, lastname=?, avatar_cloud=? WHERE email=?',[firstname, lastname, avatar_cloud, email]);
        const result = this.getUser(email);
        return result;
    }

    async deleteUser(email){
        await this.db.query('DELETE FROM user WHERE email=?',[email]);
    }

    async usersSeeder(){
        const { faker } = require('@faker-js/faker');
        // or, if desiring a different locale
        // const { fakerDE: faker } = require('@faker-js/faker');
        let randomFName, randomLName, randomEmail, randomPassword, randomAvatar;
    
        for(let i=0; i<100; i++){
            randomFName = faker.person.firstName(); // Rowan Nikolaus
            randomLName = faker.person.lastName(); // Rowan Nikolaus
            randomEmail = faker.internet.email({firstName: randomFName, lastName: randomLName}); // Kassandra.Haley@erich.biz
            randomPassword = faker.internet.password();
            randomAvatar = faker.image.avatar();

            await this.db.query(
                'INSERT INTO user(firstname,lastname,email,password,avatar_cloud) VALUES (?,?,?,?,?)',
                [randomFName,randomLName,randomEmail,randomPassword,randomAvatar]
            );
        }
    }
}

module.exports = User;