import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { UserDto, UserQueryDto, UserUpdateDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('System')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '' })
  async list(@Query() dto: UserQueryDto) {
    // return []; //this.userService.list(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '' })
  async read() {
    //return this.userService.info(id);
  }

  @Post()
  @ApiOperation({ summary: '' })
  async create(@Body() dto: UserDto): Promise<void> {
    //await this.userService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '' })
  async update(@Body() dto: UserUpdateDto): Promise<void> {
    //await this.userService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '' })
  @ApiParam({
    name: 'id',
    type: String,
    schema: { oneOf: [{ type: 'string' }, { type: 'number' }] },
  })
  async delete(
    @Param('id', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ): Promise<void> {
    //await this.userService.delete(ids);
  }
}
