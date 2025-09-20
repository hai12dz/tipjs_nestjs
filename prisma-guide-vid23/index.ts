import { PrismaClient } from './generated/prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'pretty',
});

async function newSave() {
    await prisma.user.create({
        data: {
            email: 'jo1hn3doe@example.com',
            name: 'Jo11hn3 Doe',
            posts: {
                create: [
                    { title: 'Hello Wo2rld1', content: 'My first post1' },
                    { title: 'Hello Wo2rld2', content: 'My first post2' }
                ]
            },
        },
    });

    //find all users
    const users = await prisma.user.findMany();
    console.log(users);





}
async function deleteUser() {
    await prisma.user.deleteMany({
        where: {
            id: 1
        },
    });

    console.log('User deleted');
}
// newSave()
deleteUser()