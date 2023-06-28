import { Controller, Post, HttpStatus } from '@nestjs/common';
import { exec } from 'child_process';

@Controller('gitHook')
export class gitHookController {
  @Post()
  handleWebhook() {
    // Выполнить команду git pull
    exec('git pull', (error, stdout, stderr) => {
      if (error) {
        console.error(`Ошибка выполнения команды git pull: ${error}`);
        // Обработка ошибки при выполнении git pull
        return HttpStatus.INTERNAL_SERVER_ERROR;
      } else {
        console.log(`Результат выполнения команды git pull: ${stdout}`);
        // Перезагрузить сервер (замените команду на соответствующую для вашей системы)
        exec('sudo systemctl restart your_service_name', (error) => {
          if (error) {
            console.error(`Ошибка при перезагрузке сервера: ${error}`);
            // Обработка ошибки при перезагрузке сервера
            return HttpStatus.INTERNAL_SERVER_ERROR;
          } else {
            console.log('Сервер успешно перезагружен');
            // Отправить успешный HTTP-статус
            return HttpStatus.OK;
          }
        });
      }
    });
  }
}
