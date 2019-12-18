import { EnvService } from '../config/env.service';

const config = new EnvService().read();

export const jwtConstants = {
  secret: config.JWT_SECRET,
  expiresIn: config.JWT_EXPIRES_IN,
};
