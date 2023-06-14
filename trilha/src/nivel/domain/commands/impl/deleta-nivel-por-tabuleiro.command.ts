import { ICommand } from '@nestjs/cqrs';

export class DeletaNivelPorTabuleiroCommand implements ICommand {
  constructor(
    public readonly tabuleiroId: string,
  ) { }
}
