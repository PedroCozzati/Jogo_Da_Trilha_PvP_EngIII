import { ICommand } from '@nestjs/cqrs';

export class DeletaPecaCommand implements ICommand {
  constructor(
    public readonly id: string,
  ) { }
}
