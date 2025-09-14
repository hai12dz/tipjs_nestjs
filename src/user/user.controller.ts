import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { storage } from './oss';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('upload/avt')
  @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads/avatar/',
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, file, cb) {
      const extName = path.extname(file.originalname);
      if (['.jpg', '.jpeg', '.png', '.pdf'].includes(extName)) {
        cb(null, true);
      }
      else {
        cb(new BadRequestException('Upload file error!'), false);
      }
    }
  },
  ))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log("file", file);
    return file.path;
  }



  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('new')
  registerUserDto(@Body() registerUserDto: RegisterUserDto) {
    console.log("registerUserDto", registerUserDto);
    return this.userService.register(registerUserDto);
  }

  @Post('login')
  loginUserDto(@Body() registerUserDto: RegisterUserDto) {
    console.log("registerUserDto", registerUserDto);
    return this.userService.login(registerUserDto);
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
