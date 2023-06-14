import { ICommand } from '@nestjs/cqrs';

export class DeletaNivelCommand implements ICommand {
  constructor(
    public readonly id: string,
  ) { }
}
