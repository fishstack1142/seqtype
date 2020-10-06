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