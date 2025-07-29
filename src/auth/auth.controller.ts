import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto"; // Create this DTO

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("local")) // Use the 'local' strategy for authentication
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Request() req, @Body() loginDto: LoginDto) {
    // @Body() is optional if you only care about req.user
    // Passport's LocalStrategy attaches the validated user to req.user
    return this.authService.login(req.user);
  }
}
