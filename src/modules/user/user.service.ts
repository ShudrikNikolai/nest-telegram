import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { MongoEntityManager, MongoRepository } from 'typeorm';

import { LoggerService } from '@/shared/logger/logger.service';
import { TgContactDto } from '@/common/dtos';
import { IFind } from '@/common/interfaces';

import { UserDto, UserUpdateDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: MongoEntityManager,
    @InjectRepository(UserEntity)
    private readonly userRepository: MongoRepository<UserEntity>,
    private readonly loggerService: LoggerService,
  ) {}

  async create(user: UserDto): Promise<void> {
    const session =
      this.entityManager.mongoQueryRunner.databaseConnection.startSession();

    session.startTransaction();

    try {
      const userInfo: boolean = await this.telegramUserIsExists(
        user.telegramId,
      );

      if (userInfo) {
        this.loggerService.warn(`This user already exists: ${user.telegramId}`);
        throw new Error(`This user already exists: ${user.telegramId}`);
      }

      const userCreate = this.userRepository.create({
        telegramId: user.telegramId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      });

      await this.userRepository.insertOne(userCreate, { session });

      await session.commitTransaction();
    } catch (e) {
      await session.abortTransaction();
      this.loggerService.error(
        `Abort Transaction by create user: ${user.telegramId}`,
        JSON.stringify(e),
      );
      throw new Error(`Abort Transaction by create user: ${user.telegramId}`);
    } finally {
      await session.endSession();
      this.loggerService.log(
        `User created successfully, telegramId: ${user.telegramId}`,
      );
    }
  }

  async approvePhone(contact: TgContactDto): Promise<UserEntity> {
    try {
      const user = await this.findUserByTelegramId(contact.userId);

      if (!user) {
        this.loggerService.error(`This user not found: ${contact.userId}`);
        throw new Error(`This user not found: ${contact.userId}`);
      }

      if (user.phoneApproved) {
        this.loggerService.warn(
          `This user already approve his number: ${contact.userId}`,
        );

        return user;
      }

      await this.userRepository.updateOne(
        {
          telegramId: contact.userId,
        },
        {
          $set: {
            phone: contact.phoneNumber,
            lastName: contact.lastName || user.lastName,
            firstName: contact.firstName || user.firstName,
            phoneApproved: true,
          },
        },
      );

      user.phoneApproved = true;

      return user;
    } catch (e) {
      this.loggerService.error(
        `Approve Phone: ${contact.userId}`,
        JSON.stringify(e),
      );

      throw new Error(`Approve Phone: ${contact.userId}`);
    }
  }

  async updateUserByTelegramId(
    telegramId: number,
    data: UserUpdateDto,
  ): Promise<any> {
    return this.userRepository.updateOne(
      {
        where: { telegramId, phoneApproved: true },
      },
      {
        $set: data,
      },
    );
  }

  async findUserByTelegramId(
    telegramId: number,
    filter?: UserUpdateDto,
    select?: object,
    order?: string,
  ): Promise<UserEntity | null> {
    try {
      const options: IFind = {};
      const where = { telegramId };

      if (filter) {
        Object.assign(where, filter);
      }

      options.where = where;

      if (select) {
        options.select = select;
      }

      if (order) {
        options.order = order;
      }

      return this.userRepository.findOne(options);
    } catch (e) {
      this.loggerService.error(
        `findUserByTelegramId telegramId: ${telegramId}`,
        JSON.stringify(e),
      );
      throw new Error(`findUserByTelegramId telegramId: ${telegramId}`);
    }
  }

  private async telegramUserIsExists(telegramId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { telegramId } });

    return !!user;
  }
}
