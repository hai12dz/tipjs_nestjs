import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, UploadedFiles, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { storage } from './oss';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import { Response as ExpressResponse } from 'express';
import { MyLogger } from '../../logger/my.logger';
@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly logger: MyLogger, // inject logger
  ) { }

  @Post('upload/large-file')
  @UseInterceptors(FilesInterceptor('file', 20, {
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
  uploadLargeFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: { name: string }) {
    //1. get file name
    const fileName = body?.name?.match(/(.+)-\d+$/)?.[1] ?? body?.name;
    console.log("fileName", fileName);
    const nameDir = 'uploads/chunks-' + fileName;

    //2. create dir
    if (!fs.existsSync(nameDir)) {
      fs.mkdirSync(nameDir);
    }
    //3 copy file to dir
    fs.cpSync(files[0].path, nameDir + '/' + body.name);

    //4 remove
    fs.rmSync(files[0].path);

  }

  //merge file
  @Get('merge/file')
  mergeFile(@Query('file') fileName: string, @Res() res: ExpressResponse) {

    const nameDir = 'uploads/' + fileName;
    //read
    const files = fs.readdirSync(nameDir);
    console.log("files", files);
    let startPos = 0, countFile = 0;
    files.map(file => {
      //get path full 
      const filePath = nameDir + '/' + file;
      console.log("filePath", filePath);
      const streamFile = fs.createReadStream(filePath);
      console.log("streamFile", streamFile);
      streamFile.pipe(fs.createWriteStream('uploads/merge/' + fileName, {
        start: startPos
      })).on('finish', () => {
        countFile++;
        if (files.length === countFile) {
          fs.rm(nameDir, {
            recursive: true,
          },
            () => {
              console.log('Clean up chunks directory');
            })
          console.log('File merged successfully')
        }
      });
      startPos += fs.statSync(filePath).size;
    });

    return res.json(
      {
        link: `http://localhost:3000/uploads/merge/${fileName}`,
        fileName
      }

    )
  }

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

  @Post('log')
  log(@Body() body) {
    this.logger.log("body", body);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('new')
  registerUserDto(@Body() registerUserDto: RegisterUserDto) {
    this.logger.log(`registerUserDto: ${JSON.stringify(registerUserDto)}`, UserController.name);
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
