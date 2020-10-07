import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as Bluebird from 'Bluebird'

import { User, UserModel, UserAddModel, UserViewModel } from '../models/user'

export class UserService {

    private readonly _saltRounds = 12;
    private readonly _jwtSecret = '0.rfyj3nPkdkdD%'

    static get userAttributes() {
        return ['id', 'email']
    }

    private static _user
    static get user() {
        return UserService._user
    }

    register({ email, password}: UserAddModel) {
        return bcrypt.hash(password, this._saltRounds)
            .then(hash => {
                return User.create({  email, password: hash })
                .then(u => this.getUserById(u!.id))
            })
    }

    login({email}: UserAddModel) {
        return User.findOne({ where: { email } }).then(user => {

            const { id, email } = user!

            return { token: jwt.sign({ id, email }, this._jwtSecret) }
        })
    }

    verifyToken(token: string) {

        console.log('verifying...')
        return new Promise((resolve, reject) => {
            jwt.verify(token, this._jwtSecret), (err, decoded) => {
                if (err) {

                    console.log(err)
                    resolve(false)
                    return
                }

                UserService._user = User.findByPk(decoded['id'])
                console.log( UserService._user)
                resolve(true)
                return

            }
        }) as Promise<boolean>
    }


    async getUserById(id: number) {

        const user = await User.findOne({ where: { id } });

        return { status: 'success', data : {id: user.id, email: user.email} }
    }

    getUsers() {

        const users = User.findAll()

        return users

        // return User.findAll()
    }
}