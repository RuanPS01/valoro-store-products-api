import { EnvironmentConfigService } from '@main/config/environment-config/environment-config.service';
import { HttpService } from '@nestjs/axios';
import { ErrorsService } from '@usecases/errors/errors.service';
import axios, { AxiosResponse } from 'axios';

interface Response {
  data: ResponseAuthRequest;
}
interface ResponseAuthRequest {
  data: AuthObject;
}
interface AuthObject {
  authenticated: boolean;
  email: string;
  userId: string;
}

interface AutenticatedUserData {
  id: string;
  email: string;
}

export class AuthenticateMiddleware {
  constructor(
    private readonly configService: EnvironmentConfigService,
    private readonly errorsService: ErrorsService,
  ) {}
  async auth(token: string): Promise<AutenticatedUserData> {
    const responseAuth = await this.authRequest(token);
    if (!responseAuth.data.data.authenticated) {
      this.errorsService.Unauthorized({
        message: 'User not authenticated.',
      });
    }
    const authenticatedUserData: AutenticatedUserData = {
      id: responseAuth.data.data.userId,
      email: responseAuth.data.data.email,
    };
    return authenticatedUserData;
  }

  async authRequest(token: string) {
    const response = await axios<Response>({
      method: 'POST',
      url:
        this.configService.getAuthApiHost() +
        this.configService.getAuthenticatePath(),
      data: {
        token: token ? token.replace('Bearer ', '') : '',
      },
    }).catch(() => {
      this.errorsService.Unauthorized({
        message: 'Unauthenticated user. Please login.',
      });
    });

    return response as unknown as Response;
  }
}
