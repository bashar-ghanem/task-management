import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtPayload } from "../interface/jwt-paylload.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: payload.sub
            },
            select: {
                id: true,
                email: true
            }
        });
        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }
        return user;
    }
}