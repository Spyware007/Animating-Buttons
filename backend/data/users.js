import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Vimal',
        email: 'vimal@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isFreelancer: true
    },
    {
        name: 'Aniket',
        email: 'aniket@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isFreelancer: true
    },
    {
        name: 'Prawin',
        email: 'prawin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isFreelancer: true
    },
    {
        name: 'Sandy',
        email: 'santhosh@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isFreelancer: false
    },
    {
        name: 'Harshit',
        email: 'harshit@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isFreelancer: false
    },
    {
        name: 'Aakash',
        email: 'aakash@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isFreelancer: false
    },
    {
        name: 'test',
        email: 'test@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isFreelancer: false
    }
]

export default users