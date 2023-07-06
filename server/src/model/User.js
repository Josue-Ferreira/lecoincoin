class User{
    constructor(dbPoolPromise){
        this.db = dbPoolPromise;
    }

    async getUser(email){
        const [results] = await this.db.query('SELECT firstname, lastname, email, avatar_cloud FROM user WHERE email=?',[email]);
        console.log(results[0])
        return results[0];
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