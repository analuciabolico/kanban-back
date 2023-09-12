import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UserCoreService {
  constructor(private configService: ConfigService) {}

  private readonly users = [
    {
      userId: 1,
      username: this.configService.get<string>('APP_USERNAME') || 'admin',
      password: this.configService.get<string>('APP_PASSWORD') || 'admin',
    } as User,
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
