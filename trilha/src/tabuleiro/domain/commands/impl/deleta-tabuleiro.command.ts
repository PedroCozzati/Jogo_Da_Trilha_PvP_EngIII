import { ICommand } from '@nestjs/cqrs';

export class DeletaTabuleiroCommand implements ICommand {
  constructor(
    public readonly id: string,
  ) { }
}
