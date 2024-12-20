import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient();
      const token = client.handshake.auth.token;
      
      if (!token) {
        throw new WsException('Authentication token not found');
      }

      const payload = this.jwtService.verify(token);
      client.data.user = payload;
      
      return true;
    } catch (err) {
      throw new WsException('Invalid token');
    }
  }
} 