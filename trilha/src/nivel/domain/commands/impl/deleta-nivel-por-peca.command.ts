import { ICommand } from '@nestjs/cqrs';

export class DeletaNivelPorPecaCommand implements ICommand {
  constructor(
    public readonly pecaId: string,
  ) { }
}
