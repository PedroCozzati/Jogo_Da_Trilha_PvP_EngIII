import { IsString } from 'class-validator';

export class JogadorDto {
    @IsString()
    readonly _id: string

    readonly isOld: boolean

    readonly isInaccurate: boolean

    readonly altitude: number

    @IsString()
    readonly positionType: string

    readonly secureLocation: any

    readonly secureLocationTs: number

    readonly latitude: number

    readonly floorLevel: number

    readonly horizontalAccuracy: number

    @IsString()
    readonly locationType: string

    readonly timeStamp: Date

    readonly locationFinished: boolean

    readonly verticalAccuracy: number

    readonly locationMode: any

    readonly longitude: number
}