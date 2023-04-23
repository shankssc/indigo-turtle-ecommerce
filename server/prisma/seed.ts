import { db } from '../src/db.server'

type User = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: string
}

async function seed() {
    await Promise.all(
        getUsers().map((user) => {
            return db.user.create({
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    address: user.address
                },
            });
        })

    );
    const author = await db.user.findFirst({
        where: {
            firstName: "newuser_1"
        },
    })
}

function getUsers(): Array<User> {
    return [
        {
            firstName: "newuser_1",
            lastName: "test_user",
            email: "newuser@email.com",
            password: "12345678",
            address: "1216 N Avenue" 
        },

        {
            firstName: "newuser_2",
            lastName: "test_user_2",
            email: "newuser2@email.com",
            password: "12345678",
            address: "326 Collins Dr" 
        }
    ]
}

seed();