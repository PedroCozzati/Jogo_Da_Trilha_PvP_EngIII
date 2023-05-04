import { ICommand } from '@nestjs/cqrs';

export class DeletaJogadorCommand implements ICommand {
  constructor(
    public readonly id: string,
  ) { }
}
