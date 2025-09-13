import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { DbService } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) { }

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read() || []
    //check trùng accountname
    const userFound = users.find(u => u.accountName === registerUserDto.accountname)
    if (userFound) {
      throw new Error('Account name already exists');
    }
    const user = new User()
    user.accountName = registerUserDto.accountname
    user.password = registerUserDto.password
    //push vào mảng
    users.push(user)
    //save file
    await this.dbService.write(users);

    return users;
  }


  async login(loginUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read() || []
    //check trùng accountname
    const userFound = users.find(u => u.accountName === loginUserDto.accountname && u.password === loginUserDto.password)
    if (!userFound) {
      throw new Error('Invalid account name or password');
    }
    return userFound;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
